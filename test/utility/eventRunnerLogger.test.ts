import { createLoggerMock } from '../services';
import createEventRunnerLogger from '../../src/utility/eventRunnerLogger';
import { createScenarioState, createScenarioEvent } from '../models';

describe('eventRunnerLogger', () => {
  describe('.preEvent', () => {
    it('should send state and event data to logger', () => {
      const loggerMock = createLoggerMock();
      const state = createScenarioState();
      const event = createScenarioEvent();

      const sut = createEventRunnerLogger(loggerMock);
      sut.preEvent({ state, event });

      expect(loggerMock.logInfo).toHaveBeenCalledTimes(5);
      expect(loggerMock.logInfo).toBeCalledWith(
        '=================================='
      );
      expect(loggerMock.logInfo).toBeCalledWith(
        'Processing event, existing state: '
      );
      expect(loggerMock.logInfo).toBeCalledWith(
        JSON.stringify(state, undefined, 2)
      );
      expect(loggerMock.logInfo).toBeCalledWith('Event: ');
      expect(loggerMock.logInfo).toBeCalledWith(
        JSON.stringify(event, undefined, 2)
      );
    });
  });
  describe('.postEvent', () => {
    it('should send state logger', () => {
      const loggerMock = createLoggerMock();
      const state = createScenarioState();

      const sut = createEventRunnerLogger(loggerMock);
      sut.postEvent({ state });

      expect(loggerMock.logInfo).toHaveBeenCalledTimes(3);
      expect(loggerMock.logInfo).toBeCalledWith(
        'Finished processing event, updated state: '
      );
      expect(loggerMock.logInfo).toBeCalledWith(
        JSON.stringify(state, undefined, 2)
      );
      expect(loggerMock.logInfo).toBeCalledWith(
        '=================================='
      );
    });
  });
});
