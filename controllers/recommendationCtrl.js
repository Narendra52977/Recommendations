
const Users=require('../models/userModel')
const axios=require('axios')
const recommendationCtrl={
    get_list:async function(req,res){
        try{
           const userid=req.params.userid
           console.log(userid)
           let user=await Users.findOne({email:userid})
           
           if(!user) return res.status(400).json({msg:"User does not exist"})
           let recommendations=user.recommendations.reverse()
           res.json({recommendation_list:recommendations})   
        
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    addrecommendation:async function(req,res){
        try{
           const userid=req.params.userid
           let user=await Users.findOne({email:userid})
           if(!user) return res.status(400).json({msg:"User does not exist"}) 
           const list_of_shows=await axios.get('https://api.tvmaze.com/shows').then(result=>result.data)
          
           if(list_of_shows.length>0){
               list_of_shows.sort((curr,next)=>{
                   return next.rating.average-curr.rating.average
               })
           }
           let recommendations=user.recommendations
           if(recommendations.length===0){
             await Users.findOneAndUpdate({email:userid},{recommendations:[{...list_of_shows[0],newlyadded:true}]})
             return res.json({recommendeshow:{...list_of_shows[0],newlyadded:true}})
           }
           let show_ids=recommendations.map(show=>show.id).join(',')
           let best_recommendation=list_of_shows.find(show=>{
               if(!show_ids.includes(show.id)) return true
           })
           if(!best_recommendation) return res.status(204).json({msg:'No recommendations'})  
           best_recommendation={...best_recommendation,newlyadded:true}
           console.log(best_recommendation)
           await Users.findOneAndUpdate({email:userid},{recommendations:[...recommendations,best_recommendation]})
           
           return res.json({recommendation:best_recommendation})
    }catch(err){
        return res.status(500).json({msg:err.message})
    }
    },
    reset:async function(req,res){
       try{
           const userid=req.params.userid
           let user=await Users.findOne({email:userid})
           if(!user) return res.status(400).json({msg:"User does not exist"}) 
           await Users.findOneAndUpdate({email:userid},{recommendations:[]})
           res.json({msg:'reset recommendations successful'})           
       }catch(err){
        return res.status(500).json({msg:err.message})
       }
    }
}
module.exports=recommendationCtrl