import mongoose from 'mongoose';

type DatabaseProps = Readonly<{
  server: string;
  database: string;
}>;

export const connectToDatabase = async (props?: Partial<DatabaseProps>) => {
  const databaseSettings: DatabaseProps = {
    server: '127.0.0.1:27017',
    database: 'scenario-manager',
    ...props
  };

  try {
    const db = `mongodb://${databaseSettings.server}/${
      databaseSettings.database
    }`;
    await mongoose.connect(
      db,
      { useNewUrlParser: true }
    );
    console.log('Connected to database: ' + db);
  } catch (e) {
    console.error('Unable to connect to database: ' + JSON.stringify(e));
  }
};
