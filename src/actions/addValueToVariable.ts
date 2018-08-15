import { VariableType } from '../types';
import { IAddValueToVariable } from '.';
import { ActiveScenario } from '../models/activeScenario';
import { Variable } from '../models/variable';

/**
 * Adds X value to variable Y in state and returns updated state
 * @param activeScenario Current scenario state
 * @param value Value to add
 * @param variable Name of variable to add value to
 */
const addValueToVariable: IAddValueToVariable = (
  activeScenario: ActiveScenario,
  value: number,
  variable: string
): ActiveScenario => {
  const variableToUpdate = activeScenario.variables.find(
    v => v.name === variable
  );

  if (!variableToUpdate) {
    throw new Error(
      `Unable to find variable ${variable} in state: ${JSON.stringify(
        activeScenario
      )}`
    );
  }

  if (variableToUpdate.type !== VariableType.number) {
    throw new Error(`Variable type should be number: ${variableToUpdate.type}`);
  }

  if (typeof variableToUpdate.value !== 'number') {
    throw new Error(
      `Variable value should be number: ${variableToUpdate.value}`
    );
  }

  variableToUpdate.value += value;

  return activeScenario;
};

export default addValueToVariable;
