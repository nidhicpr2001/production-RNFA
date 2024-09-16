const express = require('express');
const { requireSignIn } = require("../controllers/userController");
const { createPostController, getAllPostController,getUserPostController, deletePostController, updatePostController} = require('../controllers/postController');

// Create a router object
const router = express.Router();

// Create post route
router.post('/create-post', requireSignIn, createPostController);

//get all post
router.get('/get-all-post',getAllPostController)

//get user post
router.get('/get-user-post',requireSignIn,getUserPostController)

//delete post
router.delete('/delete-post/:id',requireSignIn,deletePostController)

//delete post
router.put('/update-post/:id',requireSignIn,updatePostController)

// Export the router
module.exports = router;
