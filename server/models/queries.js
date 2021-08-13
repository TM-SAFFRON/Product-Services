const client = require('./index.js');

module.exports = {
  products:
    client.query(`select * from products limit 5 offset 600`)
      .then(res => res.rows )
      .catch((err) => console.log('Error in productsDB', err)),

  product: (id = 999) => {
    return client
      .query(`select * from products where id = ${id}`)
      .then(res => res.rows )
      .catch((err) => console.log('Error in productDB', err))
  },

  styles: (id) => {
    return client
      .query(`select * from styles where product_id = ${id}`)
      .then((res) =>  {
        if (res.rows.length) {
          return res.rows;
        } else {
          return 'No styles for this item';
        }
      })
      .catch((err) => console.log('Error in stylesDB', err.stack))
  },

  related: (id) => {
    return client
      .query(`select related_id from related_products where product_id = ${id}`)
      .then((res) =>  {
        if (res.rows.length) {
          return res.rows;
        } else {
          return 'No related products for this item';
        }
      })
      .catch(err => console.log('Error in relatedDB', err))
  }

}
