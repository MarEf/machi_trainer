import Tile from "./Tile"
import PropTypes from 'prop-types'

const Hand = ({ hand, tiles }) => {
    return (
        <div className="hand">
            {
                hand.map((id, index) => {
                    const tile = tiles.find(({ tile_id }) => tile_id === id)

                    return (
                        <span key={index}>
                            <Tile tile_id={id} tile={tile.tile} challenge={false} />
                        </span>
                    )
                }, 0)
            }
        </div>
    )
}

Hand.propTypes = {
    hand: PropTypes.array.isRequired,
    tiles: PropTypes.array.isRequired
}

export default Hand