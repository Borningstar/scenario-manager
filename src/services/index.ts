import { ScenarioEvent } from '../models/scenarioEvent';
import { ScenarioState } from '../models/scenarioState';

export interface IEventRunnerMiddleware {
  preEvent: (
    data: {
      state?: ScenarioState;
      event?: ScenarioEvent;
    }
  ) => void;
  postEvent: (
    data: {
      state?: ScenarioState;
      event?: ScenarioEvent;
    }
  ) => void;
}

export interface IEventRunner {
  processEvents: (
    event: ReadonlyArray<ScenarioEvent>,
    scenario: ScenarioState
  ) => ScenarioState;
}

export interface IActiveScenarioManager {
  getScenario: (id: string) => Promise<ScenarioState>;
  getScenarioHistory: (id: string) => Promise<ReadonlyArray<ScenarioEvent>>;
  updateScenario: (
    id: string,
    events: ReadonlyArray<ScenarioEvent>
  ) => Promise<ScenarioState>;
}

export interface ILogger {
  logInfo: (message: string) => void;
}
