import { IActions, ActionType } from '../actions';
import { IEventRunner } from '.';
import { ScenarioEvent } from '../models/scenarioEvent';
import { ScenarioState } from '../models/scenarioState';

const processEvents = (
  events: ReadonlyArray<ScenarioEvent>,
  state: ScenarioState,
  actions: IActions,
  index: number = 0
): ScenarioState => {
  if (index >= events.length) {
    return state;
  }

  const event = events[index];

  switch (event.action) {
    case ActionType.AddValueToVariable:
      if (typeof event.properties.value !== 'number') {
        throw new Error(
          `Value type in event properties is not a number: ${JSON.stringify(
            event
          )}`
        );
      }

      const updatedScenario = actions.addValueToVariable(
        state,
        event.properties.value,
        event.properties.destinationVariable
      );

      return processEvents(events, updatedScenario, actions, index + 1);
  }
};

export const createEventRunner = (actions: IActions): IEventRunner => ({
  processEvents: (
    event: ReadonlyArray<ScenarioEvent>,
    scenario: ScenarioState
  ) => processEvents(event, scenario, actions)
});
