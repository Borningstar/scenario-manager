import { createActiveScenarioManager } from '../../src/services/activeScenarioManager';
import * as asm from '../../src/models/activeScenario';
import {
  createScenarioState,
  createActiveScenario,
  createEvent
} from '../models';
import { createEventRunnerMock } from '.';

describe('activeScenarioManager', () => {
  beforeEach(() => {
    spyOn(asm, 'ActiveScenarioModel');
  });

  describe('.getScenario', () => {
    it(
      'should call ActiveScenarioModel.findById and eventRunner.processEvents' +
        ' if scenario not cached',
      async () => {
        const id = '1';
        const state = createScenarioState({ activeScenarioId: id });
        const scenario = createActiveScenario({
          _id: id,
          initialState: createScenarioState({ activeScenarioId: id })
        });

        asm.ActiveScenarioModel.findById = jest.fn(async () => scenario);

        const eventRunnerMock = createEventRunnerMock({
          processEvents: jest.fn(() => state)
        });

        const sut = createActiveScenarioManager(eventRunnerMock);

        const dbScenario = await sut.getScenario(id);
        const cachedScenario = await sut.getScenario(id);

        expect(asm.ActiveScenarioModel.findById).toHaveBeenCalledTimes(1);
        expect(asm.ActiveScenarioModel.findById).toBeCalledWith(id);
        expect(eventRunnerMock.processEvents).toHaveBeenCalledTimes(1);
        expect(dbScenario).toEqual(scenario.initialState);
        expect(cachedScenario).toEqual(scenario.initialState);
      }
    );
  });

  describe('.updateScenario', () => {
    it(
      'should call ActiveScenarioModel.updateOne and' +
        ' eventRunner.processEvents',
      async () => {
        const returnedState = createScenarioState();
        const eventRunnerMock = createEventRunnerMock({
          processEvents: jest.fn(() => returnedState)
        });

        asm.ActiveScenarioModel.updateOne = jest.fn();
        asm.ActiveScenarioModel.findById = jest.fn(async () => returnedState);

        const events = [createEvent()];
        const id = '1';

        const sut = createActiveScenarioManager(eventRunnerMock);

        const updatedState = await sut.updateScenario(id, events);

        expect(asm.ActiveScenarioModel.updateOne).toHaveBeenCalledTimes(1);
        expect(asm.ActiveScenarioModel.updateOne).toBeCalledWith(
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
      }
    );
  });
});
