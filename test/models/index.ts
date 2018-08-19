import { VariableType } from '../../src/types';
import { Variable } from '../../src/models/variable';
import { ActiveScenario } from '../../src/models/activeScenario';
import { ScenarioState } from '../../src/models/scenarioState';

export const createScenarioState = (props?: Partial<ScenarioState>) =>
  ({
    _id: 'scenario',
    scenarioId: 'scenario',
    completed: false,
    paused: false,
    started: false,
    teams: [],
    variables: [],
    ...props
  } as ScenarioState);

export const createVariableMock = (props?: Partial<Variable>) =>
  ({
    _id: '1',
    name: 'variable',
    type: VariableType.number,
    value: 0,
    ...props
  } as Variable);
