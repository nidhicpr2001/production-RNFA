const express = require ('express');
const {registerController,loginController, updateUserController, requireSignIn} = require('../controllers/userController');
//router obj
const router = express.Router();


///routers
//Register || POST


router.post('/register',registerController);

//LOGIN || POST
router.post('/login',loginController)

//UPDATE ||PUT
router.put('/update-user',requireSignIn,updateUserController)
//export
module.exports = router;