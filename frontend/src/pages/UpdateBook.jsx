import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';


export default function UpdateBook() {

    const {id}=useParams();
    const navigate=useNavigate();

    const[newtitle,setTitle]=useState("");
    const[newauthor,setAuthor]=useState("");
    const [newrating,setRating]=useState("");
    const [newreview,setReview]=useState("");
    const [newcoverImage,setCoverImage]=useState("");
    const [isUpdating,setIsUpdating]=useState(false)
    const [isLoading,setIsLoading]=useState(true);
    const[originalBook,setOriginalBook]=useState(null);

    useEffect(()=>{
        const fetchBooks=async()=>{
            try{
                const res= await axios.get(`http://localhost:5000/api/books/${id}`);
                const bookData=res.data;
                setOriginalBook(bookData);

                setTitle(bookData.title||"");
                setAuthor(bookData.author||"");
                setRating(bookData.rating||"");
                setReview(bookData.review||"");
                setCoverImage(bookData.coverImage||"");
            }
            catch(error)
            {
                if(error.response?.status===404){
                toast.error("Book not found");}
                else if(error.response?.status===500)
                {
                    toast.error("Internal server error");
                }
                else {
                    toast.error(`Error Loading book data`)
                }
            }
            finally{
                setIsLoading(false);
            }
        }
    fetchBooks()},[id])


    const handleUpdate=async(e)=>{
        
        e.preventDefault();
        if(newtitle===originalBook?.title && newauthor===originalBook?.author  && newreview === originalBook?.review && newrating === originalBook?.rating && newcoverImage === originalBook?.coverImage)
        {
           toast.error("You changed Nothing , please make change to update");
           return;
        }
        else {
            try{
                    setIsUpdating(true);
                    await axios.put(`http://localhost:5000/api/books/${id}`,{newtitle,newauthor,newrating:Number(newrating),newreview,newcoverImage})
                    toast.success("book Updated successfully");
                    navigate("/");
                    
            }
            catch(error)
            {
                if(error.response?.status===500)
                {toast.error("Internal Server Error")}

              else if (error.request){
                toast.error("Network error");

                }
                else if(error.response?.status===404)
                {
                    toast.error("Book not found");
                }
                else{
                    toast.error("Something went wrong");
                }
            }
            finally{
                  setIsUpdating(false);
            }
        }

    }
       if(isLoading)
    {
        return <div className='text-center mt-10'>Loading your book</div>
    }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Update Book Details</h2>
        
        <form onSubmit={handleUpdate} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                <input 
                    type="text" 
                    id='title' 
                    name='title' 
                    value={newtitle}  
                    onChange={(e)=>setTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
            </div>

            <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input 
                    type="text" 
                    id='author' 
                    name='author' 
                    value={newauthor}  
                    onChange={(e)=>setAuthor(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
            </div>

            <div>
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                <input 
                    type="number" 
                    id='rating' 
                    name='rating' 
                    value={newrating} 
                    onChange={(e)=>setRating(e.target.value)} 
                    min="1"
                    max="5"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
            </div>

            <div>
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                <input 
                    type="text"  
                    id='review' 
                    name='review' 
                    value={newreview} 
                    onChange={(e)=>setReview(e.target.value)} 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
            </div>

            <div>
                <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                <input 
                    type="text"  
                    id='coverImage' 
                    name='coverImage' 
                    value={newcoverImage} 
                    onChange={(e)=>setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                />
            </div>

            <div className="pt-2">
                <input 
                    type="submit" 
                    name="submit" 
                    id="submit" 
                    value={isUpdating ? "updating..." : "update"} 
                    disabled={isUpdating}
                    className={`w-full py-2 px-4 rounded-md font-medium text-white shadow-sm transition duration-150 cursor-pointer text-center
                        ${isUpdating 
                            ? "bg-blue-400 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                        }`}
                />
            </div>
        </form>
    </div>
  )
}