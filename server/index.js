/* eslint-disable no-console */
const express = require('express');
const path = require('path');
// const db = require('./controllers/index');
const model = require('../db/models/helperQuery');

const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

// routes
app.get('/products', (req, res) => {
  model.getProducts()
    .then((product) => res.status(200).send(product))
    .catch((err) => console.log('FAILED', err));
});

app.get('/products/:product_id', (req, res) => {
  model.getProductDetails(req.params.product_id)
    .then((product) => res.status(200).send(product))
    .catch((err) => res.status(500).send(err));
});

// app.get('/products/:product_id/styles', (req, res) => {
//   model.styles(req.params.product_id)
//     .then((style) => res.status(200).send(style))
//     .catch((err) => res.status(400).send(err));
// });

// app.get('/products/:product_id/related', (req, res) => {
//   model.related(req.params.product_id)
//     .then((related) => res.status(200).send(related))
//     .catch((err) => res.status(500).send(err));
// });

const PORT = 5000;
app.listen(PORT, () => console.log('Server listening on port:', PORT));

module.exports = app;
