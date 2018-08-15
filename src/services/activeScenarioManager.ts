import { IActiveScenarioManager } from '.';
import { ActiveScenario, ActiveScenarioModel } from '../models/activeScenario';

// TODO: Check what happens when it fails to find
const getScenario = async (id: string): Promise<ActiveScenario> =>
  await ActiveScenarioModel.findById(id);

const updateScenario = (state: ActiveScenario): void => {
  throw new Error('Not implemented');
};

export const createActiveScenarioManager = (): IActiveScenarioManager => ({
  getScenario: (id: string) => getScenario(id),
  updateScenario: (state: ActiveScenario) => updateScenario(state)
});
