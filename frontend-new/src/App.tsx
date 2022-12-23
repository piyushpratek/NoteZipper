import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path='/' element={<LandingPage  />}  />
      <Route path='/mynotes' element={<MyNotes />} />
    </Routes>
    <Footer />
  </Router>
);

export default App;
