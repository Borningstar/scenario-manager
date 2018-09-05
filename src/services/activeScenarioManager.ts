import { IActiveScenarioManager, IEventRunner } from '.';
import { ActiveScenarioModel } from '../models/activeScenario';
import { ScenarioState } from '../models/scenarioState';
import { ScenarioEvent } from '../models/scenarioEvent';

let scenarios: ReadonlyArray<ScenarioState> = [];

// TODO: Check what happens when it fails to find
const getScenario = async (
  id: string,
  eventRunner: IEventRunner
): Promise<ScenarioState> => {
  let scenario = scenarios.find(s => s.activeScenarioId === id);

  if (scenario) {
    return scenario;
  }

  const model = await ActiveScenarioModel.findById(id);

  scenario = eventRunner.processEvents(model.events, model.initialState);

  scenarios = [...scenarios, scenario];

  return scenario;
};

// TODO: Check what happens when it fails to find
const updateScenario = async (
  id: string,
  events: ReadonlyArray<ScenarioEvent>,
  eventRunner: IEventRunner
): Promise<ScenarioState> => {
  const state = await getScenario(id, eventRunner);

  await ActiveScenarioModel.updateOne(
    { _id: id },
    { $push: { $each: events } }
  );

  const updatedState = eventRunner.processEvents(events, state);

  scenarios = [...scenarios.filter(s => s._id), updatedState];

  return updatedState;
};

// TODO: Check what happens when it fails to find
const getScenarioHistory = async (
  id: string
): Promise<ReadonlyArray<ScenarioEvent>> => {
  const model = await ActiveScenarioModel.findById(id);

  return model.events;
};

export const createActiveScenarioManager = (
  eventRunner: IEventRunner
): IActiveScenarioManager => ({
  getScenario: (id: string) => getScenario(id, eventRunner),
  getScenarioHistory: (id: string) => getScenarioHistory(id),
  updateScenario: (id: string, events: ReadonlyArray<ScenarioEvent>) =>
    updateScenario(id, events, eventRunner)
});
