const express = require('express');
const app = express();

const dotenv = require('dotenv');

const mongoose = require('mongoose');

const authRoute = require('./routes/auth');

const userRoute = require('./routes/userRoute')


const port = process.env.MONGO_URL2 || process.env.MONGO_URL2 || 5000;

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(console.log("Connected with DATABASE")).catch((err) => console.log(err));

app.use('/api/auth', authRoute);

app.use('/api/user', userRoute);

app.listen(port, () => {
    // console.log(process.env.MONGO_URL)
    console.log("Backend is running...");
});

