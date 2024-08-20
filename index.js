require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const buyList = require('./routes/buy_list');

const port = process.env.PORT || 5002;
const path = require('path');
const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
mongoose.connect('mongodb://localhost:27017/stockzone', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err.message);
});

// const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', buyList)

app.listen(`${process.env.PORT}`, () => {
  console.log('started on port ' + `${process.env.PORT}`);
})