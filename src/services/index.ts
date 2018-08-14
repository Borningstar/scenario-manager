import { ScenarioEvent, ActiveScenarioState } from '../types';

export interface IEventRunner {
  triggerEvent: (event: ScenarioEvent) => void;
}

export interface IStateManager {
  getState: (id: string) => ActiveScenarioState;
  setState: (state: ActiveScenarioState) => void;
}
