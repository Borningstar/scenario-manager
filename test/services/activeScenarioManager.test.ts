import { createActiveScenarioManager } from '../../src/services/activeScenarioManager';
import * as activeScenario from '../../src/models/activeScenario';
import { createActiveScenario } from '../models';

describe('activeScenarioManager', () => {
  beforeEach(() => {
    spyOn(activeScenario, 'ActiveScenarioModel');
  });

  describe('.getScenario', () => {
    it('should call ActiveScenarioModel.Find', async () => {
      const sut = createActiveScenarioManager();

      const id = '1';

      activeScenario.ActiveScenarioModel.findById = jest.fn(async () =>
        createActiveScenario()
      );

      await sut.getScenario(id);

      expect(activeScenario.ActiveScenarioModel.findById).toHaveBeenCalledTimes(
        1
      );
      expect(activeScenario.ActiveScenarioModel.findById).toBeCalledWith(id);
    });
  });
});
