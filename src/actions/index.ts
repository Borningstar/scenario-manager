import { ActiveScenarioState } from '../types';
import addValueToVariable from './addValueToVariable';

export interface IAddValueToVariable {
  (
    state: ActiveScenarioState,
    value: number,
    variable: string
  ): ActiveScenarioState;
}

export interface IActions {
  addValueToVariable: IAddValueToVariable;
}

export enum ActionType {
  AddValueToVariable
}

const actions: IActions = {
  addValueToVariable: (
    state: ActiveScenarioState,
    value: number,
    variable: string
  ) => addValueToVariable(state, value, variable)
};

export default actions;
