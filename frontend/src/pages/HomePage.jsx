import React from 'react'
import { useState,useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import toast from 'react-hot-toast';
import MessageCard from '../components/MessageCard';

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error,setError]=useState("");
  const[deletingId,setdeleting]=useState(null);
  
  const handleDeletion=async(id)=>
  {

    try {
        setdeleting(id);
        await axios.delete(`http://localhost:5000/api/books/${id}`)
        setBooks(prevbook=>prevbook.filter((book)=>book._id !==id))
        toast.success("Book successfully deleted ")
    }

    catch(error)
    {
       toast.error("Error deleting books");
    }
    finally{
        setdeleting(null)
    }
                 
  }
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/books");
        setBooks(res.data);
      }
      catch (error) {
        if(error.response)
        {
            const status=error.response.status;
            if(status===500)
            {
                setError("SERVER_ERROR");
            }
            else{
                toast.error(`status ${error.response.status}`);
            }
        }
        else if(error.request)
        {
           setError("NETWORK_ERROR");
        }
        else {
            toast.error("Somethig went wrong");
        }
      }
      finally {
        setIsLoading(false);
      }
    }
    fetchBooks()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased font-sans">
      
      {/* Navbar Header Area */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">ReadTrack Dashboard</h1>
          </div>
          {books.length > 0 && (
            <Link to="/create" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors duration-150">
              Add New Book
            </Link>
          )}
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* State 1: Loading State */}

        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-600 border-t-transparent"></div>
            <p className="text-gray-500 font-medium animate-pulse">Fetching latest catalog records...</p>
          </div>
        )}

         
         {!isLoading && books.length===0    && !error && (<MessageCard message1="No Books Availabe" message2 ="Your inventroy database is currently empty" btn={true}/>)}
         {error==="NETWORK_ERROR" && (<MessageCard message1="No Response from the server" message2="Please try again later" btn={false}/>)}
         {error==="SERVER_ERROR" && (<MessageCard message1="Internal Server Error" message2="Please try again later" btn={false}/>)}



        {/* State 3: Display Grid */}
        {!isLoading && books.length > 0 && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((bookItem) => (
              <div key={bookItem._id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow duration-200">
                
                {/* Book Cover Container */}
                <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden flex items-center justify-center border-b border-gray-100">
                  {bookItem.coverImage ? (
                    <img 
                      src={bookItem.coverImage} 
                      alt={bookItem.title} 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                    />
                  ) : (
                    <span className="text-gray-400 text-xs italic">No Cover Image</span>
                  )}
                </div>

                {/* Book Details Info */}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="font-bold text-gray-900 text-base line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors" title={bookItem.title}>
                    {bookItem.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-3">by {bookItem.author}</p>
                  
                  {/* Rating / Review Data Badges */}
                  <div className="mt-auto pt-3 border-t border-gray-50 flex items-center justify-between text-xs">
                    <div className="flex items-center bg-amber-50 text-amber-700 px-2 py-1 rounded font-semibold">
                      <svg className="w-3.5 h-3.5 text-amber-500 mr-1 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {bookItem.rating} / 5
                    </div>
                    <span className="text-gray-400 bg-gray-100 px-2 py-1 rounded font-medium line-clamp-1 max-w-[60%]">
                      {bookItem.review || "No reviews"}
                    </span>
                  </div>

                  {/* Actions Area: Update and Delete Buttons */}
                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    
                    {/* ADDED: Update Link Button */}
                    <Link 
                      to={`/update/${bookItem._id}`}
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors duration-150 py-1 px-2 rounded hover:bg-indigo-50"
                    >
                      <svg className="w-3.5 h-3.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Update
                    </Link>

                    {/* Delete Button (Changed flex layout to justify-between context) */}
                    <button 
                      onClick={() => handleDeletion(bookItem._id)} 
                      disabled={deletingId !== null} 
                      className="inline-flex items-center space-x-1 text-xs font-semibold text-red-600 hover:text-red-700 disabled:text-gray-400 transition-colors duration-150 py-1 px-2 rounded hover:bg-red-50 disabled:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                    >
                      {deletingId === bookItem._id ? (
                        <>
                          <span className="animate-spin inline-block w-3 h-3 border-2 border-current border-t-transparent rounded-full mr-1"></span>
                          Deleting...
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-16v1a3 3 0 01-3 3H9a3 3 0 01-3-3V1m11 4h10" />
                          </svg>
                          Delete
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}


