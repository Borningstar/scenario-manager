import { IActiveScenarioManager } from '.';
import { ActiveScenario } from '../models/activeScenario';

const getScenario = (id: string): ActiveScenario => {
  throw new Error('Not implemented');
};

const updateScenario = (state: ActiveScenario): void => {
  throw new Error('Not implemented');
};

export const createActiveScenarioManager = (): IActiveScenarioManager => ({
  getScenario: (id: string) => getScenario(id),
  updateScenario: (state: ActiveScenario) => updateScenario(state)
});
