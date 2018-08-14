import { ActiveScenarioState, Variable, VariableType } from '../../src/types';

export const createState = (props?: Partial<ActiveScenarioState>) => ({
  id: 'scenario',
  scenarioId: 'scenario',
  completed: false,
  paused: false,
  teams: [],
  variables: [],
  ...props
});

export const createVariable = (props?: Partial<Variable>) => ({
  id: '1',
  name: 'variable',
  type: VariableType.number,
  value: 0,
  ...props
});
