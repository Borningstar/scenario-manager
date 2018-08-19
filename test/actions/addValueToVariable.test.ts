import { VariableType } from '../../src/types';
import addXToYAction from '../../src/actions/addValueToVariable';
import { createVariableMock, createScenarioState } from '../models';

describe('addValueToVariable', () => {
  const variableName = 'variable';
  const variableValue = 1;

  it('should add value to specified variable property in active scenario and return updated variable', () => {
    const valueToAdd = 1;

    const existingVariable = createVariableMock({
      name: variableName,
      value: variableValue
    });

    const state = createScenarioState({
      variables: [existingVariable]
    });

    const updatedScenario = addXToYAction(state, valueToAdd, variableName);

    const expectedUpdatedScenario = state;
    expectedUpdatedScenario.variables[0].value = variableValue + valueToAdd;

    expect(updatedScenario).toEqual(expectedUpdatedScenario);
  });

  it('should throw error if variable doesnt exist in state', () => {
    const state = createScenarioState({
      variables: []
    });

    expect(() => addXToYAction(state, 0, variableName)).toThrow(
      `Unable to find variable ${variableName} in state: ${JSON.stringify(
        state
      )}`
    );
  });

  it('should throw error if variable type isnt number', () => {
    const state = createScenarioState({
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

    const state = createScenarioState({
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
