const mongoose=require('mongoose')

const userModel=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    recommendations:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
})

module.exports=mongoose.model('Users',userModel)