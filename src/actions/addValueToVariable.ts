import {
  IAddValueToVariableAction,
  ScenarioState,
  Variable,
  VariableType
} from '../types';

/**
 * Adds X value to variable Y in state and returns updated state
 * @param state Current scenario state
 * @param value Value to add
 * @param variable Name of variable to add value to
 */
const addValueToVariable: IAddValueToVariableAction = (
  state: ScenarioState,
  value: number,
  variable: string
) => {
  const variableToUpdate = state.variables.find(v => v.name === variable);

  if (!variableToUpdate) {
    throw new Error(
      `Unable to find variable ${variable} in state: ${JSON.stringify(state)}`
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

  const updatedVariable: Variable = {
    ...variableToUpdate,
    value: variableToUpdate.value + value
  };

  const variables = [
    ...state.variables.filter(v => v.name !== variable),
    updatedVariable
  ];

  return { ...state, variables };
};

export default addValueToVariable;
