import { prop, Typegoose } from 'typegoose';
import { VariableType } from '../types';

export class Variable extends Typegoose {
  _id: string;

  @prop({ required: true, minlength: 1 })
  public name: string;

  @prop({ required: true, enum: VariableType })
  public type: VariableType;

  @prop()
  public value: boolean | string | number;
}

export const VariableModel = new Variable().getModelForClass(Variable);
