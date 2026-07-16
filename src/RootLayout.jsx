// RootLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import './index.css';
export const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main style={{ padding: '0.5rem' }}>
        <Outlet /> 
      </main>
    </>
  );
};