const express = require('express');

const router = express.Router();

const user = require('../models/userModel');

const bcrypt = require('bcrypt');

const saltRounds = 10;

//update user

router.put('/update/:id', async (req, res) => {
    if(req.body.id === req.params.id){
        if(req.body.password){
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

module.exports = router;