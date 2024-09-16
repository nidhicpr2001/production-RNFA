const JWT = require ('jsonwebtoken')
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
var { expressjwt: jwt } = require("express-jwt");

JWT_SECRET= "NIDHISINGH";

//middleware
exports.requireSignIn=jwt({
  secret: JWT_SECRET, algorithms: ["HS256"] 
})
// Register
exports.registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name) {
      return res.status(400).send({
        success: false,
        msg: 'Name is required',
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        msg: 'Email is required',
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        msg: 'Password is required and must be at least 6 characters long',
      });
    }

    // Existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        msg: 'User already registered with this email',
      });
    }

    // Hash password
    const hashedpassword = await hashPassword(password);




    // Save user
    const user = await new userModel({
      name,
      email,
      password: hashedpassword,
    }).save();

    return res.status(201).send({
      success: true,
      msg: 'Registration successful, please login',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: 'Error in register API',
      error,
    });
  }
};

// Login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        msg: 'Please provide email & password',
      });
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        msg: 'User not found',
      });
    }

    // Match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        msg: 'Invalid email or password',
      });
    }

//TOKEN JWT
const token = await JWT.sign({_id:user._id},JWT_SECRET,{
  expiresIn:'7d',
})


// undefined password
    user.password=undefined;
    res.status(200).send({
      success: true,
      msg: 'Login successfully',
      user,
      token
      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      msg: 'Error in login API',
      error,
    });
  }
};

//update user
exports.updateUserController =async(req,res)=>{
try {
  const {name,password,email}= req.body
   //user find
   const user=await userModel.findOne({email })
  //password validate
  if(password && password.length<6){
    return res.status(400).send({
      success:false,
      msg:'password is required and should be 6 character long'
    })
  }
 const hashedpassword= password ? await hashPassword(password):undefined
 //updated user
 const updatedUser = await userModel.findOneAndUpdate({email},
{
  name : name || user.name,
  password : hashedpassword || user.password
},{new:true}
 )
 updatedUser.password=undefined;
res.status(200).send({
  success:true,
  msg:'Profile Updated Please Login',
  updatedUser
})
} catch (error) {
  console.log(error);
  res.status(500).send({
    success:false,
    msg:'Error in User Update API',
    error
  })
  
}
}

// module.exports = { registerController, loginController };
