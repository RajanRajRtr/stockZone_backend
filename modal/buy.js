const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const cartSchema = new mongoose.Schema(
  {
    

    product_id:{
        type: Number,
      //   default: "0"
      },
      product_Name: {
        type: String,
       
      },
      
      product_price: {
      type: String,
     
    },
    
    phone_number: {
        type: String,
    },
    Quantity: {
        type: Number,
    },

  },
  { timestamps: true },
  { _id: false }
);


module.exports = mongoose.model('Cart', cartSchema);