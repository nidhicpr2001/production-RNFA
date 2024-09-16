const mongoose = require('mongoose');
const colors = require('colors');
MONGO_URL = "mongodb://127.0.0.1:27017/react-native"
const connectDB = async () =>{
    try{
       await mongoose.connect(MONGO_URL)
       console.log(`Connected to DB`);
       
    }
    catch(error) {
    console.log(`error in connecting db: ${error}`.bgCyan.white)

    
    }
} 

module.exports = connectDB