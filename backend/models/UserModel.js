import mongoose from 'mongoose'


const UserSchema =new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})
export default mongoose.model('User',UserSchema)
//or we can give const User = mongoose.model('User',UserSchema)