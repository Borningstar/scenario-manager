import { IActiveScenarioManager } from '../../src/services';
import { createActiveScenario } from '../models';

export const createStateManagerMock = (
  props?: Partial<IActiveScenarioManager>
) => ({
  getScenario: jest.fn(async () => createActiveScenario()),
  updateScenario: jest.fn(),
  ...props
});
