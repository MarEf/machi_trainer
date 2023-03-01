import PropTypes from 'prop-types'
import './Tile.css'

const Tile = ({ tile_id, tile, challenge, value, onChange }) => {
    let selected = ""
    if (value) {
        selected = "selected"
    }

    return (
        <div className={`tile ${selected}`}>
            <label>
                {challenge &&
                    <input type="checkbox" id={tile_id} value={tile_id} onChange={onChange} checked={value} />
                }
                {tile}
            </label>
        </div >
    )
}

Tile.propTypes = {
    tile_id: PropTypes.string.isRequired,
    tile: PropTypes.string.isRequired,
    challenge: PropTypes.bool.isRequired,
    value: PropTypes.bool,
    onChange: PropTypes.func
}

export default Tile