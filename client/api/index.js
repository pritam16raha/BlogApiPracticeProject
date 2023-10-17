const express = require('express');
const app = express();

const dotenv = require('dotenv');

const mongoose = require('mongoose');

const authRoute = require('./routes/auth');

const userRoute = require('./routes/userRoute');

const postRoute = require('./routes/postRoute');

const catRoute = require('./routes/catagoryRoute');


const port = 5000;

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(console.log("Connected with DATABASE")).catch((err) => console.log(err));

app.use('/api/user', userRoute); //updation route

app.use('/api/auth', authRoute);

app.use('/api/blog', postRoute);

app.use('/api', catRoute);


console.log(port);

app.listen(port, () => {
    // console.log(process.env.MONGO_URL)
    console.log("Backend is running...");
});

