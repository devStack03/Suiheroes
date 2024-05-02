const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect("mongodb://162.240.228.209:27017/admin", {
            useNewUrlParser: true,
        })
        console.log("MongoDB Connected...")
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;