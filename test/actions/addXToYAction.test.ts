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

describe('addXToYAction', () => {
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

    const newState = addXToYAction(state, valueToAdd, 'variable');

    expect(newState.variables[0].value).toEqual(variableValue + valueToAdd);
  });
});
