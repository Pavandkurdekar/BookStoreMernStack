import React from 'react'
import { Route,Routes } from 'react-router-dom';
import CreateBook from './Pages/CreateBook';
import DeleteBook from './Pages/DeleteBook';
import EditBook from './Pages/EditBook';
import ShowBook from './Pages/ShowBook';
import HomeBook from './Pages/HomeBook';



const App = () => {
  return (
   
    <Routes>
      <Route path='/' element={<HomeBook/>}/>
      <Route path='/book/create' element={<CreateBook/>}/>
      <Route path='/book/show' element={<ShowBook/>}/>
      <Route path='/book/edit' element={<EditBook/>}/>
      <Route path='/book/delete' element={<DeleteBook/>}/>

    </Routes>
  
  )
}

export default App
