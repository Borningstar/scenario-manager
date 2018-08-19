import { IActiveScenarioManager, IEventRunner } from '../../src/services';
import { createScenarioState } from '../models';

export const createStateManagerMock = (
  props?: Partial<IActiveScenarioManager>
) => ({
  getScenario: jest.fn(async () => createScenarioState()),
  updateScenario: jest.fn(),
  ...props
});

export const createEventRunnerMock = (props?: Partial<IEventRunner>) => ({
  processEvents: jest.fn(() => createScenarioState()),
  ...props
});
