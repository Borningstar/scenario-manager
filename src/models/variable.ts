import { prop, Typegoose } from 'typegoose';
import { VariableType } from '../types';

export class Variable extends Typegoose {
  @prop({ index: true })
  id?: string;

  @prop({ required: true, minlength: 1 })
  name: string;

  @prop({ required: true, enum: VariableType })
  type: VariableType;

  @prop()
  value?: boolean | string | number;
}
