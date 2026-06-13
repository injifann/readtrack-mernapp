import axios from 'axios';
import React from 'react';
import HomePage from './pages/HomePage';
import CreateBook from './pages/CreateBook';
import {Route,Routes} from 'react-router'

function App() {
 
 return(
<Routes>
  <Route path='/' element={<HomePage/>}/>
  <Route path='create' element={<CreateBook/>}/>
</Routes>
 )
}

export default App;