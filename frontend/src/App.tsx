import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './screens/LandingPage/LandingPage';
import MyNotes from './screens/MyNotes/MyNotes';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import { useSelector } from 'react-redux';
import CreateNote from './screens/CreateNote/CreateNote';

const App = () => {
  const rx = useSelector((state) => state);
  Object.assign(window, { rx });
  Object.assign(window, { rxs: JSON.stringify(rx) });
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<LoginScreen />} />
        <Route path='/register' element={<RegisterScreen />} />
        <Route path='/createnote' element={<CreateNote />} />

        <Route path='/mynotes' element={<MyNotes />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
