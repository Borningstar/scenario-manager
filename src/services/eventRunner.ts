import { IActions, ActionType } from '../actions';
import { IEventRunner, IEventRunnerMiddleware } from '.';
import { ScenarioEvent } from '../models/scenarioEvent';
import { ScenarioState } from '../models/scenarioState';

const processEvents = (
  events: ReadonlyArray<ScenarioEvent>,
  state: ScenarioState,
  actions: IActions,
  middleware: ReadonlyArray<IEventRunnerMiddleware> = [],
  index: number = 0
): ScenarioState => {
  if (index >= events.length) {
    return state;
  }

  const event = events[index];

  middleware.forEach(mw => mw.preEvent({ state, event }));

  switch (event.action) {
    case ActionType.AddValueToVariable:
      if (typeof event.properties.value !== 'number') {
        throw new Error(
          `Value type in event properties is not a number, event: ${JSON.stringify(
            event
          )}`
        );
      }

      const updatedState = actions.addValueToVariable(
        state,
        event.properties.value,
        event.properties.destinationVariable
      );

      middleware.forEach(mw => mw.postEvent({ state: updatedState, event }));

      return processEvents(
        events,
        updatedState,
        actions,
        middleware,
        index + 1
      );
  }
};

export const createEventRunner = (
  actions: IActions,
  middleware?: ReadonlyArray<IEventRunnerMiddleware>
): IEventRunner => ({
  processEvents: (
    event: ReadonlyArray<ScenarioEvent>,
    scenario: ScenarioState
  ) => processEvents(event, scenario, actions, middleware)
});
