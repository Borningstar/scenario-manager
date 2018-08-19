import addValueToVariable from './addValueToVariable';
import { ScenarioState } from '../models/scenarioState';

export interface IAddValueToVariable {
  (state: ScenarioState, value: number, variable: string): ScenarioState;
}

export interface IActions {
  addValueToVariable: IAddValueToVariable;
}

export enum ActionType {
  AddValueToVariable
}

const actions: IActions = {
  addValueToVariable: (state: ScenarioState, value: number, variable: string) =>
    addValueToVariable(state, value, variable)
};

export default actions;
