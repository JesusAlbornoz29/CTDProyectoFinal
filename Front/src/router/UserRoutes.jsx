import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<p>login por ejemplo</p>} />
    </Routes>
  );
}
