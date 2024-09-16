//create post
exports.createPostController = async(req,res)=>{
const postModel = require('../models/postModel')
    try{
const {title ,description}=req.body
//validate
if(!title || !description){
    return res.status(500).send({
        success:false,
        msg:'Please Provide all Field'
    })
}
const post = await postModel({
    title,
    description,
    postedBy: req.auth._id
})
res.status(201).send({
    success:true,
    msg:"Post created Successfully",
    post
})
console.log(req);

    }
    catch(error)
    {
console.log(error);
res.status(500).send({
    success:false,
    msg:"Error in create post API",
    error
})
    }

}
// module.exports = { createPostController }