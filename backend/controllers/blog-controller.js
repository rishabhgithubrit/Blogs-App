import Blog from "../model/Blog.js";
import mongoose from "mongoose";
import User from "../model/user.js";
// import user from "../model/user.js";

export const getAllBlogs = async(req,res,next)=>{
    let blogs
    try{
     blogs = await Blog.find().populate("user")
    }catch(err){
       return console.log(err)
    }
    if(!blogs){
        return res.status(404).json({message:"No Blogs Found"})
    }
    return res.status(200).json({blogs})
}
export const addBlog = async (req,res,next) =>{
    const {title,description,image,user} = req.body
    let existingUser
    try {
       existingUser = await User.findById(user) 
    } catch (err) {
        return console.log(err)
    }
    if(!existingUser){
        return res.status(400).json({message:"unable to find by user this id"})
    }

    const blog  = new Blog({
        title,description,image,user,
    })
    try{
       const session = await mongoose.startSession()
       session.startTransaction()
       await blog.save({session})
       existingUser.blogs.push(blog)
       await existingUser.save({session})
       await session.commitTransaction()
    }catch(err){
     console.log(err)
     return res.status(500).json({message:err})
    }
    return res.status(200).json({blog})
}
export  const updateBlog = async(req,res,next)=>{
    const {title,description} = req.body
    const blogId = req.params.id
 
    let blog
    try{
        blog  = await Blog.findByIdAndUpdate(blogId,{
            title,
            description,
         })
      
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(500).json({message:"Unable to update"})
    }
    res.status(200).json({blog})
}
export const getById = async(req,res,next)=>{
    const id = req.params.id;
    let blog
    try{
         blog = await Blog.findById(id)
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(404).json({message:"No Blog Found"})
    }
    return res.status(200).json({blog})
}
export const deleteBlog = async(req,res,next)=>{
    const id = req.params.id
    let blog 
    try{
     blog = await Blog.findByIdAndRemove(id).populate('user')
     await blog.user.blogs.pull(blog)
     await blog.user.save()
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(400).json({message:"unable to delete"})
    }
    return res.status(200).json({message:"Delete successfully"})
}






export const getByUserId = async (req,res,next)=>{
     const userId  = req.params.id
     console.log(userId)
    //  let userBlogs
     try{
        let userBlogs = await User.findById(userId).populate("Blog")
        if(!userBlogs){
           return res.status(400).json({message:"No Blog Found"})
        }
        console.log(userBlogs)
   
        return res.status(200).json({user:userBlogs})
     }catch(err){
        console.log("lorem ipsum")
     }

}