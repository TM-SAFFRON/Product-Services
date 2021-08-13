const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')))
// console.log('PATH', path.join(__dirname, '../client/dist'))


//routes
app.get('/products', function(req, res) {
  res.status(200).send('ya did it')
})
app.get('/products/:product_id', function(req, res) {
  res.status(200).send('ya did it, ids')
})
app.get('/products/:product_id/styles', function(res, req) {
  res.status(200).send('ya did it, styles')
})
app.get('products/:product_id/related', function(res, req) {
  res.status(200).send('ya did it, related')
})










const PORT = 3000;
app.listen(PORT, () => console.log('Server listening on port:', PORT));