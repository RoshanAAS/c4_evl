

 const express=require("express")

 const bcrypt=require("bcrypt")

 const jwt=require("jsonwebtoken")

 const userRouter=express.Router()
 const {UserModel}=require("../model/user.model")


 userRouter.post("/register",(req,res)=>{
      
    const {name,email,gender,password,age,city,is_married}=req.body

       try {

        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                res.status(200).json({msg:err.message})
             }else{
  
                const newuser= new UserModel({name,email,gender,password:hash,age,city,is_married})
               await newuser.save()
            }

            res.status(200).json({msg:"User has been registered"})
        })
        
       } catch (error) {
          res.status.json({msg:error.message})
       }

 })


 userRouter.post("/login",async(req,res)=>{
      
    const {email,password}=req.body

       try {

          const user = await UserModel.findOne({email})

           if(user){
              
              bcrypt.compare(password,user.password,(err,result)=>{
                 
                 if(result){
                    const token=jwt.sign({userID:user._id},"roshan")

                    res.status(200).json({msg:"Your are logged in ...",token})
                 }else{
                    res.status(200).json({msg:"wrong email or pasword"})
                 }

              })


           }else{
              res.status(400).json({msg:"user dose not exist"})
           }
          
       
        
       } catch (error) {
          res.status.json({msg:error.message})
       }

 })





   
   




 module.exports={userRouter}

