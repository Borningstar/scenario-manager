import { VariableType } from '../../src/types';
import addXToYAction from '../../src/actions/addValueToVariable';
import { createActiveScenario, createVariableMock } from '../models';

describe('addValueToVariable', () => {
  const variableName = 'variable';
  const variableValue = 1;

  it('should add value to specified variable property in active scenario and return updated variable', () => {
    const valueToAdd = 1;

    const updatedVariable = createVariableMock({
      id: '2'
    });

    const existingVariable = createVariableMock({
      name: variableName,
      value: variableValue,
      update: jest.fn(() => updatedVariable)
    });

    const state = createActiveScenario({
      variables: [existingVariable]
    });

    const newState = addXToYAction(state, valueToAdd, variableName);

    expect(existingVariable.update).toBeCalledWith({
      value: variableValue + valueToAdd
    });
    expect(newState.variables[0]).toEqual(updatedVariable);
  });

  it('should throw error if variable doesnt exist in state', () => {
    const state = createActiveScenario({
      variables: []
    });

    expect(() => addXToYAction(state, 0, variableName)).toThrow(
      `Unable to find variable ${variableName} in state: ${JSON.stringify(
        state
      )}`
    );
  });

  it('should throw error if variable type isnt number', () => {
    const state = createActiveScenario({
      variables: [
        createVariableMock({
          name: variableName,
          type: VariableType.boolean,
          value: variableValue
        })
      ]
    });

    expect(() => addXToYAction(state, 0, variableName)).toThrow(
      `Variable type should be number: ${VariableType.boolean}`
    );
  });

  it('should throw error if variable value isnt number', () => {
    const variableValue = '1';

    const state = createActiveScenario({
      variables: [
        createVariableMock({
          name: variableName,
          type: VariableType.number,
          value: variableValue
        })
      ]
    });

    expect(() => addXToYAction(state, 0, variableName)).toThrow(
      `Variable value should be number: ${variableValue}`
    );
  });
});
