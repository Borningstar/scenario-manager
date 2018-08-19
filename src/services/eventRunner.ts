import { ScenarioEvent } from '../types';
import { IActions, ActionType } from '../actions';
import { IEventRunner } from '.';
import { ActiveScenario } from '../models/activeScenario';

const processEvents = (
  events: ReadonlyArray<ScenarioEvent>,
  scenario: ActiveScenario,
  actions: IActions,
  index: number = 0
): ActiveScenario => {
  if (index >= events.length) {
    return scenario;
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
        scenario,
        event.properties.value,
        event.properties.destinationVariable
      );

      return processEvents(events, updatedScenario, actions, index + 1);
  }
};

export const createEventRunner = (actions: IActions): IEventRunner => ({
  processEvents: (
    event: ReadonlyArray<ScenarioEvent>,
    scenario: ActiveScenario
  ) => processEvents(event, scenario, actions)
});
