const { Client } = require('pg');
const client = new Client({
  user: 'sierra',
  host: 'localhost',
  database: 'sdc',
  password: 'password',
  // port: 5432,
});

client.connect(err => {
  if (err) {
    console.log('Error connecting to jobsite db', err);
  } else {
    console.log('Connected to jobsite db!');
  }
});

client.query('select * from products where id = 600')
.then((res) => {
  console.log(res.rows[0])
})
.catch((err) => console.log(err))


module.exports = client;