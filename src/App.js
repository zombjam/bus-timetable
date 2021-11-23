import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home';
import Nearby from './Nearby';
import Search from 'Search';
import Recommend from 'Recommend';
// https://wmts.nlsc.gov.tw/wmts/EMAP/default/GoogleMapsCompatible/{z}/{y}/{x}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/nearby" element={<Nearby />}></Route>
        <Route exact path="/search" element={<Search />}></Route>
        <Route exact path="/recommend" element={<Recommend />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
