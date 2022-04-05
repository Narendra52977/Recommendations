const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')
require('dotenv').config()
const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.get('/',(req,res)=>{
    res.json('hello')
})
app.use('/user',require('./routes/userRouter'))
app.use('/api',require('./routes/recommendationRouter'))
//console.log(process.env)
const URI=process.env.MONGO_DB_URL

mongoose.connect(URI,{useNewUrlParser:true},(err)=>{
    if(err) throw err;
    console.log('connected to database')
})
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}
const PORT=process.env.PORT || 5000
app.listen(PORT,function(){console.log('connected to '+PORT)})