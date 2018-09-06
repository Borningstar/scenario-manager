import { IEventRunnerMiddleware } from '../services';
import { ScenarioState } from '../models/scenarioState';
import { ScenarioEvent } from '../models/scenarioEvent';

const eventRunnerLogger: IEventRunnerMiddleware = {
  preEvent: (data: { state: ScenarioState; event: ScenarioEvent }) => {
    console.log(`==================================`);
    console.log(`Processing event, existing state: `);
    console.log(JSON.stringify(data.state, undefined, 2));
    console.log(`Event: `);
    console.log(JSON.stringify(data.event, undefined, 2));
  },
  postEvent: (data: { state: ScenarioState }) => {
    console.log(`Finished processing event, updated state: `);
    console.log(JSON.stringify(data.state, undefined, 2));
    console.log(`==================================`);
  }
};

export default eventRunnerLogger;
