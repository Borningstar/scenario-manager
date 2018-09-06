import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { indexRouter } from './routes';
import { connectToDatabase } from './services/database';
import { createEventRunner } from './services/eventRunner';
import actions, { ActionType } from './actions';
import { EventType } from './types';
import ActiveScenarioManager from './services/activeScenarioManager';
import { ScenarioEventModel } from './models/scenarioEvent';
import eventRunnerLogger from './utility/eventRunnerLogger';
import { createConsoleLogger } from './services/consoleLogger';

// import { ActiveScenarioModel } from '../models/activeScenario';
// import { VariableType } from '../types';
// import { ScenarioState, ScenarioStateModel } from '../models/scenarioState';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const initialiseApp = async () => {
  await connectToDatabase();

  const logger = createConsoleLogger();

  const eventRunner = createEventRunner(actions, [eventRunnerLogger(logger)]);
  const activeScenarioManager = new ActiveScenarioManager(eventRunner);

  // Way to quickly add scenarios until adding functionality complete
  // const scenario = new ActiveScenarioModel({
  //   scenarioId: '1',
  //   initialState: new ScenarioStateModel({
  //     activeScenarioId: '1',
  //     variables: [
  //       {
  //         name: 'variable',
  //         type: VariableType.number
  //       }
  //     ]
  //   })
  // });

  // try {
  //   console.log('New scenario: ' + scenario);

  //   await scenario.save();
  //   const s = await ActiveScenarioModel.findOne();

  //   console.log('Created scenario: ' + s);
  // } catch (e) {
  //   console.error('Error adding scenario: ' + JSON.stringify(e));
  // }

  // const events = [
  //   new ScenarioEventModel({
  //     activeScenarioId: '5b906a2199ef162644825d70',
  //     name: 'Event',
  //     action: ActionType.AddValueToVariable,
  //     type: EventType.Activated,
  //     properties: {
  //       value: 4,
  //       destinationVariable: 'variable'
  //     }
  //   })
  // ];

  // activeScenarioManager.updateScenario('5b906a2199ef162644825d70', events);
};

initialiseApp();

export default app;
