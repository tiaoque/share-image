const env = {
  database: 'test',
  username: 'postgres',
  password: 'password',
  // host: 'localhost',
  host: '172.17.0.2',
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