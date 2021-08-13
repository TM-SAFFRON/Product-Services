const client = require('./index');




module.exports = {
  photos: client
    .query('select thumbnail_url, url from photos ph where ph.style_id = 1')
    .then((res) => res.rows)
    .catch((err) => console.log('Error in photosDB', err)),

  skus: client
    .query('select id, quantity, size from skus sk where sk.style_id = 1')
    .then((res) => {
      const skuObject = {};
      for (let i = 0; i < res.rows.length; i++) {
        const row = res.rows[i];
        const innerObj = {};
        innerObj.quantity = row.quantity;
        innerObj.size = row.size;
        skuObject[row.id] = innerObj;
      }
      return skuObject;
    })
    .then((res) => res)
    .catch((err) => console.log('sku error', err)),

  features: client
    .query('select feature, value from features where product_id = 1')
    .then((res) => res.rows)
    .catch((err) => console.log('feature error', err)),
  // styles:
};

// const stylesHepler = client
// .query('select * from styles where product_id = 1')
// .then(async (res) => {
//   const eachStyle = await res.rows.map((style) => {
//     style.photos = q.photos;
//     style.skus = q.skus;
//     return style;
//   });
//   console.log('style', eachStyle)
//   styleObject.product_id = res.rows[0].product_id;
//   styleObject.results.push(eachStyle);
//   console.log('final', styleObject)
//   return styleObject;
// })
// .catch((err) => console.log('styles error', err)),

// module.exports = stylesHepler;
