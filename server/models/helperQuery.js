const client = require('./index');

module.exports = {
  getProducts: () => {
    const pQuery = `SELECT * FROM products LIMIT 5 OFFSET 500`;
    return client.query(pQuery)
      .then((result) => result.rows)
      .catch((err) => console.log(err));
  },
  getProductDetails: {},
  getStyles: {},
  getRelated: {},
};
