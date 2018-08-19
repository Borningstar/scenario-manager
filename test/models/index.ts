import { VariableType, EventType } from '../../src/types';
import { Variable } from '../../src/models/variable';
import { ActiveScenario } from '../../src/models/activeScenario';
import { ScenarioState } from '../../src/models/scenarioState';
import { ScenarioEvent } from '../../src/models/scenarioEvent';
import { ActionType } from '../../src/actions';
import { createProperties } from '../types';

export const createScenarioState = (props?: Partial<ScenarioState>) =>
  ({
    _id: 'scenario',
    activeScenarioId: 'scenario',
    completed: false,
    paused: false,
    started: false,
    teams: [],
    variables: [],
    ...props
  } as ScenarioState);

export const createVariable = (props?: Partial<Variable>) =>
  ({
    _id: '1',
    name: 'variable',
    type: VariableType.number,
    value: 0,
    ...props
  } as Variable);

export const createActiveScenario = (props?: Partial<ActiveScenario>) =>
  ({
    _id: '1',
    initialState: createScenarioState(),
    events: [],
    ...props
  } as ActiveScenario);

export const createEvent = (props?: Partial<ScenarioEvent>) =>
  ({
    _id: '1',
    activeScenarioId: '1',
    name: 'event',
    action: ActionType.AddValueToVariable,
    type: EventType.Activated,
    properties: createProperties(),
    createdAt: new Date('2018-08-08'),
    updatedAt: new Date('2018-08-08'),
    ...props
  } as ScenarioEvent);
