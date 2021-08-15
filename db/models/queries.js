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
    client.query('select * from products limit 5 offset 600')
      .then((res) => res.rows)
      .catch((err) => console.log('Error in productsDB', err)),

  product: (id) => client
    .query(`select * from products p where p.id = 9`)
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
    .query(`select distinct styles.name, styles.sale_price, styles.original_price, styles."default?", styles.product_id, styles.style_id, photos.url, photos.thumbnail_url from styles, photos where styles.product_id = 1 AND photos.style_id = styles.style_id`)
    .then((res) => {
      const photoMap = res.rows.map(async (photo) => {
        const photos = await q.photos(photo.style_id);
        return photos;
      });
      console.log('HERE', res.rows);

      // const photos = await q.photos(res.rows);
      // const skus = await q.skus;
      // const eachStyle = res.rows.map((style) => {
      //   style.photos = photos;
      //   style.skus = skus;
      //   return style;
      // });
      // styleObject.product_id = res.rows[0].product_id;
      // styleObject.results = eachStyle;
      // return styleObject;
    })
    .catch((err) => console.log('styles error', err)),

  related: (id) => client
    .query(`select related_id from related_products where product_id = 8`)
    .then((res) => {
      if (res.rows.length) {
        return res.rows.map((related) => related.related_id);
      } else {
        return 'No related products for this item';
      }
    })
    .catch((err) => console.log('Error in relatedDB', err)),
};
