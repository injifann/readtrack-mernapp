import mongoose from "mongoose";

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    author :{
        type:String,
        required:true,
        trim:true,
        
    },
    status:{
        type:String,
        required:true,
        enum:['Reading', 'Completed', 'Plan to Read'],
        default:"Plan to Read"
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        default:0,
    },
    review:{
        type:String,
        trim:true
    },
coverImage:{
    type:String,
    default: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60" // Clean fallback book image
}
},{timestamps:true})

const Book = mongoose.model("Book",bookSchema);

export default Book;