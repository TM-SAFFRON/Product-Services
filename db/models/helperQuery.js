const client = require('./index');

module.exports = {
  getProducts: () => {
    const pQuery = 'SELECT * FROM products LIMIT 5 OFFSET 500';
    return client.query(pQuery)
      .then((result) => result.rows)
      .catch((err) => console.log('Error in getProducts', err));
  },
  getProductDetails: (id) => {
    const pdQuery = 'SELECT * FROM products WHERE id = $1';
    let value = [`${id}`];
    return client.query(pdQuery, value)
      .then((res) => res.rows)
      .catch((err) => console.log('Error in product details', err))
  },
  getStyles: {},
  getRelated: {},
};
