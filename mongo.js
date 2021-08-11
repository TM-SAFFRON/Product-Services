
const schema = {
  id: Number,
  name: String,
  slogan: String,
  description: String,
  category: String,
  default_price: Number,
  features: [
    {
      name: String,
      characteristic: String
    }
  ],
  related: [],
  styles: {
    id: Number,
    name: String,
    original_price: Number,
    sale_price: Number,
    default: Boolean,
    photos: {
      thumbnail: String,
      main: String,
    },
    skus: {
      id: Number,
      quantity: Number,
      size: String
    }
  }
};

