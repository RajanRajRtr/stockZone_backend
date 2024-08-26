const express = require("express");
const mongoose = require("mongoose");
const Cart = require("../modal/buy");
const Product = require("../modal/product");
const Router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// const app = express();

// Serve static files from the 'uploads' directory
// Router.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadPath = 'uploads/';
//     fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the uploads directory exists
//     cb(null, uploadPath);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Append the current timestamp to the original file name
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "uploads/";
    fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the uploads directory exists
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

Router.get("/Product-list", async (req, res) => {
  try {
    const product_id = req.query.product_id;
    const Cartdetails = product_id
      ? await Product.find({ product_id: product_id })
      : await Product.find({});
    if (Cartdetails == null)
      return res.status(400).send({ message: "No cart item available" });
    else return res.send(Cartdetails);
  } catch (error) {
    return res.status(500).send({
      message: "Error while getting the admin profile.",
      error: error.message,
    });
  }
});

Router.post("/AddCart", async (req, res) => {
  try {
    const cartItems = req.body.cartList;
    const number = req.body.phone;
    const savedItems = [];
    for (const item of cartItems) {
      const { id, product_Name, price, qty } = item;
      const doc = new Cart({
        product_id: id,

        product_price: price,
        product_Name: product_Name,
        Quantity: qty,
        phone_number: number,
      });

      const savedDoc = await doc.save();
      savedItems.push(savedDoc);
    }

    return res
      .status(200)
      .send({ message: "Cart added successfully", savedItems });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to Add the Cart",
      error: error.message,
    });
  }
});

Router.get("/Cart-list", async (req, res) => {
  try {
    // const product_id = req.query.product_id;
    const Cartdetails = await Cart.find({});
    if (Cartdetails == null)
      return res.status(200).send({ message: "No cart item available" });
    else return res.send(Cartdetails);
  } catch (error) {
    return res.status(500).send({
      message: "Error while getting the cart item",
      error: error.message,
    });
  }
});

Router.delete("/delete-cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCartItem = await Cart.findByIdAndDelete(id);

    if (!deletedCartItem) {
      return res.status(404).send({ message: "Cart item not found" });
    }

    return res.status(200).send({ message: "Cart item deleted successfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to delete the cart item",
      error: error.message,
    });
  }
});

//product

// Router.post("/createproduct", async (req, res) => {
//   console.log("req.body",req.body)
//   try {
//     const { productName, imgUrl,videoUrl, price, description } = req.body;

//     const newProduct = new Product({
//       product_Name:productName,
//       imgUrl:imgUrl,
//       videoUrl:videoUrl,
//       price:price,
//       Description:description,
//     });

//     const savedProduct = await newProduct.save();
//     return res.status(200).send({ message: "Product added successfully", savedProduct });
//   } catch (error) {
//     return res.status(500).send({
//       message: "Unable to add product",
//       error: error.message,
//     });
//   }
// });

// const upload = multer({ storage: storage });

// Router.post("/createproduct", upload.single('imgUrl'), async (req, res) => {
//   console.log("req.body", req.body , req.file);
//   try {
//     const { productName, videoUrl, price, description } = req.body;
//     const imgUrl = req.file ? req.file.path : null;

//     const newProduct = new Product({
//       product_Name: productName,
//       imgUrl: imgUrl,
//       videoUrl: videoUrl,
//       price: price,
//       Description: description,
//     });

//     const savedProduct = await newProduct.save();
//     return res.status(200).send({ message: "Product added successfully", savedProduct });
//   } catch (error) {
//     return res.status(500).send({
//       message: "Unable to add product",
//       error: error.message,
//     });
//   }
// });

const upload = multer({ storage: storage });

Router.post("/createproduct", upload.single("imgUrl"), async (req, res) => {
  console.log("req.body", req.body, "req.file", req.file);
  try {
    const { productName, videoUrl, price, description, news } = req.body;
    // const imgUrl = req.file ? req.file.path : null;
    const imgUrl = req.file ? req.file.path.replace(/\\/g, "/") : null;
    const newProduct = new Product({
      product_Name: productName,
      imgUrl: imgUrl,
      videoUrl: videoUrl,
      price: price,
      Description: description,
      News: news,
    });

    const savedProduct = await newProduct.save();
    return res
      .status(200)
      .send({ message: "Product added successfully", savedProduct });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to add product",
      error: error.message,
    });
  }
});

//delete product

Router.delete("/delete-product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCartItem = await Product.findByIdAndDelete(id);

    if (!deletedCartItem) {
      return res.status(404).send({ message: "product item not found" });
    }

    return res
      .status(200)
      .send({ message: "Product item deleted successfully" });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to delete the Product item",
      error: error.message,
    });
  }
});

module.exports = Router;
