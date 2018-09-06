import ActiveScenarioManager from '../../src/services/activeScenarioManager';
import * as activeScenario from '../../src/models/activeScenario';
import {
  createScenarioState,
  createActiveScenario,
  createEvent
} from '../models';
import { createEventRunnerMock } from '.';
import { ModelNotFoundError } from '../../src/utility';

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

        const sut = new ActiveScenarioManager(eventRunnerMock);

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

    it('should throw error when finding scenario throws error', async () => {
      activeScenario.ActiveScenarioModel.findById = jest.fn(async () => {
        throw new Error('error');
      });

      const sut = new ActiveScenarioManager(createEventRunnerMock());

      await expect(sut.getScenario('1')).rejects.toThrowError('error');
    });

    it('should throw not found error when active scenario not found', async () => {
      activeScenario.ActiveScenarioModel.findById = jest.fn(
        async () => undefined
      );

      const id = '1';
      const expectedError = new ModelNotFoundError(
        'Active Scenario not found with ID ' + id,
        id
      );

      const sut = new ActiveScenarioManager(createEventRunnerMock());

      await expect(sut.getScenario(id)).rejects.toThrowError(expectedError);
    });
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

      const sut = new ActiveScenarioManager(eventRunnerMock);

      const updatedState = await sut.updateScenario(id, events);

      expect(
        activeScenario.ActiveScenarioModel.updateOne
      ).toHaveBeenCalledTimes(1);
      expect(activeScenario.ActiveScenarioModel.updateOne).toBeCalledWith(
        {
          _id: id
        },
        {
          $push: { events: { $each: events } }
        }
      );

      expect(updatedState).toEqual(returnedState);
      expect(eventRunnerMock.processEvents).toHaveBeenCalledTimes(2);
      expect(eventRunnerMock.processEvents).toBeCalledWith(
        events,
        returnedState
      );
    });

    it('should throw error when finding scenario throws error', async () => {
      activeScenario.ActiveScenarioModel.findById = jest.fn(async () =>
        createActiveScenario()
      );

      activeScenario.ActiveScenarioModel.updateOne = jest.fn(async () => {
        throw new Error('error');
      });

      const sut = new ActiveScenarioManager(createEventRunnerMock());

      await expect(sut.updateScenario('1', [])).rejects.toThrowError('error');
    });

    it('should throw not found error when active scenario not found', async () => {
      activeScenario.ActiveScenarioModel.findById = jest.fn(
        async () => undefined
      );

      const id = '1';

      const expectedError = new ModelNotFoundError(
        'Active Scenario not found with ID ' + id,
        id
      );

      const sut = new ActiveScenarioManager(createEventRunnerMock());

      await expect(sut.updateScenario(id, [])).rejects.toThrowError(
        expectedError
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

      const sut = new ActiveScenarioManager(createEventRunnerMock());

      const history = await sut.getScenarioHistory(id);

      expect(history).toEqual(events);
      expect(activeScenario.ActiveScenarioModel.findById).toBeCalledWith(id);
    });

    it('should throw error when finding scenario throws error', async () => {
      activeScenario.ActiveScenarioModel.findById = jest.fn(async () => {
        throw new Error('error');
      });

      const sut = new ActiveScenarioManager(createEventRunnerMock());

      await expect(sut.getScenarioHistory('1')).rejects.toThrowError('error');
    });

    it('should throw not found error when active scenario not found', async () => {
      activeScenario.ActiveScenarioModel.findById = jest.fn(
        async () => undefined
      );

      const id = '1';
      const expectedError = new ModelNotFoundError(
        'Active Scenario not found with ID ' + id,
        id
      );

      const sut = new ActiveScenarioManager(createEventRunnerMock());

      await expect(sut.getScenarioHistory(id)).rejects.toThrowError(
        expectedError
      );
    });
  });
});
