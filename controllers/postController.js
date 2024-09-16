// const postModel = require('../models/postModel');

const postModel = require('../models/postModel');

// create post
exports.createPostController = async (req, res) => {
    const postModel = require('../models/postModel');
    
    try {
        const { title, description } = req.body;

        // Validate
        if (!title || !description) {
            return res.status(400).send({
                success: false,
                msg: 'Please provide all fields'
            });
        }

        // Create post
        const post = await postModel.create({
            title,
            description,
            postedBy: req.auth._id
        });

        res.status(201).send({
            success: true,
            msg: 'Post created successfully',
            post
        });
        console.log(console);
        
        
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            msg: 'Error in create post API',
            error
        });
    }
};

exports.getAllPostController = async (req, res) => {
  try {
    const posts = await postModel.find()
      .populate('postedBy', '_id name') // Populate 'postedBy' with '_id' and 'name'
      .sort({ createdAt: -1 }); // Sort by creation date in descending order
    
    res.status(200).send({
      success: true,
      msg: "All Post data fetched successfully",
      posts
    });
  } 
  catch (error) {
    console.error('Error fetching posts:', error.message); // More informative logging
    res.status(500).send({
      success: false,
      msg: "Error in GetAllPosts API",
      error: error.message // Sending only error message instead of full error object
    });
  }
};


//get user post
exports.getUserPostController=async(req,res)=>{
    try {
       const userPosts = await postModel.find({postedBy:req.auth._id}) 
        res.status(200).send({
            success:true,
            msg:'user posts',
            userPosts
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            msg:"Error in User Post API",
            error
        })
        
    }
}

//delete post
exports.deletePostController=async(req,res)=>{
    try {
        const {id}=req.params
        await postModel.findByIdAndDelete({_id:id}) 
        res.status(200).send({
            success:true,
            msg:'Your post has been deleted',
            
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            msg:"Error in Delete Post API",
            error
        })
        
    }
}

//update post
exports.updatePostController=async(req,res)=>{
    try {
        const {title,description}=req.body;
        //post find
        await postModel.findById({_id:req.params.id});
        if (!title || !description){
            return res.status(500).send({
                success:false,
                msg:'Please Provide post title or description',
                
            })
        }
      const updatedPost=  await postModel.findByIdAndUpdate({_id:req.params.id},{
         title:title ||post?.title,
         description:description || description?.description
      },{new:true});
      res.status(200).send({
        success:true,
        msg:'Post Updated Successfully',
        updatedPost
      })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            msg:"Error in Update Post API",
            error
        })
        
    }
}