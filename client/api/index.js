const express = require('express');
const app = express();

const dotenv = require('dotenv');

const mongoose = require('mongoose');

const authRoute = require('./routes/auth');

const userRoute = require('./routes/userRoute');

const postRoute = require('./routes/postRoute');

const catRoute = require('./routes/catagoryRoute');

const multer = require('multer');

const path = require('path');


const port = 5000;

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL).then(console.log("Connected with DATABASE")).catch((err) => console.log(err));

app.use('/images', express.static(path.join(__dirname, '/images')));

//storage for the images: to upload file here

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, "hello.jpg");
    }
});

//uploading images
const upload = multer({storage: storage});
app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
})


app.use('/api/user', userRoute); //updation route

app.use('/api/auth', authRoute);

app.use('/api/blog', postRoute);

app.use('/api', catRoute);


console.log(port);

app.listen(port, () => {
    // console.log(process.env.MONGO_URL)
    console.log("Backend is running...");
});

