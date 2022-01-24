import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AddTutorial from './components/add-tutorial.component';


//this App.js is the container that has Router and Navbar Component
function App() {
  return (
    <div className="App">
      <Router>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
          <a href='/tutoriais' className='navbar-brand'>
            Luan Braga
          </a>
          <div className='navbar-nav mr-auto'>
            {/* <li className='nav-item'>
              <Link to={'/tutorials'} className='nav-link'>
                Tutorials
              </Link>
            </li> */}
            <li className='nav-item'>
              <Link to='/add' className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className='container mt-3'>
          <Routes>
            {/* <Route exact path={['/', '/tutorials']} component={TutorialsList} /> */}
            <Route path='/add' element={<AddTutorial/>} />
            {/* <Route path='/tutorials/:id' component={Tutorial} /> */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
