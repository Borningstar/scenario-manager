import mongoose from 'mongoose';

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
};
