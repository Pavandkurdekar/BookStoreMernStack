import React from 'react'
import { Route,Routes } from 'react-router-dom';
import CreateBook from './Pages/CreateBook';
import HomeBook from './Pages/HomeBook';



const App = () => {
  return (
   <>
   
    <Routes>
      <Route path='/' element={<HomeBook/>}/>
      <Route path='/createbook' element={<CreateBook/>}/>
 

    </Routes>
    </>
  )
}

export default App
