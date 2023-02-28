import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes, Route, NavLink
} from 'react-router-dom'

import tiles from './utils/tiles'
import Challenge from './components/Challenge';
import Hands from './components/Hands';
import Home from './components/Home';

function App() {

  const [tileSelect, setTileSelect] = React.useState(new Array(tiles.length).fill(false))

  const handleTileSelection = (position) => {
    const updatedTileSelection = tileSelect.map((tile, index) => index === position ? !tile : tile)
    setTileSelect(updatedTileSelection)
  }

  const currentYear = new Date().getUTCFullYear()

  return (
    <div className="App">
      <Router>
        <div className='header'>
          <NavLink to="/" className={({ isActive }) => (isActive ? "link-active" : "link")}>Home</NavLink>
          <NavLink to="/challenge" className={({ isActive }) => (isActive ? "link-active" : "link")}>Challenge</NavLink>
          <NavLink to="/hands" className={({ isActive }) => (isActive ? "link-active" : "link")}>Manage Hands</NavLink>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenge" element={<Challenge tileSelect={tileSelect} handleTileSelection={handleTileSelection} tiles={tiles} />} />
          <Route path="/hands" element={<Hands />} />
        </Routes>

        <div className='footer'>
          <i>©{currentYear}, Maria Efimova</i>
        </div>
      </Router>
    </div>
  );
}

export default App;
