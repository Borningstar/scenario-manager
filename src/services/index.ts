import { ScenarioEvent } from '../types';
import { ActiveScenario } from '../models/activeScenario';

export interface IEventRunner {
  processEvents: (
    event: ReadonlyArray<ScenarioEvent>,
    state: ActiveScenario
  ) => ActiveScenario;
}

export interface IActiveScenarioManager {
  getScenario: (id: string) => Promise<ActiveScenario>;
  updateScenario: (state: ActiveScenario) => Promise<void>;
}
