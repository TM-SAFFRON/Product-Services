/* eslint-disable no-console */
/* eslint-disable no-else-return */
const client = require('./index');
const q = require('./helperQuery');
const styleObject = {
  product_id: null,
  results: null,
};

module.exports = {
  products:
    client.query('select * from products limit 1 offset 600')
      .then((res) => res.rows)
      .catch((err) => console.log('Error in productsDB', err)),

  product: (id) => client
    .query(`select * from products p where p.id = ${id}`)
    .then(async (res) => {
      const features = await q.features;
      const product = res.rows.map((prod) => {
        prod.features = features;
        return prod;
      });
      return product;
    })
    .then((res) => res)
    .catch((err) => console.log('Error in productDB', err)),

  styles: (id) => client
    .query('select * from styles where product_id = 1')
    .then(async (res) => {
      const photos = await q.photos;
      const skus = await q.skus;
      const eachStyle = res.rows.map((style) => {
        style.photos = photos;
        style.skus = skus;
        return style;
      });
      console.log('style', eachStyle);
      styleObject.product_id = res.rows[0].product_id;
      styleObject.results = eachStyle;
      console.log('final', styleObject);
      return styleObject;
    })
    .catch((err) => console.log('styles error', err)),
  // client
  //   .query(`select * from styles, skus, photos where styles.product_id = ${id} AND skus.style_id = styles.id AND photos.style_id = styles.id;`)
    // q.styles
    // .then((res) => {
    //   if (res.rows.length) {
    //     return res.rows;
    //   } else {
    //     return 'No styles for this item';
    //   }
    // })
    // .catch((err) => console.log('Error in stylesDB', err)),

  related: (id) => client
    .query(`select related_id from related_products where product_id = ${id}`)
    .then((res) => {
      if (res.rows.length) {
        return res.rows.map((id) => id.related_id);
      } else {
        return 'No related products for this item';
      }
    })
    .catch((err) => console.log('Error in relatedDB', err)),
};
