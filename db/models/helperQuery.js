const client = require('./index');

const test = `SELECT *,
(SELECT json_agg(row_to_json(features))
FROM (
  SELECT feature, value from features
  WHERE product_id = p.id)
features)
AS features
FROM products AS p
WHERE p.id = 6`;

module.exports = {
  getProducts: () => {
    const pQuery = 'SELECT * FROM products LIMIT 5 OFFSET 500';
    return client.query(pQuery)
      .then((result) => result.rows)
      .catch((err) => console.log('Error in getProducts', err));
  },
  getProductDetails: (id) => {
    const pdQuery = `SELECT *,
    (SELECT json_agg(row_to_json(features))
    FROM (
      SELECT feature, value from features
      WHERE product_id = p.id)
    features)
    AS features
    FROM products AS p
    WHERE p.id = $1`;

    let value = [`${id}`];
    return client.query(pdQuery, value)
      .then((res) => res.rows)
      .catch((err) => console.log('Error in product details', err))
  },
  getStyles: {},
  getRelated: {},
};
