const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const productSchema = new mongoose.Schema(
  {
    

    // product_id:{
    //   type: Number,
    //   unique: true 
    //   //   default: "0"
    //   },
      product_Name: {
        type: String,
        required: true,
    },
    
    Description: {
        type: String,
        required: true,
    },
    News: {
      type: String,
      required: true,
  },
   
    imgUrl: {
      type: String,
      // required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    }
  
   
    
  },
  { timestamps: true },
  { _id: false }
);
productSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('Product', productSchema);