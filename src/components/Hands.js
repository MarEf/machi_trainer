import axios from "axios"
import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import Hand from "./Hand"
import Tile from "./Tile"
import "./Hands.css"

const Hands = ({ hands, setHands, tiles, tileSelect, setTileSelect, handleTileSelection, selectedTiles }) => {
    const [newHand, setNewHand] = useState(new Array())

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/hands/")
            .then(response => {
                setHands(response.data)
            })
    }, [])


    const addTileToHand = (tile) => {
        if (newHand.length < 17) setNewHand(newHand.concat(tile))
    }

    const addNewHand = () => {
        axios
            .post("http://localhost:3001/hands", {
                hand: newHand,
                wait: selectedTiles
            }).then(
                axios
                    .get("http://localhost:3001/hands/")
                    .then(response => {
                        /* Reset old values for the next hand addition */
                        setHands(response.data);
                        setNewHand(new Array());
                        setTileSelect(new Array(tiles.length).fill(false));
                    })
            )
    }

    return (
        <div className="add-new-hand">
            <div className="all-hands">
                <h2>All hands</h2>
                {
                    hands.map(hand => (
                        <div key={hand.id}>
                            <h3>Hand {hand.id}:</h3>
                            <Hand hand={hand.hand} tiles={tiles} />
                            <h3>Wait for hand {hand.id}:</h3>
                            <Hand hand={hand.wait} tiles={tiles} />
                        </div>
                    ))
                }
            </div>

            <div className="new-hand">
                <h2>Add new hand</h2>
                <div className="hand-preview">
                    <Hand hand={newHand} tiles={tiles} editable={true} newHand={newHand} setNewHand={setNewHand} />
                </div>
                <div className="add-tiles">
                    {
                        tiles.map(tile => (
                            <button key={tile.tile_id} onClick={() => addTileToHand(tile.tile_id)}>
                                <Tile tile_id={tile.tile_id} tile={tile.tile} challenge={false} />
                            </button>
                        ))
                    }
                </div>
                <div className="select-wait">
                    <h3>Select wait for the new hand</h3>
                    <div>
                        {
                            tiles.map(({ tile_id, tile }, index) => {
                                return (
                                    <span key={index}>
                                        <Tile tile_id={tile_id} tile={tile} challenge={true} value={tileSelect[index]} onChange={() => handleTileSelection(index, tile_id)} />
                                    </span>
                                )
                            }, 0)
                        }
                    </div>
                    <div>
                        <button onClick={() => addNewHand()}>Add New Hand to the Database</button>
                    </div>
                </div>
            </div >
        </div >
    )
}

Hands.propTypes = {
    hands: PropTypes.array.isRequired,
    setHands: PropTypes.func.isRequired,
    tiles: PropTypes.array.isRequired,
    tileSelect: PropTypes.array.isRequired,
    setTileSelect: PropTypes.func.isRequired,
    handleTileSelection: PropTypes.func.isRequired,
    selectedTiles: PropTypes.array.isRequired
}

export default Hands