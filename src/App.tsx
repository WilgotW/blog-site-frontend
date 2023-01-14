import React from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import { HashRouter as Router, Route, Routes , useParams} from 'react-router-dom';
import CreatePage from './components/CreatePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/create' element={<CreatePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
