import { ScenarioEvent } from '../types';
import { IActions, ActionType } from '../actions';
import { IEventRunner, IActiveScenarioManager } from '.';

const triggerEvent = async (
  event: ScenarioEvent,
  actions: IActions,
  activeScenarioManager: IActiveScenarioManager
) => {
  const activeScenario = await activeScenarioManager.getScenario(
    event.activeScenarioId
  );

  switch (event.action) {
    case ActionType.AddValueToVariable:
      if (typeof event.properties.value !== 'number') {
        throw new Error(
          `Value type in event properties it not a number: ${JSON.stringify(
            event
          )}`
        );
      }

      const newState = actions.addValueToVariable(
        activeScenario,
        event.properties.value,
        event.properties.destinationVariable
      );

      activeScenarioManager.updateScenario(newState);

      break;
  }
};

export const createEventRunner = (
  actions: IActions,
  stateManager: IActiveScenarioManager
): IEventRunner => ({
  triggerEvent: (event: ScenarioEvent) =>
    triggerEvent(event, actions, stateManager)
});
