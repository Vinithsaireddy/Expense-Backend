const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();
const port = 5000;

mongoose.connect("mongodb+srv://gvinith2005:cihXKejEeEsCoTgN@expense-tracker.ee3if.mongodb.net/")
    .then(() => console.log("Connected to MONGO_DB"))
    .catch(err => console.error('DB error', err));


app.use(cors({
  origin: 'https://zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3--5173--55edb8f4.local-credentialless.webcontainer-api.io' || "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
});

// Import routes
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
