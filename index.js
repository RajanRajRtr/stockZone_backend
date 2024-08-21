// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const buyList = require('./routes/buy_list');

// const port = process.env.PORT || 5002;
// const path = require('path');
// const app = express();

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// mongoose.connect('mongodb://localhost:27017/stockzone', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Error connecting to MongoDB', err.message);
// });

// // const app = express();
// app.use(express.json());
// app.use(cors());
// app.use('/api', buyList)

// app.listen(`${process.env.PORT}`, () => {
//   console.log('started on port ' + `${process.env.PORT}`);
// })

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const buyList = require("./routes/buy_list");
const path = require("path");

const app = express();
const port = process.env.PORT || 5002;

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Atlas connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  });

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use("/api", buyList);

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
