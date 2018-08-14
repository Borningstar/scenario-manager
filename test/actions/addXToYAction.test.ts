import { ScenarioState, VariableTypes } from '../../src/types';
import addXToYAction from '../../src/actions/addXToYAction';

const createDefaultState = (props?: Partial<ScenarioState>) => {
  const defaultProps = {
    name: 'scenario',
    teams: [],
    variables: []
  };

  return { ...defaultProps, ...props };
};

describe('.addXToYAction', () => {
  it('should add value to specified variable property in state', () => {
    const variableName = 'variable';
    const variableValue = 1;

    const state = createDefaultState({
      variables: [
        {
          name: variableName,
          type: VariableTypes.number,
          value: variableValue
        }
      ]
    });

    const valueToAdd = 1;

    const newState = addXToYAction(state, valueToAdd, variableName);

    expect(newState.variables[0].value).toEqual(variableValue + valueToAdd);
  });

  it('should throw error if variable doesnt exist in state', () => {
    const variableName = 'variable';

    const state = createDefaultState({
      variables: []
    });

    expect(() => addXToYAction(state, 0, variableName)).toThrow(
      `Unable to find variable ${variableName} in state: ${JSON.stringify(
        state
      )}`
    );
  });

  it('should throw error if variabe type isnt number', () => {
    const variableName = 'variable';
    const variableValue = 1;

    const state = createDefaultState({
      variables: [
        {
          name: variableName,
          type: VariableTypes.boolean,
          value: variableValue
        }
      ]
    });

    expect(() => addXToYAction(state, 0, variableName)).toThrow(
      `Variable type should be number: ${VariableTypes.boolean}`
    );
  });

  it('should throw error if variable value isnt number', () => {
    const variableName = 'variable';
    const variableValue = '1';

    const state = createDefaultState({
      variables: [
        {
          name: variableName,
          type: VariableTypes.number,
          value: variableValue
        }
      ]
    });

    expect(() => addXToYAction(state, 0, variableName)).toThrow(
      `Variable value should be number: ${variableValue}`
    );
  });
});
