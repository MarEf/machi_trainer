import Tile from "./Tile"
import PropTypes from 'prop-types'

const Hand = ({ hand, tiles, editable = false, newHand, setNewHand }) => {

    const removeTile = (tile) => {
        // Make a shallow copy of the existing hand
        const editedHand = [...newHand]
        // Check if a tile that is to be removed is present in the hand
        const index = editedHand.indexOf(tile)
        if (index > -1) {
            // Remove the tile
            editedHand.splice(index, 1)
        }
        // Replace existing hand with the edited one
        setNewHand(editedHand)
    }

    return (
        <div className="hand">
            {
                hand.map((id, index) => {
                    const tile = tiles.find(({ tile_id }) => tile_id === id)

                    return (
                        !editable
                            ? <span key={index}>
                                <Tile tile_id={id} tile={tile.tile} challenge={false} />
                            </span>
                            : <button key={index} onClick={() => removeTile(tile.tile_id)}>
                                <Tile tile_id={id} tile={tile.tile} challenge={false} />
                            </button>

                    )
                }, 0)
            }
        </div>
    )
}

Hand.propTypes = {
    hand: PropTypes.array.isRequired,
    tiles: PropTypes.array.isRequired,
    editable: PropTypes.bool,
    newHand: PropTypes.array,
    setNewHand: PropTypes.func
}

export default Hand