import addValueToVariable from './addValueToVariable';
import { ActiveScenario } from '../models/activeScenario';

export interface IAddValueToVariable {
  (state: ActiveScenario, value: number, variable: string): ActiveScenario;
}

export interface IActions {
  addValueToVariable: IAddValueToVariable;
}

export enum ActionType {
  AddValueToVariable
}

const actions: IActions = {
  addValueToVariable: (
    state: ActiveScenario,
    value: number,
    variable: string
  ) => addValueToVariable(state, value, variable)
};

export default actions;
