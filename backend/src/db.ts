import { Sequelize } from 'sequelize';
import retry from 'async-retry';

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://user:password@db:5432/database';

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

export async function connectWithRetry() {
  await retry(async () => {
    await sequelize.authenticate();
    console.log('Database connection established');
  }, {
    retries: 5,
    factor: 2,
    minTimeout: 1000,
    maxTimeout: 30000,
  });

  return sequelize;
}

export { sequelize };
