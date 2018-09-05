import { prop, Typegoose, arrayProp } from 'typegoose';
import { Team } from '../types';
import { Variable } from './variable';

/**
 * Represents scenario state, either initial or after applying events
 */
export class ScenarioState extends Typegoose {
  _id: string;

  @prop({ required: true })
  activeScenarioId: string;

  @prop({ default: false })
  completed: boolean;

  @prop({ default: false })
  paused: boolean;

  @prop({ default: false })
  started: boolean;

  @prop()
  teams?: ReadonlyArray<Team>;

  @arrayProp({ items: Variable })
  variables?: ReadonlyArray<Variable>;
}

export const ScenarioStateModel = new ScenarioState().getModelForClass(
  ScenarioState
);
