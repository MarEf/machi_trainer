import Tile from './Tile'
import './Challenge.css'
import PropTypes from 'prop-types'

const Challenge = ({ tileSelect, handleTileSelection, tiles }) => {

    return (
        <div>
            <div className='hand'>
                UNFINISHED MAHJONG HAND GOES HERE
            </div>

            <button>Submit</button>

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
    )

}

Challenge.propTypes = {
    tileSelect: PropTypes.array.isRequired,
    handleTileSelection: PropTypes.func.isRequired,
    tiles: PropTypes.array.isRequired
}

export default Challenge