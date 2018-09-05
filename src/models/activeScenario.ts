import { prop, Typegoose, arrayProp } from 'typegoose';

import { ScenarioState } from './scenarioState';
import { ScenarioEvent } from './scenarioEvent';

/**
 * An active scenario, made up of an initial state and an array of events
 */
export class ActiveScenario extends Typegoose {
  _id: string;

  @prop({ required: true })
  scenarioId: string;

  @prop({ required: true })
  initialState: ScenarioState;

  @arrayProp({ items: ScenarioEvent })
  events: ReadonlyArray<ScenarioEvent>;
}

export const ActiveScenarioModel = new ActiveScenario().getModelForClass(
  ActiveScenario,
  { schemaOptions: { timestamps: true } }
);
