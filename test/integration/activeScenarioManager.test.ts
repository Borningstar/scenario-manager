import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

import ActiveScenarioManager from '../../src/services/activeScenarioManager';
import { createEventRunner } from '../../src/services/eventRunner';
import actions, { ActionType } from '../../src/actions';
import { connectToDatabase } from '../../src/services/database';
import { ActiveScenarioModel } from '../../src/models/activeScenario';
import { ScenarioStateModel } from '../../src/models/scenarioState';
import { ScenarioEventModel } from '../../src/models/scenarioEvent';
import { EventType, VariableType } from '../../src/types';
import { VariableModel } from '../../src/models/variable';

describe('activeScenarioManager', () => {
  beforeAll(async () => {
    await connectToDatabase({ database: 'scenario-manager-test' });
  });

  afterEach(async () => {
    const connection = await mongoose.connection.db
      .listCollections({ name: ActiveScenarioModel.collection.name })
      .toArray();
    if (connection.length > 0)
      await mongoose.connection.db.dropCollection(
        ActiveScenarioModel.collection.name
      );
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });

  describe('.getScenario', () => {
    it('returns scenario from database', async () => {
      expect.assertions(1);

      const eventRunner = createEventRunner(actions);
      const sut = new ActiveScenarioManager(eventRunner);

      const id = new ObjectId().toHexString();

      const state = new ScenarioStateModel({ activeScenarioId: id });

      await ActiveScenarioModel.create({
        _id: id,
        initialState: state,
        scenarioId: '1'
      });

      const scenarioState = await sut.getScenario(id);

      expect(scenarioState.activeScenarioId).toEqual(state.activeScenarioId);
    });

    it('runs all events from scenario in database', async () => {
      expect.assertions(1);

      const eventRunner = createEventRunner(actions);
      const sut = new ActiveScenarioManager(eventRunner);

      const id = new ObjectId().toHexString();
      const variableName = 'variable';

      const variable = new VariableModel({
        name: variableName,
        type: VariableType.number
      });

      const state = new ScenarioStateModel({
        activeScenarioId: id,
        variables: [variable]
      });

      const addEvent = new ScenarioEventModel({
        activeScenarioId: id,
        name: 'Add 1',
        action: ActionType.AddValueToVariable,
        type: EventType.Activated,
        properties: {
          value: 1,
          destinationVariable: variableName
        }
      });

      const secondAddEvent = new ScenarioEventModel({
        activeScenarioId: id,
        name: 'Add 2',
        action: ActionType.AddValueToVariable,
        type: EventType.Activated,
        properties: {
          value: 2,
          destinationVariable: variableName
        }
      });

      const thirdAddEvent = new ScenarioEventModel({
        activeScenarioId: id,
        name: 'Add 1',
        action: ActionType.AddValueToVariable,
        type: EventType.Activated,
        properties: {
          value: 1,
          destinationVariable: variableName
        }
      });

      const activeScenario = await ActiveScenarioModel.create({
        _id: id,
        initialState: state,
        scenarioId: '1',
        events: [addEvent, secondAddEvent, thirdAddEvent]
      });

      const scenarioState = await sut.getScenario(activeScenario._id);

      expect(scenarioState.variables[0].value).toEqual(4);
    });
  });

  describe('.updateScenario', () => {
    it('pushes new events to database and processes events', async () => {
      expect.assertions(1);

      const eventRunner = createEventRunner(actions);
      const sut = new ActiveScenarioManager(eventRunner);

      const id = new ObjectId().toHexString();
      const variableName = 'variable';

      const variable = new VariableModel({
        name: variableName,
        type: VariableType.number
      });

      const state = new ScenarioStateModel({
        activeScenarioId: id,
        variables: [variable]
      });

      const activeScenario = await ActiveScenarioModel.create({
        _id: id,
        initialState: state,
        scenarioId: '1'
      });

      const addEvent = new ScenarioEventModel({
        activeScenarioId: id,
        name: 'Add 1',
        action: ActionType.AddValueToVariable,
        type: EventType.Activated,
        properties: {
          value: 1,
          destinationVariable: variableName
        }
      });

      const scenarioState = await sut.updateScenario(activeScenario._id, [
        addEvent
      ]);

      expect(scenarioState.variables[0].value).toEqual(1);
    });
  });

  describe('.getScenarioHistory', () => {
    it('returns array of events from database', async () => {
      expect.assertions(2);

      const eventRunner = createEventRunner(actions);
      const sut = new ActiveScenarioManager(eventRunner);

      const id = new ObjectId().toHexString();

      const state = new ScenarioStateModel({
        activeScenarioId: id
      });

      const addEvent = new ScenarioEventModel({
        activeScenarioId: id,
        name: 'Add 1',
        action: ActionType.AddValueToVariable,
        type: EventType.Activated
      });

      const activeScenario = await ActiveScenarioModel.create({
        _id: id,
        initialState: state,
        scenarioId: '1',
        events: [addEvent]
      });

      const scenarioHistory = await sut.getScenarioHistory(activeScenario._id);

      expect(scenarioHistory).toHaveLength(1);
      expect(scenarioHistory[0]._id).toEqual(addEvent._id);
    });
  });
});
