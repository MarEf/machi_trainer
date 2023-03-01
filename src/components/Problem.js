import Tile from './Tile'
import React from 'react'
import './Challenge.css'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useEffect } from 'react'
import Hand from './Hand'

const Problem = ({ tileSelect, selectedTiles, handleTileSelection, tiles, mode }) => {
    const [currentHand, setCurrentHand] = React.useState(new Array());
    const [currentWait, setCurrentWait] = React.useState(new Array());

    useEffect(() => {
        axios
            .get("http://localhost:3001/hands/")
            .then(response => {
                const hand_id = Math.floor(Math.random() * response.data.length + 1)
                /* Why is this always 1? */
                console.log(hand_id)

                axios.get(`http://localhost:3001/hands/${hand_id}`)
                    .then(response => {
                        let hand = response.data.hand
                        const wait = response.data.wait

                        if (mode === "scrambled") {
                            hand = hand.sort(() => Math.random() - 0.5)
                        } else {
                            hand = hand.sort()
                        }

                        setCurrentHand(hand)
                        setCurrentWait(wait)
                    })
            })
    }, [])

    const handleSubmit = () => {
        /* Sort arrays so that their contents are in the same order before comparing */
        const wait = [...currentWait].sort()
        const selection = [...selectedTiles].sort()

        /* Compare selection to expected wait */
        if (JSON.stringify(wait) === JSON.stringify(selection)) {
            console.log("Correct!")
        } else {
            console.log("Wrong!")
        }
    }


    return (
        <div>
            <div className='handView'>
                <h2>Select all tiles that reduce shanten or complete the hand</h2>

                <Hand hand={currentHand} tiles={tiles} />

            </div>

            <button className='submit-challenge' onClick={handleSubmit}>Submit</button>

            <div className='tiles'>
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
        </div >
    )

}

Problem.propTypes = {
    tileSelect: PropTypes.array.isRequired,
    selectedTiles: PropTypes.array.isRequired,
    handleTileSelection: PropTypes.func.isRequired,
    tiles: PropTypes.array.isRequired,
    mode: PropTypes.string
}

export default Problem