import { ScenarioEvent, ActiveScenarioState } from '../types';

export interface IEventRunner {
  triggerEvent: (event: ScenarioEvent) => void;
}

export interface IActiveScenarioManager {
  getScenario: (id: string) => ActiveScenarioState;
  updateScenario: (state: ActiveScenarioState) => void;
}
