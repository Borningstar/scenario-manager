import { prop, Typegoose } from 'typegoose';
import { VariableType } from '../types';

export class Variable extends Typegoose {
  constructor(props?: Partial<Variable>) {
    super();

    this.id = props.id;
    this.name = props.name;
    this.type = props.type;
    this.value = props.value;
  }

  public update(props: {
    name?: string;
    type?: VariableType;
    value?: boolean | string | number;
  }): Variable {
    const newName = props.name === undefined ? this.name : props.name;
    const newType = props.type === undefined ? this.type : props.type;
    const newValue = props.value === undefined ? this.value : props.value;

    return new Variable({ name: newName, type: newType, value: newValue });
  }

  @prop({ index: true })
  public readonly id: string;

  @prop({ required: true, minlength: 1 })
  public readonly name: string;

  @prop({ required: true, enum: VariableType })
  public readonly type: VariableType;

  @prop()
  public readonly value?: boolean | string | number;
}
