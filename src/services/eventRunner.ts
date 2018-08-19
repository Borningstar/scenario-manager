import { ScenarioEvent } from '../types';
import { IActions, ActionType } from '../actions';
import { IEventRunner, IActiveScenarioManager } from '.';
import { ActiveScenario } from '../models/activeScenario';

const triggerEvent = (
  events: ReadonlyArray<ScenarioEvent>,
  scenario: ActiveScenario,
  actions: IActions
): ActiveScenario => {
  let updatedScenario = scenario;

  events.forEach(event => {
    switch (event.action) {
      case ActionType.AddValueToVariable:
        if (typeof event.properties.value !== 'number') {
          throw new Error(
            `Value type in event properties is not a number: ${JSON.stringify(
              events
            )}`
          );
        }

        updatedScenario = actions.addValueToVariable(
          scenario,
          event.properties.value,
          event.properties.destinationVariable
        );

        break;
    }
  });

  return updatedScenario;
};

export const createEventRunner = (actions: IActions): IEventRunner => ({
  processEvents: (
    event: ReadonlyArray<ScenarioEvent>,
    scenario: ActiveScenario
  ) => triggerEvent(event, scenario, actions)
});
