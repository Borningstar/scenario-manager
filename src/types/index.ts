export type ScenarioState = Readonly<{
  name: string;
  teams: ReadonlyArray<Team>;
  variables: ReadonlyArray<Variable>;
}>;

export type Team = Readonly<{
  name: string;
  points: number;
}>;

export type Variable = Readonly<{
  name: string;
  type: VariableTypes;
  value: boolean | string | number;
}>;

export enum VariableTypes {
  boolean,
  string,
  number
}

export interface IAddXToYAction {
  (state: ScenarioState, x: number, y: string): ScenarioState;
}
