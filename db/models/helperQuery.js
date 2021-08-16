const client = require('./index');

// const test = `SELECT style_id, name, original_price, sale_price, "default?",
// (SELECT jsonb_agg(photos)
//   FROM (
//     SELECT thumbnail_url, url FROM photos WHERE style_id = 6
//   )photos) AS photos,
// (SELECT jsonb_agg(skus)
//   FROM (
//     SELECT size, quantity FROM skus WHERE style_id = 6
//   ) skus) AS skus
// FROM styles
// WHERE product_id = 6;`;
const test = `SELECT style_id, name, original_price, sale_price, "default?",
(SELECT jsonb_agg(photos)
  FROM (
    SELECT thumbnail_url, url FROM photos WHERE style_id = 6
  )photos) AS photos,
  (SELECT json_object_agg(
    id, (SELECT json_build_object(
      'quantity', (SELECT quantity FROM skus WHERE skus.id = sk.id),
      'size', (SELECT size FROM skus WHERE skus.id = sk.id))
    )
  )
  FROM skus
  AS sk
  WHERE style_id = 6) AS skus
FROM styles
WHERE product_id = 6;`;

module.exports = {
  getProducts: () => {
    const pQuery = 'SELECT * FROM products LIMIT 5 OFFSET 500';
    return client.query(test)
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
  getStyles: (id) => {
    const styleQuery = ``;
    let value = [`${id}`];
  },
  getRelated: {},
};
