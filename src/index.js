import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from './pages/Home';
import { Level1 } from './pages/Level1';
import { Level2 } from './pages/Level2';
import { Level3 } from './pages/Level3';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/geometric-transformations' element={<Home />} />
          <Route path='/geometric-transformations/level-1' element={<Level1 />} />
          <Route path='/geometric-transformations/level-2' element={<Level2 />} />
          <Route path='/geometric-transformations/level-3' element={<Level3 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

/*
TODO:
- Metric
- Level2
- Level3
- Description
*/
