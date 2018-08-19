import { createEventRunner } from '../../src/services/eventRunner';
import { EventType, EventProperties, ScenarioEvent } from '../../src/types';
import { ActionType } from '../../src/actions';
import { IActiveScenarioManager } from '../../src/services';
import { createActionsMock } from '../actions';
import { createActiveScenario, createVariableMock } from '../models';
import { stat } from 'fs';

const createEvent = (props?: Partial<ScenarioEvent>) => ({
  id: '1',
  activeScenarioId: '1',
  name: 'event',
  action: ActionType.AddValueToVariable,
  type: EventType.Activated,
  properties: createProperties(),
  ...props
});

const createProperties = (props?: Partial<EventProperties>) => ({
  value: 1,
  destinationVariable: 'variable',
  sourceVariable: 'variable',
  ...props
});

describe('eventRunner', () => {
  describe('.triggerEvent', () => {
    it('should call each action and return updated state', () => {
      const value = 1;
      const newValue = 2;
      const destinationVariable = 'variable';

      const scenario = createActiveScenario({
        variables: [
          createVariableMock({
            name: destinationVariable,
            value
          })
        ]
      });

      const returnedScenario = createActiveScenario({
        variables: [
          createVariableMock({
            name: destinationVariable,
            value: newValue
          })
        ]
      });

      const actionsMock = createActionsMock({
        addValueToVariable: jest.fn(() => returnedScenario)
      });

      const sut = createEventRunner(actionsMock);

      const events = [
        createEvent({
          action: ActionType.AddValueToVariable
        }),
        createEvent({
          action: ActionType.AddValueToVariable
        })
      ];

      const updatedScenario = sut.processEvents(events, scenario);

      expect(actionsMock.addValueToVariable).toHaveBeenCalledTimes(2);
      expect(updatedScenario).toEqual(returnedScenario);
    });
    describe('when action type is AddValueToVariable', () => {
      it('should call AddValueToVariable with properties', () => {
        const actionsMock = createActionsMock({
          addValueToVariable: jest.fn()
        });

        const scenario = createActiveScenario();

        const sut = createEventRunner(actionsMock);

        const value = 1;
        const destinationVariable = 'variable';

        const events = [
          createEvent({
            action: ActionType.AddValueToVariable,
            properties: createProperties({
              value,
              destinationVariable
            })
          })
        ];

        sut.processEvents(events, scenario);

        expect(actionsMock.addValueToVariable).toHaveBeenCalledTimes(1);
        expect(actionsMock.addValueToVariable).toBeCalledWith(
          scenario,
          value,
          destinationVariable
        );
      });

      it('should throw when properties value is not a number', () => {
        expect.assertions(1);

        const sut = createEventRunner(createActionsMock());

        const events = [
          createEvent({
            action: ActionType.AddValueToVariable,
            properties: createProperties({
              value: 'a'
            })
          })
        ];

        expect(() =>
          sut.processEvents(events, createActiveScenario())
        ).toThrowError(
          `Value type in event properties is not a number: ${JSON.stringify(
            events
          )}`
        );
      });
    });
  });
});
