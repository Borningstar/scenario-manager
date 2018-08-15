import mongoose from 'mongoose';
import { ActiveScenarioModel } from '../models/activeScenario';
import { VariableType } from '../types';

const server = '127.0.0.1:27017';
const database = 'scenario-manager';

export const connectToDatabase = async () => {
  try {
    const db = `mongodb://${server}/${database}`;
    await mongoose.connect(
      db,
      { useNewUrlParser: true }
    );
    console.log('Connected to database: ' + db);
  } catch (e) {
    console.error('Unable to connect to database: ' + JSON.stringify(e));
  }

  // Way to quickly add scenarios until adding functionality complete
  // const scenario = new ActiveScenarioModel({
  //   scenarioId: '1',
  //   variables: [
  //     {
  //       name: 'variable',
  //       type: VariableType.number
  //     }
  //   ]
  // });

  // try {
  //   console.log('New scenario: ' + scenario);

  //   await scenario.save();
  //   const s = await ActiveScenarioModel.findOne();

  //   console.log('Created scenario: ' + s);
  // } catch (e) {
  //   console.error('Error adding scenario: ' + JSON.stringify(e));
  // }
};
