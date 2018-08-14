import { ScenarioEvent } from '../types';
import { IActions, ActionType } from '../actions';
import { IEventRunner, IStateManager } from '.';

const triggerEvent = async (
  event: ScenarioEvent,
  actions: IActions,
  stateManager: IStateManager
) => {
  const state = await stateManager.getState(event.activeScenarioId);

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
        state,
        event.properties.value,
        event.properties.destinationVariable
      );

      stateManager.setState(newState);
      break;
  }
};

export const createEventRunner = (
  actions: IActions,
  stateManager: IStateManager
): IEventRunner => ({
  triggerEvent: (event: ScenarioEvent) =>
    triggerEvent(event, actions, stateManager)
});
