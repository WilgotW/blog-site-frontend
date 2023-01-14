import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import { HashRouter as Router, Route, Routes , useParams} from 'react-router-dom';
import CreatePage from './components/CreatePage';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePage />} />
          <Route path='/my-profile' element={<Profile />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
