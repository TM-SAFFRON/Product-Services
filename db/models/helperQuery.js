const client = require('./index');

// const test = `SELECT style_id, name, original_price, sale_price, "default?",
// (SELECT jsonb_agg(photos)
//   FROM (SELECT thumbnail_url, url FROM photos WHERE style_id = s.style_id)
//  photos) AS photos,
//  (SELECT json_object_agg(
//    id,
//   (SELECT json_build_object(
//      'quantity', (SELECT quantity FROM skus WHERE skus.id = sk.id),
//      'size', (SELECT size FROM skus WHERE skus.id = sk.id))
//    )
//    )
//    FROM skus sk
//    WHERE style_id = s.style_id) AS skus

// FROM styles s
// WHERE s.product_id = 999`;

// const test = `SELECT product_id,
// (SELECT json_agg(row_to_json(results))
//   FROM (SELECT style_id, name, original_price, sale_price, "default?",
//       (SELECT jsonb_agg(photos)
//         FROM (SELECT thumbnail_url, url FROM photos WHERE style_id = s.style_id)
//         photos) AS photos,
//      (SELECT json_object_agg(
//          id,
//         (SELECT json_build_object(
//            'quantity', (SELECT quantity FROM skus qsku WHERE qsku.id = sk.id),
//            'size', (SELECT size FROM skus ssku WHERE ssku.id = sk.id))
//          )
//        )
//        FROM skus sk
//        WHERE sk.style_id = s.style_id) AS skus
//     FROM styles i WHERE i.style_id = s.style_id)
//   results) AS results
// FROM styles s
// WHERE s.product_id = 999`;

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
      .catch((err) => console.log('Error in product details', err));
  },
  getStyles: (id) => {
    const styleQuery = `SELECT product_id,
    (SELECT json_agg(row_to_json(results))
      FROM (SELECT style_id, name, original_price, sale_price, "default?",
          (SELECT jsonb_agg(photos)
            FROM (SELECT thumbnail_url, url FROM photos WHERE style_id = s.style_id)
            photos) AS photos,
         (SELECT json_object_agg(
             id,
            (SELECT json_build_object(
               'quantity', (SELECT quantity FROM skus qsku WHERE qsku.id = sk.id),
               'size', (SELECT size FROM skus ssku WHERE ssku.id = sk.id))
             )
           )
           FROM skus sk
           WHERE sk.style_id = s.style_id) AS skus
        FROM styles i WHERE i.style_id = s.style_id)
      results) AS results
    FROM styles s
    WHERE s.product_id = $1`;
    let value = [`${id}`];
    return client.query(styleQuery, value)
      .then((res) => res.rows)
      .catch((err) => console.log('Error in styles', err));
  },
  getRelated: {},
};
