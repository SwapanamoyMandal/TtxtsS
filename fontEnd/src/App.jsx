import React from 'react';
import Landing from './pages/Landing';
import { Route, Routes } from 'react-router-dom';
import RoomforU from './pages/Members'
import Admin from './pages/Admin';
import Members from './pages/Members';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
        <Toaster />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/Admin/:id' element={<Admin />} />
          <Route path='/Members/:id' element={<Members />} />
        </Routes>
    </>
  );
};

export default App;

// rafce
