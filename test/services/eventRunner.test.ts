import { createEventRunner } from '../../src/services/eventRunner';
import { EventType, EventProperties, ScenarioEvent } from '../../src/types';
import { ActionType } from '../../src/actions';
import { IActiveScenarioManager } from '../../src/services';
import { createActionsMock } from '../actions';
import { createActiveScenario } from '../models';

const createEvent = (props?: Partial<ScenarioEvent>) => ({
  id: '1',
  activeScenarioId: '1',
  name: 'event',
  action: ActionType.AddValueToVariable,
  type: EventType.activated,
  properties: createProperties(),
  ...props
});

const createProperties = (props?: Partial<EventProperties>) => ({
  value: 1,
  destinationVariable: 'variable',
  sourceVariable: 'variable',
  ...props
});

const createStateManagerMock = (props?: Partial<IActiveScenarioManager>) => ({
  getScenario: jest.fn(async () => createActiveScenario()),
  updateScenario: jest.fn(),
  ...props
});

describe('eventRunner', () => {
  describe('.triggerEvent', () => {
    describe('when action type is AddValueToVariable', () => {
      it('should call getState when calling and and setState with new state', async () => {
        const newState = createActiveScenario({ id: '2' });

        const actionsMock = createActionsMock({
          addValueToVariable: jest.fn(() => newState)
        });

        const stateManagerMock = createStateManagerMock({
          getScenario: jest.fn(async () => createActiveScenario()),
          updateScenario: jest.fn()
        });

        const sut = createEventRunner(actionsMock, stateManagerMock);

        const event = createEvent({
          action: ActionType.AddValueToVariable,
          properties: createProperties()
        });

        await sut.triggerEvent(event);

        expect(stateManagerMock.getScenario).toHaveBeenCalledTimes(1);
        expect(stateManagerMock.updateScenario).toHaveBeenCalledTimes(1);
        expect(stateManagerMock.updateScenario).toHaveBeenCalledWith(newState);
      });

      it('should call AddValueToVariable with properties', async () => {
        const actionsMock = createActionsMock({
          addValueToVariable: jest.fn()
        });

        const state = createActiveScenario();

        const stateManagerMock = createStateManagerMock({
          getScenario: jest.fn(async () => state)
        });

        const sut = createEventRunner(actionsMock, stateManagerMock);

        const value = 1;
        const destinationVariable = 'variable';

        const event = createEvent({
          action: ActionType.AddValueToVariable,
          properties: createProperties({
            value,
            destinationVariable
          })
        });

        await sut.triggerEvent(event);

        expect(actionsMock.addValueToVariable).toHaveBeenCalledTimes(1);
        expect(actionsMock.addValueToVariable).toBeCalledWith(
          state,
          value,
          destinationVariable
        );
      });

      it('should throw when properties value is not a number', async () => {
        expect.assertions(1);

        const sut = createEventRunner(
          createActionsMock(),
          createStateManagerMock()
        );

        const event = createEvent({
          action: ActionType.AddValueToVariable,
          properties: createProperties({
            value: 'a'
          })
        });

        await expect(sut.triggerEvent(event)).rejects.toThrowError(
          `Value type in event properties it not a number: ${JSON.stringify(
            event
          )}`
        );
      });
    });
  });
});
