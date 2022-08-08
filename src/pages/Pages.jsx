import {Route, Routes} from 'react-router-dom';
import Home from './Home';
import Cuisine from './Cuisine';
import Recipe from './Recipe';

import React from 'react'

function pages() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cuisine/:type' element={<Cuisine/>}/>
        <Route path='/recipe/:id' element={<Recipe/>}/>
    </Routes>
  )
}

export default pages