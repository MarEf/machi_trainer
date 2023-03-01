import Tile from './Tile'
import React from 'react'
import './Challenge.css'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useEffect } from 'react'
import Hand from './Hand'

const Challenge = ({ tileSelect, selectedTiles, handleTileSelection, tiles, mode }) => {
    const [currentHand, setCurrentHand] = React.useState(new Array());
    const [currentWait, setCurrentWait] = React.useState(new Array());


    useEffect(() => {
        axios
            .get("http://localhost:3001/hands/1")
            .then(response => {
                let hand = response.data.hand
                const wait = response.data.wait

                if (mode === "scrambled") {
                    hand = hand.sort(() => Math.random() - 0.5)
                }

                setCurrentHand(hand)
                setCurrentWait(wait)

                console.log(tiles[0].tile_id)
                console.log(typeof (tiles[0].tile_id))
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

Challenge.propTypes = {
    tileSelect: PropTypes.array.isRequired,
    selectedTiles: PropTypes.array.isRequired,
    handleTileSelection: PropTypes.func.isRequired,
    tiles: PropTypes.array.isRequired,
    mode: PropTypes.string
}

export default Challenge