import './App.css';
import {BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Detail from './pages/Detail';
import Edit from './pages/Edit';

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/admin/:id' element={<Admin />} />
            <Route path='/profile/:id' element={<Profile />} />
            <Route path='/detail/:id' element={<Detail/>} />
            <Route path='/edit/:id' element={<Edit/>} />
          </Routes> 
        </Router>
      </ChakraProvider>
    </div>
  );
}

export default App;
