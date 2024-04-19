import { BrowserRouter as Routes, Route } from 'react-router-dom';
import Questions from './views/Questions';
import Registration from './views/Registration';
import Navigation from './Navigation';
import { useState } from 'react';
import Home from './Home';


export default function App() {


  return (
    <>
    <Navigation/>
    <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/questions" element={<Questions />} />
          <Route path="/register" element={<Registration />}/>
    </Routes>
    </>
  );
};

