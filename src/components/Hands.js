import axios from "axios"
import { useEffect, useState } from "react"
import PropTypes from 'prop-types'
import Hand from "./Hand"
import Tile from "./Tile"
import "./Hands.css"
import Cookies from "universal-cookie"
const cookies = new Cookies()
const token = cookies.get("TOKEN")

const Hands = ({ hands, setHands, tiles, tileSelect, setTileSelect, handleTileSelection, selectedTiles, setSelectedTiles }) => {
    const [newHand, setNewHand] = useState(new Array())
    const [success, setSuccess] = useState("")
    const [alert, setAlert] = useState("")

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/hands/", {
                headers: {
                    Authorization: token
                }
            })
            .then(response => {
                let hands = response.data
                setHands(hands)
            })
    }, [])


    const addTileToHand = (tile) => {
        // Count the amount of specified tiles that are already in hand
        const countTiles = newHand.filter(id => id === tile).length
        // If the hand has less than 17 tiles and the amount of specified tiles is less than 4
        if (newHand.length < 17 && countTiles < 4) setNewHand(newHand.concat(tile))
    }

    const addNewHand = () => {
        axios
            .post("http://localhost:3001/api/hands",
                {
                    hand: newHand,
                    wait: selectedTiles
                },
                {
                    headers: {
                        Authorization: token
                    }
                }
            ).then(response => {
                const addedHand = {
                    id: response.data.result.insertId,
                    hand: JSON.stringify(newHand),
                    wait: JSON.stringify(selectedTiles)
                }
                // In case there was an error message present from before
                setAlert("")
                setSuccess(response.data.message)
                setHands(hands.concat(addedHand));
                setNewHand(new Array());
                setTileSelect(new Array(tiles.length).fill(false));
                setSelectedTiles(new Array())
            }).catch(error => {
                // In case previous hand addition was successful
                setSuccess("")
                setAlert(error.response.data.message)
            })
    }

    return (
        <div>
            {alert &&
                <div className="alert">{alert}</div>
            }
            {success &&
                <div className="alert success">{success}</div>
            }
            <div className="add-new-hand">
                <div className="all-hands">
                    <h2>All hands</h2>
                    {
                        hands.map(hand => (
                            <div key={hand.id}>
                                <h3>Hand {hand.id}:</h3>
                                <Hand hand={JSON.parse(hand.hand)} tiles={tiles} />
                                <h3>Wait for hand {hand.id}:</h3>
                                <Hand hand={JSON.parse(hand.wait)} tiles={tiles} />
                            </div>
                        ))
                    }
                </div>
                {token &&
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
                }
            </div >
        </div>
    )
}

Hands.propTypes = {
    hands: PropTypes.array.isRequired,
    setHands: PropTypes.func.isRequired,
    tiles: PropTypes.array.isRequired,
    tileSelect: PropTypes.array.isRequired,
    setTileSelect: PropTypes.func.isRequired,
    handleTileSelection: PropTypes.func.isRequired,
    selectedTiles: PropTypes.array.isRequired,
    setSelectedTiles: PropTypes.func.isRequired
}

export default Hands