import { createActiveScenarioManager } from '../../src/services/activeScenarioManager';
import * as activeScenario from '../../src/models/activeScenario';
import {
  createScenarioState,
  createActiveScenario,
  createEvent
} from '../models';
import { createEventRunnerMock } from '.';

describe('activeScenarioManager', () => {
  beforeEach(() => {
    spyOn(activeScenario, 'ActiveScenarioModel');
  });

  describe('.getScenario', () => {
    it(
      'should get state, events from DB and process if state not cached' +
        ' and cached state otherwise',
      async () => {
        const id = '1';
        const state = createScenarioState({ activeScenarioId: id });
        const scenario = createActiveScenario({
          _id: id,
          initialState: createScenarioState({ activeScenarioId: id })
        });

        activeScenario.ActiveScenarioModel.findById = jest.fn(
          async () => scenario
        );

        const eventRunnerMock = createEventRunnerMock({
          processEvents: jest.fn(() => state)
        });

        const sut = createActiveScenarioManager(eventRunnerMock);

        const dbScenario = await sut.getScenario(id);
        const uncachedScenario = await sut.getScenario(id);
        const cachedScenario = await sut.getScenario(id);

        expect(
          activeScenario.ActiveScenarioModel.findById
        ).toHaveBeenCalledTimes(1);
        expect(activeScenario.ActiveScenarioModel.findById).toBeCalledWith(id);
        expect(eventRunnerMock.processEvents).toHaveBeenCalledTimes(1);
        expect(dbScenario).toEqual(scenario.initialState);
        expect(uncachedScenario).toEqual(scenario.initialState);
        expect(cachedScenario).toEqual(uncachedScenario);
      }
    );
  });

  describe('.updateScenario', () => {
    it('should update event in DB and return updated state', async () => {
      const id = '1';

      const returnedState = createScenarioState({
        activeScenarioId: id
      });
      const eventRunnerMock = createEventRunnerMock({
        processEvents: jest.fn(() => returnedState)
      });

      activeScenario.ActiveScenarioModel.updateOne = jest.fn();
      activeScenario.ActiveScenarioModel.findById = jest.fn(
        async () => returnedState
      );

      const events = [createEvent({ activeScenarioId: id })];

      const sut = createActiveScenarioManager(eventRunnerMock);

      const updatedState = await sut.updateScenario(id, events);

      expect(
        activeScenario.ActiveScenarioModel.updateOne
      ).toHaveBeenCalledTimes(1);
      expect(activeScenario.ActiveScenarioModel.updateOne).toBeCalledWith(
        {
          _id: id
        },
        {
          $push: { $each: events }
        }
      );

      expect(updatedState).toEqual(returnedState);
      expect(eventRunnerMock.processEvents).toHaveBeenCalledTimes(1);
      expect(eventRunnerMock.processEvents).toBeCalledWith(
        events,
        returnedState
      );
    });
  });

  describe('.getScenarioHistory', () => {
    it('should return array of events for active scenario', async () => {
      const id = '1';
      const events = [createEvent()];
      const activeScenarioModel = createActiveScenario({ events: events });

      activeScenario.ActiveScenarioModel.findById = jest.fn(
        async () => activeScenarioModel
      );

      const sut = createActiveScenarioManager(createEventRunnerMock());

      const history = await sut.getScenarioHistory(id);

      expect(history).toEqual(events);
      expect(activeScenario.ActiveScenarioModel.findById).toBeCalledWith(id);
    });
  });
});
