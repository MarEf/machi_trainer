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
import Register from './components/Register';
import Login from './components/Login';

function App() {

  /* Array indexes of selected tiles for display purposes */
  const [tileSelect, setTileSelect] = React.useState(new Array(tiles.length).fill(false))
  /* Array of tile_id's of selected tiles */
  const [selectedTiles, setSelectedTiles] = React.useState(new Array())
  /* Array for loading the hands stored in the database */
  const [hands, setHands] = React.useState(new Array());

  const handleTileSelection = (position, value) => {
    const updatedTileSelection = tileSelect.map((tile, index) => index === position ? !tile : tile)
    setTileSelect(updatedTileSelection)

    if (selectedTiles.find((tile_id => tile_id === value))) {
      const newSelection = selectedTiles.filter(tile_id => tile_id !== value)
      setSelectedTiles(newSelection)
    } else {
      setSelectedTiles(selectedTiles.concat(value))
    }
  }

  const currentYear = new Date().getUTCFullYear()

  return (
    <div className="App">
      <Router>
        <div className='header'>
          <NavLink to="/" className={({ isActive }) => (isActive ? "link-active" : "link")}>Home</NavLink>
          <NavLink to="/challenge" className={({ isActive }) => (isActive ? "link-active" : "link")}>Challenge</NavLink>
          <NavLink to="/hands" className={({ isActive }) => (isActive ? "link-active" : "link")}>Manage Hands</NavLink>
          <NavLink to="/register" className={({ isActive }) => (isActive ? "link-active" : "link")}>Create Account</NavLink>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "link-active" : "link")}>Log in</NavLink>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenge" element={<Challenge hands={hands} setHands={setHands} tileSelect={tileSelect} setTileSelect={setTileSelect} selectedTiles={selectedTiles} setSelectedTiles={setSelectedTiles} handleTileSelection={handleTileSelection} tiles={tiles} />} />
          <Route path="/challenge/scrambled" element={<Challenge hands={hands} setHands={setHands} tileSelect={tileSelect} setTileSelect={setTileSelect} selectedTiles={selectedTiles} setSelectedTiles={setSelectedTiles} handleTileSelection={handleTileSelection} tiles={tiles} mode={"scrambled"} />} />
          <Route path="/hands" element={<Hands hands={hands} setHands={setHands} tiles={tiles} tileSelect={tileSelect} setTileSelect={setTileSelect} handleTileSelection={handleTileSelection} selectedTiles={selectedTiles} setSelectedTiles={setSelectedTiles} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <div className='footer'>
          <i>©{currentYear}, Maria Efimova</i>
        </div>
      </Router>
    </div>
  );
}

export default App;
