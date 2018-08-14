import {
  IAddXToYAction,
  ScenarioState,
  Variable,
  VariableTypes
} from '../types';

const addXToYAction: IAddXToYAction = (
  state: ScenarioState,
  x: number,
  y: string
) => {
  const variableToUpdate = state.variables.find(v => v.name === y);

  if (!variableToUpdate) {
    throw new Error(
      `Unable to find variable ${y} on state: ${JSON.stringify(state)}`
    );
  }

  if (variableToUpdate.type !== VariableTypes.number) {
    throw new Error(
      `Variable type needs to be number, variables type is: ${
        variableToUpdate.type
      }`
    );
  }

  if (typeof variableToUpdate.value !== 'number') {
    throw new Error(
      `Variable type is number but value is not: ${variableToUpdate.value}`
    );
  }

  const updatedVariable: Variable = {
    ...variableToUpdate,
    value: variableToUpdate.value + x
  };

  const variables = [
    ...state.variables.filter(v => v.name !== y),
    updatedVariable
  ];

  return { ...state, variables };
};

export default addXToYAction;
