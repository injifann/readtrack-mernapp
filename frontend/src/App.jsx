import React from 'react'
import HomePage from './pages/HomePage'
import AddBook from './pages/AddBook'
import { Routes,Route } from 'react-router'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/addbook' element={<AddBook/>}></Route>
      </Routes>
    </div>
  )
}
