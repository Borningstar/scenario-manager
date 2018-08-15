import { IActiveScenarioManager } from '.';
import { ActiveScenario, ActiveScenarioModel } from '../models/activeScenario';

// TODO: Check what happens when it fails to find
const getScenario = async (id: string): Promise<ActiveScenario> =>
  await ActiveScenarioModel.findById(id);

// TODO: Check what happens when it fails to find
const updateScenario = async (scenario: ActiveScenario): Promise<void> =>
  await ActiveScenarioModel.updateOne({ _id: scenario._id }, scenario);

export const createActiveScenarioManager = (): IActiveScenarioManager => ({
  getScenario: (id: string) => getScenario(id),
  updateScenario: (state: ActiveScenario) => updateScenario(state)
});
