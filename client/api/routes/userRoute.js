const express = require('express');

const router = express.Router();

const user = require('../models/userModel');

const bcrypt = require('bcrypt');
const { default: mongoose, Schema } = require('mongoose');

const saltRounds = 10;

//update user

router.put('/update/:id', async (req, res) => {
    if(req.body.id === req.params.id){
        if(req.body.password){ //updating password
            const salt = await bcrypt.genSalt(saltRounds);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try{
            const updateUser = await user.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, select: '-password -__v'});
            res.status(200).json(updateUser);
        } catch(err){
            res.status(500).json(err);
        }

    }else{
        res.status(401).json("You can update only your details!");
    }
});



//delete user

router.delete('/delete/:id', async (req, res) => {
    const User = await user.findOne({ email: req.body.email })
    if(req.body.id === req.params.id){
            const validate = await bcrypt.compare( req.body.password, User.password );
            if(!validate){
                res.status(400).json("Password is wrong");
            }else{
                try{
                const deleteUser = await user.findByIdAndDelete(req.params.id);
                res.status(200).json(deleteUser);
            } catch(err){
                res.status(500).json(err);
                }
            }  
    } else{
        res.status(401).json("You can delete only your account!");
    }
});

//get user
router.get('/view/:id', async (req, res) => {
    try{
        const User = await user.findById(req.params.id).select("-password -__v");
        res.status(200).json(User);
    }catch(err){
        res.status(401).json(err);
    }
});

//get all user
router.get('/data/all', async (req, res) => {
    
        try{
            const myData = await user.find();
            res.status(200).json(myData);
        } catch(err){
            res.status(401).json(err);
        }
    }
)


module.exports = router;