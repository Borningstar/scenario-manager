import { prop, Typegoose } from 'typegoose';
import { ActionType } from '../actions';
import { EventType, EventProperties } from '../types';

/**
 * An event that's applied to a scenario
 */
export class ScenarioEvent extends Typegoose {
  _id: string;

  @prop({ required: true })
  activeScenarioId: string;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  action: ActionType;

  @prop({ required: true })
  type: EventType;

  @prop()
  properties: EventProperties;

  @prop({ required: true })
  createdAt: Date;

  @prop({ required: true })
  updatedAt: Date;
}

export const ScenarioEventModel = new ScenarioEvent().getModelForClass(
  ScenarioEvent,
  { schemaOptions: { timestamps: true } }
);
