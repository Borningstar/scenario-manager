import { prop, Typegoose, arrayProp } from 'typegoose';
import { Team } from '../types';
import { Variable } from './variable';

export class ActiveScenario extends Typegoose {
  @prop({ index: true })
  readonly id: string;

  @prop({ required: true })
  readonly scenarioId: string;

  @prop({ default: false })
  readonly completed: boolean;

  @prop({ default: false })
  readonly paused: boolean;

  @prop({ default: false })
  readonly started: boolean;

  @prop()
  teams?: ReadonlyArray<Team>;

  @arrayProp({ items: Variable })
  variables?: ReadonlyArray<Variable>;
}

export const ActiveScenarioModel = new ActiveScenario().getModelForClass(
  ActiveScenario
);
