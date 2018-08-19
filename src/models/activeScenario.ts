import { prop, Typegoose, arrayProp } from 'typegoose';

import { ScenarioState } from './scenarioState';
import { ScenarioEvent } from './scenarioEvent';

export class ActiveScenario extends Typegoose {
  _id: string;

  @prop({ required: true })
  initialState: ScenarioState;

  @arrayProp({ items: ScenarioEvent })
  events: ReadonlyArray<ScenarioEvent>;
}

export const ActiveScenarioModel = new ActiveScenario().getModelForClass(
  ActiveScenario,
  { schemaOptions: { timestamps: true } }
);
