import { IEventRunnerMiddleware, ILogger } from '../services';
import { ScenarioState } from '../models/scenarioState';
import { ScenarioEvent } from '../models/scenarioEvent';

const createVentRunnerLogger = (logger: ILogger): IEventRunnerMiddleware => ({
  preEvent: (data: { state: ScenarioState; event: ScenarioEvent }) => {
    logger.logInfo(`==================================`);
    logger.logInfo(`Processing event, existing state: `);
    logger.logInfo(JSON.stringify(data.state, undefined, 2));
    logger.logInfo(`Event: `);
    logger.logInfo(JSON.stringify(data.event, undefined, 2));
  },
  postEvent: (data: { state: ScenarioState }) => {
    logger.logInfo(`Finished processing event, updated state: `);
    logger.logInfo(JSON.stringify(data.state, undefined, 2));
    logger.logInfo(`==================================`);
  }
});

export default createVentRunnerLogger;
