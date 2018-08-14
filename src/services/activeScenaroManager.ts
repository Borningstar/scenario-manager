import { IActiveScenarioManager } from '.';
import { ActiveScenarioState } from '../types';

const getScenario = (id: string): ActiveScenarioState => {
  throw new Error('Not implemented');
};

const updateScenario = (state: ActiveScenarioState): void => {
  throw new Error('Not implemented');
};

export const createActiveScenarioManager = (): IActiveScenarioManager => ({
  getScenario: (id: string) => getScenario(id),
  updateScenario: (state: ActiveScenarioState) => updateScenario(state)
});
