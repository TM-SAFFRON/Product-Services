const { Pool } = require('pg');

const client = new Pool({
  user: 'sierra',
  host: 'localhost',
  database: 'sdc',
  password: 'password',
});

client.connect((err) => {
  if (err) {
    console.log('Error connecting to jobsite db', err);
  } else {
    console.log('DB Connected!');
  }
});

module.exports = client;
