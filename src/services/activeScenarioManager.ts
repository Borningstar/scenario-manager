import { IActiveScenarioManager, IEventRunner } from '.';
import { ActiveScenarioModel } from '../models/activeScenario';
import { ScenarioState } from '../models/scenarioState';
import { ScenarioEvent } from '../models/scenarioEvent';
import { ModelNotFoundError } from '../utility';

export default class ActiveScenarioManager implements IActiveScenarioManager {
  private scenarios: ReadonlyArray<ScenarioState>;
  private eventRunner: IEventRunner;

  constructor(eventRunner: IEventRunner) {
    this.eventRunner = eventRunner;
    this.scenarios = [];
  }

  private verifyModel(model: object, id: string) {
    if (!model) {
      throw new ModelNotFoundError(
        'Active Scenario not found with ID ' + id,
        id
      );
    }
  }

  public getScenario = async (id: string): Promise<ScenarioState> => {
    let scenario = this.scenarios.find(s => s.activeScenarioId === id);

    if (scenario) {
      return scenario;
    }

    const model = await ActiveScenarioModel.findById(id);

    this.verifyModel(model, id);

    scenario = this.eventRunner.processEvents(model.events, model.initialState);

    this.scenarios = [...this.scenarios, scenario];

    return scenario;
  };

  public updateScenario = async (
    id: string,
    events: ScenarioEvent[]
  ): Promise<ScenarioState> => {
    const state = await this.getScenario(id);

    const updatedState = this.eventRunner.processEvents(events, state);

    await ActiveScenarioModel.updateOne(
      { _id: id },
      { $push: { events: { $each: events } } }
    );

    this.scenarios = [...this.scenarios.filter(s => s._id), updatedState];

    return updatedState;
  };

  public getScenarioHistory = async (
    id: string
  ): Promise<ReadonlyArray<ScenarioEvent>> => {
    const model = await ActiveScenarioModel.findById(id);

    this.verifyModel(model, id);

    return model.events;
  };
}
