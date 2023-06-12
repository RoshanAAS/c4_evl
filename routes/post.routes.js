

 const express=require("express")

 const {PostModel}=require("../model/post.model")

  const {authenticate}=require("../middleware/auth")
 const postsRouter=express.Router()
  
 postsRouter.use(authenticate)


   postsRouter.post("/add",async(req,res)=>{
       
        try {
            const newpost= new PostModel(req.body)
            await newpost.save()

            res.status(200).json({msg:"post Successfully"})
        } catch (error) {
            res.status(400).json({msg:error.message})
        }
   })


   postsRouter.get("/",async(req,res)=>{
       
    try {
        const post= await  PostModel.find({userID:req.body.userID})
        

        res.status(200).json(post)
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})



   postsRouter.post("/update:id",async(req,res)=>{
        const {id}=req.params

        const userIDfrommddil=req.body.userID
    try {
        
        const update= await PostModel.findOne({_id:id})

        const useridinDoc=update.userID

        if(userIDfrommddil===useridinDoc){
            await PostModel.findByIdAndUpdate({_id:id},req.body)
        }
        
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})


postsRouter.post("/delete:id",async(req,res)=>{
    const {id}=req.params

    const userIDfrommddil=req.body.userID
try {
    
    const update= await PostModel.findOne({_id:id})

    const useridinDoc=update.userID

    if(userIDfrommddil===useridinDoc){
        await PostModel.findOneAndDelete({_id:id})
    }
    
} catch (error) {
    res.status(400).json({msg:error.message})
}
})








   



 module.exports={postsRouter}