import './Challenge.css'
import Problem from './Problem'
import PropTypes from 'prop-types'


const Challenge = ({ tileSelect, selectedTiles, handleTileSelection, tiles, mode }) => {

    return (
        <div>
            <Problem tileSelect={tileSelect} selectedTiles={selectedTiles} handleTileSelection={handleTileSelection} tiles={tiles} mode={mode} />
        </div >
    )

}

Challenge.propTypes = {
    tileSelect: PropTypes.array.isRequired,
    selectedTiles: PropTypes.array.isRequired,
    handleTileSelection: PropTypes.func.isRequired,
    tiles: PropTypes.array.isRequired,
    mode: PropTypes.string
}

export default Challenge