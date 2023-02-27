import React from 'react';
import './App.css';
import Tile from './components/Tile'
import tiles from './utils/tiles'

function App() {

  const [tileSelect, setTileSelect] = React.useState(new Array(tiles.length).fill(false))

  const handleTileSelection = (position) => {
    const updatedTileSelection = tileSelect.map((tile, index) => index === position ? !tile : tile)
    setTileSelect(updatedTileSelection)
  }

  return (
    <div className="App">
      <div className='hand'>
        UNFINISHED MAHJONG HAND GOES HERE
      </div>

      <div className='tiles'>
        {
          tiles.map(({ tile_id, tile }, index) => {
            return (
              <span key={index}>
                <Tile tile_id={tile_id} tile={tile} challenge={true} value={tileSelect[index]} onChange={() => handleTileSelection(index)} />
              </span>
            )
          }, 0)
        }
      </div>
    </div>
  );
}

export default App;
