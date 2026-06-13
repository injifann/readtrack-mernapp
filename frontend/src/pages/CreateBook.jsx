import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router';

export default function CreateBook() {
    const [title,setTitle]=useState("");
    const [author,setAuthor]=useState("");
    const [rating,setRating]=useState("");
    const [review,setReview]=useState("");
    const [coverImage,setCoverImage]=useState("");
    const [isSaving,setIsSaving]=useState(false);



    const handleSubmission=async(e)=>{
        e.preventDefault();

           if(!title || !author)
           {
            toast.error("Book title and Author cannot be empty");
            return
           }
           else if(title.length<3 || author.length<3)
           {
            toast.error("Please enter right information");
            return
           }

           else{
            try
            {
              setIsSaving(true);
              await axios.post("http://localhost:5000/api/books",{title,author,rating,review,coverImage});
              setTitle("");
              setAuthor("")
              setRating("")
              setCoverImage("")
              setReview("")
              toast.success("Book created successfully");

            }
            catch (error){
                console.log(error);
                toast.error("Error creating the book")

            }
            finally{
                setIsSaving(false);
            }
           }

    }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans antialiased">
      
      {/* Container Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-indigo-600">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
          Add New Book
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter the details below to expand your catalog inventory.
        </p>
      </div>

      {/* Main Form Content Card */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-gray-200 sm:rounded-xl sm:px-10">
          
          <form onSubmit={ handleSubmission } className="space-y-5">
            
            {/* Book Title Input */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-1">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id='title' 
                value={title} 
                onChange={(e)=>{setTitle(e.target.value)}} 
                placeholder='e.g. The Great Gatsby' 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-colors"
              />
            </div>

            {/* Author Input */}
            <div>
              <label htmlFor="author" className="block text-sm font-semibold text-gray-700 mb-1">
                Author Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                id='author' 
                value={author} 
                onChange={(e)=>{setAuthor(e.target.value)}}  
                placeholder='e.g. F. Scott Fitzgerald'
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-colors"
              />
            </div>

            {/* Grid for Rating and Cover Image URL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Rating Input */}
              <div>
                <label htmlFor="rating" className="block text-sm font-semibold text-gray-700 mb-1">
                  Rating (1-5)
                </label>
                <input 
                  type="text" 
                  id='rating' 
                  value={rating} 
                  onChange={(e)=>{setRating(e.target.value)}} 
                  placeholder='e.g. 4.5'
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-colors"
                />
              </div>

              {/* Cover Image URL Input */}
              <div>
                <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">
                  Cover Image URL
                </label>
                <input 
                  type="text" 
                  id='image' 
                  value={coverImage} 
                  onChange={(e)=>{setCoverImage(e.target.value)}}  
                  placeholder='https://example.com/cover.jpg'
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-colors"
                />
              </div>
            </div>

            {/* Review Input */}
            <div>
              <label htmlFor="review" className="block text-sm font-semibold text-gray-700 mb-1">
                Book Review Summary
              </label>
              <input 
                type="text" 
                id='review' 
                value={review} 
                onChange={(e)=>{setReview(e.target.value)}} 
                placeholder='Briefly summarize your thoughts...'
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-sm transition-colors"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-150 ${
                  isSaving 
                    ? 'bg-indigo-400 cursor-not-allowed' 
                    : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99]'
                }`}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Record...
                  </>
                ) : (
                  'Create Book Entry'
                )}
              </button>
            </div>
          </form>

          {/* Under-Form Auxiliary Loading State Notice */}
          {isSaving && (
            <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-indigo-600 font-medium animate-pulse">
              <span>Synchronizing inventory databases...</span>
            </div>
          )}

        </div>
        
      </div>
      <Link to={"/"}> Back to Books
      </Link>
    </div>
  )
}