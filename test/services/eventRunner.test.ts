import { createEventRunner } from '../../src/services/eventRunner';
import { EventType, EventProperties } from '../../src/types';
import { ActionType } from '../../src/actions';
import { createActionsMock } from '../actions';
import { createScenarioState, createVariableMock } from '../models';
import { ScenarioEvent } from '../../src/models/scenarioEvent';

const createEvent = (props?: Partial<ScenarioEvent>) =>
  ({
    _id: '1',
    activeScenarioId: '1',
    name: 'event',
    action: ActionType.AddValueToVariable,
    type: EventType.Activated,
    properties: createProperties(),
    createdAt: new Date('2018-08-08'),
    updatedAt: new Date('2018-08-08'),
    ...props
  } as ScenarioEvent);

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

      const scenario = createScenarioState({
        variables: [
          createVariableMock({
            name: destinationVariable,
            value
          })
        ]
      });

      const returnedScenario = createScenarioState({
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

        const scenario = createScenarioState();

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
          sut.processEvents(events, createScenarioState())
        ).toThrowError(
          `Value type in event properties is not a number: ${JSON.stringify(
            events[0]
          )}`
        );
      });
    });
  });
});
