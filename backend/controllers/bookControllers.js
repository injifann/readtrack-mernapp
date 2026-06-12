import mongoose from "mongoose";
import Book from "../models/book.js";

export const getAllBook=async(req,res)=>{
    try{
        const books = await Book.find().sort({createdAt:-1});
         res.status(200).json(books);
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }

}

export const createBook=async(req,res)=>{
    const {title,author,rating,review}=req.body;
           if(!title || !author)
        {
            return res.status(400).json({message:"please fill all fields"})
        }

    try{
        const book = await Book.create({title,author,rating,review});
        res.status(200).json({message:"book successfuly created"});

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({})


    }
}

export const updateBook=async(req,res)=>{

         
    try{
       const updatedBook= await Book.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
       if(!updatedBook)
       {
        return res.status(400).json({message:"Book not found"});
       }
        

    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Internal server Error"});
    }

}

export const deleteBook =async(req,res)=>{

    try{
      const deletedBook=  await Book.findByIdAndDelete(req.params.id);
      if(!deletedBook)
      {
        return res.status(400).json()
      }
        res.status(200).json({message:"the book successfully deleted"});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Internal server Error"});
    }

}