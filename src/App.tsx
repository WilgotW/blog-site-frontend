import React from 'react';
import './App.css';
import './MediaQueries.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import { HashRouter as Router, Route, Routes , useParams} from 'react-router-dom';
import CreatePage from './components/CreatePage';
import Profile from './components/Profile';
import BlogSearchPage from './components/BlogSearchPage';

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
          <Route path='/search' element={<BlogSearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
