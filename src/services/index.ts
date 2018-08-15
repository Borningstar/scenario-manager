import { ScenarioEvent } from '../types';
import { ActiveScenario } from '../models/activeScenario';

export interface IEventRunner {
  triggerEvent: (event: ScenarioEvent) => void;
}

export interface IActiveScenarioManager {
  getScenario: (id: string) => Promise<ActiveScenario>;
  updateScenario: (state: ActiveScenario) => void;
}
