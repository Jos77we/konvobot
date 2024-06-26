// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateUser from './CreateUser';
import ConfirmUser from './ConfirmUser';
import Login from './Login';

function Index() {
  return (
    <Router>
      <Routes>
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/confirm-user" element={<ConfirmUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);
