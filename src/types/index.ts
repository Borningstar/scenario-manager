import { Variable } from '../models/variable';
import { ScenarioEvent } from '../models/scenarioEvent';

export type Scenario = Readonly<{
  id: string;
  name: string;
  teams: ReadonlyArray<Team>;
  variables: ReadonlyArray<Variable>;
  events: ReadonlyArray<ScenarioEvent>;
}>;

export type EventProperties = Readonly<{
  value?: number | string | boolean;
  destinationVariable?: string;
  sourceVariable?: string;
}>;

export enum EventType {
  Activated
}

export type Team = Readonly<{
  id: string;
  name: string;
  points: number;
  variables: ReadonlyArray<Variable>;
}>;

export enum VariableType {
  boolean = 'boolean',
  string = 'string',
  number = 'number'
}
