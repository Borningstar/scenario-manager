import { VariableType } from '../types';
import { IAddValueToVariable } from '.';
import { ScenarioState } from '../models/scenarioState';

/**
 * Adds X value to variable Y in state and returns updated state
 * @param state Current scenario state
 * @param value Value to add
 * @param variable Name of variable to add value to
 */
const addValueToVariable: IAddValueToVariable = (
  state: ScenarioState,
  value: number,
  variable: string
): ScenarioState => {
  const variableToUpdate = state.variables.find(v => v.name === variable);

  if (!variableToUpdate) {
    throw new Error(
      `Unable to find variable ${variable} in state: ${JSON.stringify(state)}`
    );
  }

  if (variableToUpdate.type !== VariableType.number) {
    throw new Error(`Variable type should be number: ${variableToUpdate.type}`);
  }

  if (!variableToUpdate.value) {
    variableToUpdate.value = 0;
  }

  if (typeof variableToUpdate.value !== 'number') {
    throw new Error(
      `Variable value should be number: ${variableToUpdate.value}`
    );
  }

  variableToUpdate.value += value;

  return state;
};

export default addValueToVariable;
