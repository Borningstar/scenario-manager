import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import { indexRouter } from './routes';
import { connectToDatabase } from './services/database';
import { createActiveScenarioManager } from './services/activeScenarioManager';
import { createEventRunner } from './services/eventRunner';
import actions, { ActionType } from './actions';
import { ScenarioEvent, EventType } from './types';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

connectToDatabase();

const activeScenarioManager = createActiveScenarioManager();
const eventRunner = createEventRunner(actions);

const event: ScenarioEvent = {
  id: '1',
  activeScenarioId: '5b73a9f6ede86a23a815c980',
  name: 'Event',
  action: ActionType.AddValueToVariable,
  type: EventType.Activated,
  properties: {
    value: 4,
    destinationVariable: 'variable'
  }
};

export default app;
