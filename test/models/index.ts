import { VariableType } from '../../src/types';
import { Variable } from '../../src/models/variable';
import { ActiveScenario } from '../../src/models/activeScenario';

export const createActiveScenario = (props?: Partial<ActiveScenario>) =>
  ({
    id: 'scenario',
    scenarioId: 'scenario',
    completed: false,
    paused: false,
    started: false,
    teams: [],
    variables: [],
    ...props
  } as ActiveScenario);

export const createVariable = (props?: Partial<Variable>) =>
  ({
    id: '1',
    name: 'variable',
    type: VariableType.number,
    value: 0,
    ...props
  } as Variable);
