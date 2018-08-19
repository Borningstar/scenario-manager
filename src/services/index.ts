import { ActiveScenario } from '../models/activeScenario';
import { ScenarioEvent } from '../models/scenarioEvent';
import { ScenarioState } from '../models/scenarioState';

export interface IEventRunner {
  processEvents: (
    event: ReadonlyArray<ScenarioEvent>,
    scenario: ScenarioState
  ) => ActiveScenario;
}

export interface IActiveScenarioManager {
  getScenario: (id: string) => Promise<ScenarioState>;
  getScenarioHistory: (id: string) => Promise<ReadonlyArray<Event>>;
  updateScenario: (
    id: string,
    events: ReadonlyArray<Event>
  ) => Promise<ScenarioState>;
}
