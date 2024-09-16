const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Please add name'],
        trim:true
    },
    email:{
        type:String,
        require:[true,'Please add email'],
        trim:true
    },
    password:{
        type:String,
        require:[true,'Please add password'],
        min:6,
        max:64
    },
    role:{
        type:String,
        default:'user'
    }

},
{timestamps:true}
)

module.exports = mongoose.model("User",userSchema);