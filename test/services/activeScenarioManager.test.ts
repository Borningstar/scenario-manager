import { createActiveScenarioManager } from '../../src/services/activeScenarioManager';
import * as as from '../../src/models/activeScenario';
import { createScenarioState } from '../models';
import { createEventRunner } from '../../src/services/eventRunner';
import { createEventRunnerMock } from '.';

describe('activeScenarioManager', () => {
  beforeEach(() => {
    spyOn(as, 'ActiveScenarioModel');
  });

  describe('.getScenario', () => {
    it('should call ActiveScenarioModel.findById and eventRunner.processEvents if scenario not cached', async () => {
      const eventRunner = createEventRunnerMock();
      const sut = createActiveScenarioManager(eventRunner);

      const id = '1';

      as.ActiveScenarioModel.findById = jest.fn(async () =>
        createScenarioState()
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

      const activeScenario = createScenarioState();

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
