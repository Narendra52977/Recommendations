const Users=require('../models/userModel')

const userCtrl={
    register:async function(req,res){
        try{
            console.log(req.body)
        const {email,name}=req.body
        const user=await Users.findOne({email})
        if(user) return res.status(400).json({msg:'User with this Email Already Exist'})
        const newuser=new Users({
            email,name
        })
        await newuser.save()
       
        res.json({msg:'user register successful'})
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
    },
    
}
module.exports=userCtrl