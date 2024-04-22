import './App.css';
import React from 'react';
import Calendar from './Components/temp'
import Home from './Components/Home'
import About from './Components/About'
import Login from './Components/Login'
import { Navbar, Nav } from 'rsuite';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const NavLink = React.forwardRef(({ href, children, ...rest }, ref) => (
  <Link ref={ref} to={href} {...rest}>
    {children}
  </Link>
));

function App() {
  return (
    <Router>
      <div className="App">
          <Navbar className='navbar' appearance='default'>
            <Navbar.Brand as={NavLink} href='/home'>LOGO</Navbar.Brand>
            <Nav>
              <Nav.Item as={NavLink} href='/home'>Kezdőlap</Nav.Item>
              <Nav.Item as={NavLink} href='/about'>Rólam</Nav.Item>
              <Nav.Item as={NavLink} href='/calendar'>Időpontfoglalás</Nav.Item>
            </Nav>
            <Nav pullRight>
            <Nav.Item as={NavLink} href='/login'>Bejelentkezés/Regisztráció</Nav.Item>
            </Nav>
          </Navbar>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/about" element={<About />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
      </div>
    </Router>

    /*

    */
  );
}


export default App;
