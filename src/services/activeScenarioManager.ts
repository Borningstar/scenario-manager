import { IActiveScenarioManager } from '.';
import { ActiveScenarioModel } from '../models/activeScenario';
import { ScenarioState } from '../models/scenarioState';

// TODO: Check what happens when it fails to find
const getScenario = async (id: string): Promise<ScenarioState> => {
  throw new Error('Not implemented');

  await ActiveScenarioModel.findById(id);
};

// TODO: Check what happens when it fails to find
const updateScenario = async (
  id: string,
  events: ReadonlyArray<Event>
): Promise<ScenarioState> => {
  throw new Error('Not implemented');

  // await ActiveScenarioModel.updateOne({ _id: id }, scenario);
};

const getScenarioHistory = async (
  id: string
): Promise<ReadonlyArray<Event>> => {
  throw new Error('Not implemented');
};

export const createActiveScenarioManager = (): IActiveScenarioManager => ({
  getScenario: (id: string) => getScenario(id),
  getScenarioHistory: (id: string) => getScenarioHistory(id),
  updateScenario: (id: string, events: ReadonlyArray<Event>) =>
    updateScenario(id, events)
});
