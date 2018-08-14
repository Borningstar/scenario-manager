import { IStateManager } from '.';
import { ActiveScenarioState } from '../types';

const getState = (id: string): ActiveScenarioState => {
  throw new Error('Not implemented');
};

const setState = (state: ActiveScenarioState): void => {
  throw new Error('Not implemented');
};

export const createStateManager = (): IStateManager => ({
  getState: (id: string) => getState(id),
  setState: (state: ActiveScenarioState) => setState(state)
});
