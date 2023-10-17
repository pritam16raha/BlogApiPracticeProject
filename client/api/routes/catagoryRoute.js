const router = require('express').Router();
const Catagory = require('../models/catagoryModel');

router.post('/catagory', async (req, res) => {
    const newCat = new Catagory(req.body);
    try{
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    }catch(err){
        res.status(401).json(err);
    }
});

module.exports = router;