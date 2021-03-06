import { ActionType } from '../actions';

export type Scenario = Readonly<{
  id: string;
  name: string;
  teams: ReadonlyArray<Team>;
  variables: ReadonlyArray<Variable>;
  events: ReadonlyArray<ScenarioEvent>;
}>;

export type ActiveScenarioState = Readonly<{
  id: string;
  scenarioId: string;
  completed: boolean;
  paused: boolean;
  teams: ReadonlyArray<Team>;
  variables: ReadonlyArray<Variable>;
}>;

export type ScenarioEvent = Readonly<{
  id: string;
  activeScenarioId: string;
  name: string;
  action: ActionType;
  type: EventType;
  properties: EventProperties;
}>;

export type EventProperties = Readonly<{
  value?: number | string | boolean;
  destinationVariable?: string;
  sourceVariable?: string;
}>;

export enum EventType {
  activated
}

export type Team = Readonly<{
  id: string;
  name: string;
  points: number;
  variables: ReadonlyArray<Variable>;
}>;

export type Variable = Readonly<{
  id: string;
  name: string;
  type: VariableType;
  value: boolean | string | number;
}>;

export enum VariableType {
  boolean,
  string,
  number
}
