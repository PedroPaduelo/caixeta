import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
      host : 'castor.db.elephantsql.com',
      database: 'dhnncpcp',
      user:     'dhnncpcp',
      password: 'K1d7TXEm_4O6uoMUDSZJXo5T0_Nz0K1v'
  },
  useNullAsDefault: true
})

export default connection;

