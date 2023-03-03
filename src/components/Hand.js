import Tile from "./Tile"
import PropTypes from 'prop-types'

const Hand = ({ hand, tiles, editable = false, newHand, setNewHand }) => {

    const removeTile = (tile) => {
        const editedHand = newHand.filter(handTile => handTile !== tile)
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