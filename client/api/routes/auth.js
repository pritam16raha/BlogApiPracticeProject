const express = require('express');

const router = express.Router();

const user = require('../models/userModel');

const bycrpt = require('bcrypt');

const saltRounds = 10;

const myPlaintextPassword = 'pritam16raha';

//register
router.post("/register", async (req, res) => {
    try{
        const salt = await bycrpt.genSalt(saltRounds);
        const hashPassword = await bycrpt.hash(req.body.password, salt);

        const newUser = new user({ //creating user
            username: req.body.username,
            email : req.body.email,
            password: hashPassword 
        });
        const User = await newUser.save(); //saving the newly created user
        res.status(200).json(User);
    } catch(err){
        res.status(500).json(err);
    }
})


//login
router.post('/login', async (req, res) => {
    try{
        const User = await user.findOne({ email: req.body.email });
        if(!User){
            res.status(400).json("User is not registered in the database");
        }

        //password validation
        const validate = await bycrpt.compare(req.body.password, User.password);
        if(!validate){
            res.status(400).json("Password is wrong");
        }

        const { password, __v, ...others } = User._doc;
        res.status(200).json(others);

    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;