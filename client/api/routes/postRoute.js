const router = require('express').Router();
const user = require('../models/userModel');
const Post = require('../models/postModel');
const bcrypt = require('bcrypt');


//create post
router.post('/register', async (req, res) => {
    const newPost = new Post(req.body);
    try{
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    }catch(err){
        res.status(401).json(err);
    }
});

//update post
router.put('/update/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        
        if(post.username === req.body.username){
            try{
                //searching post by username
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true, select: '-password'});
                res.status(200).json(updatedPost);
            }catch(err){
                res.status(402).json(err);
            }     
        }else{
            res.status(403).json("You can update only your post");
        }
    } catch(err){
        res.status(401).json(err);
    }
});

//delete post

router.delete('/delete/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.title === req.body.title){
            const deletePost = await Post.findByIdAndDelete(req.params.id);
            res.status(200).json(deletePost);
        }else{
            res.status(403).json("You can delete only your post");
        }
    }catch(err){
        res.status(401).json(err);
    }
});

//get post
router.get('/getonepost/:id', async(req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch(err){
        res.status(401).json(err);
    }
});

//get all post

router.get('/getall', async(req, res) => {
    try{
        const allpost = await Post.find().select('-__v');
        res.status(200).json(allpost);
    } catch(err){
        res.status(401).json(err);
    }
})


module.exports = router;