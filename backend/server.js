const exp=require('express')
const app=exp();
const cors=require('cors')
const imageModel=require('./modelimage')
app.use(cors())
app.use(exp.json())
require('dotenv').config()
const port=process.env.PORT || 4000
const multer=require('multer')
const storage=multer.diskStorage({
  destination:function (req,file,cb){
    cb(null,'uploads')
  },
  filename:function (req,file,cb){
    cb(null,file.originalname)
  }
})
app.use(exp.static('uploads'))
const upload=multer({storage})
const mongoose=require('mongoose')
mongoose.connect(process.env.DBURL)
.then(()=>{
  app.listen(port,()=>{
    console.log(`server on ${port}`)
    console.log('db connection ')
  })
  
})
.catch((err)=>{
  console.log(err)
})
app.post('/upload',upload.single('file'),async(req,res)=>{
   const u=req.file.filename
   const n=new imageModel({image:u});
   await n.save()
   res.json({status:"ok"})
})
app.get('/uploads',async(req,res)=>{
  let r= await imageModel.find()
  res.json({message:"ok",payload:r})

})

app.use('imageModel',imageModel)