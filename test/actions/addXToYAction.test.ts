import { ScenarioState, VariableType, Variable } from '../../src/types';
import addXToYAction from '../../src/actions/addValueToVariable';

const createState = (props?: Partial<ScenarioState>) => ({
  id: 'scenario',
  teams: [],
  variables: [],
  ...props
});

const createVariable = (props?: Partial<Variable>) => ({
  id: '1',
  name: 'variable',
  type: VariableType.number,
  value: 0,
  ...props
});

describe('.addXToYAction', () => {
  const variableName = 'variable';
  const variableValue = 1;

  it('should add value to specified variable property in state', () => {
    const state = createState({
      variables: [
        createVariable({
          name: variableName,
          value: variableValue
        })
      ]
    });

    const valueToAdd = 1;

    const newState = addXToYAction(state, valueToAdd, variableName);

    expect(newState.variables[0].value).toEqual(variableValue + valueToAdd);
  });

  it('should throw error if variable doesnt exist in state', () => {
    const state = createState({
      variables: []
    });

    expect(() => addXToYAction(state, 0, variableName)).toThrow(
      `Unable to find variable ${variableName} in state: ${JSON.stringify(
        state
      )}`
    );
  });

  it('should throw error if variabe type isnt number', () => {
    const state = createState({
      variables: [
        createVariable({
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

    const state = createState({
      variables: [
        createVariable({
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
