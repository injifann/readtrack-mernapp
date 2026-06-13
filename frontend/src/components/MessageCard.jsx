import React from 'react'
import { Link } from 'react-router'

export default function MessageCard({message1,message2,btn}) {
  return (
    <div className="max-w-md mx-auto text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm p-8 mt-10">
        <div className="text-gray-400 mb-4 flex justify-center">
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">{message1}</h3>
        <p className="text-gray-500 text-sm mb-6">{message2}.</p>
        {btn && (<Link to="/create" className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors">
        Create First Book
        </Link>)}
        
    </div>
  )
}
