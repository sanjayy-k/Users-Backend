const mongoose=require('mongoose')
mongoose.set('strictQuery', false);
const UserLogin=new mongoose.Schema({
    emailId:{
        type:String
    },
    password:{
        type:String
    }
},{versionKey:false})
//create a model

const Login=mongoose.model('userdetails',UserLogin)
module.exports={Login}
