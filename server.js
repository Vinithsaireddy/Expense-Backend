const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
require('dotenv').config();

port= process.env.port_point;
mongo_db = process.env.mongodb_connect;

mongoose.connect(mongo_db)
    .then(() => console.log("Connected to MONGO_DB"))
    .catch(err => console.error('DB error', err));
app.use(cors({
  origin: 'https://expense-frontend-livid.vercel.app',
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
});
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
