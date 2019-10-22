const env = {
  database: 'test',
  username: 'postgres',
  password: 'password',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};
 
module.exports = env;