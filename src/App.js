import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getGeolocation } from 'store/search/index';

import Home from './Home';
import Nearby from './Nearby';
import Search from './Search';
import Recommend from './Recommend';
import Detail from './Detail';

function App() {
  const isOpenGPS = useSelector(state => state.search.isOpenGPS);
  const dispatch = useDispatch();

  const [timeLeft, setTimeLeft] = useState(300); // 5分鐘更新一次位置
  const intervalRef = useRef();

  useEffect(() => {
    if (isOpenGPS) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
      return () => {
        return clearInterval(intervalRef.current);
      };
    }
  }, [isOpenGPS]);

  useEffect(() => {
    if (timeLeft <= 0) {
      dispatch(getGeolocation());
      setTimeLeft(300);
    }
  }, [timeLeft, dispatch]);

  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/nearby" element={<Nearby />}></Route>
        <Route exact path="/search" element={<Search />}></Route>
        <Route exact path="/recommend" element={<Recommend />}></Route>
        <Route exact path="/detail" element={<Detail />}></Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
