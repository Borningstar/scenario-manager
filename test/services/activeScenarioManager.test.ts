import { createActiveScenarioManager } from '../../src/services/activeScenarioManager';
import * as as from '../../src/models/activeScenario';
import { createActiveScenario } from '../models';

describe('activeScenarioManager', () => {
  beforeEach(() => {
    spyOn(as, 'ActiveScenarioModel');
  });

  describe('.getScenario', () => {
    it('should call ActiveScenarioModel.findById', async () => {
      const sut = createActiveScenarioManager();

      const id = '1';

      as.ActiveScenarioModel.findById = jest.fn(async () =>
        createActiveScenario()
      );

      await sut.getScenario(id);

      expect(as.ActiveScenarioModel.findById).toHaveBeenCalledTimes(1);
      expect(as.ActiveScenarioModel.findById).toBeCalledWith(id);
    });
  });

  describe('.updateScenario', () => {
    it('should call ActiveScenarioModel.updateOne', async () => {
      const sut = createActiveScenarioManager();

      as.ActiveScenarioModel.updateOne = jest.fn();

      const activeScenario = createActiveScenario();

      await sut.updateScenario(activeScenario);

      expect(as.ActiveScenarioModel.updateOne).toHaveBeenCalledTimes(1);
      expect(as.ActiveScenarioModel.updateOne).toBeCalledWith(
        {
          _id: activeScenario._id
        },
        activeScenario
      );
    });
  });
});
