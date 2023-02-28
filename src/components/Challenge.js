import Tile from './Tile'
import React from 'react'
import './Challenge.css'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useEffect } from 'react'

const Challenge = ({ tileSelect, handleTileSelection, tiles }) => {
    const [currentHand, setCurrentHand] = React.useState(new Array());
    const [currentWait, setCurrentWait] = React.useState(new Array());


    useEffect(() => {
        axios
            .get("http://localhost:3001/hands/1")
            .then(response => {
                const hand = response.data.hand
                const wait = response.data.wait

                setCurrentHand(hand)
                setCurrentWait(wait)

                console.log(tiles[0].tile_id)
                console.log(typeof (tiles[0].tile_id))
            })
    }, [])

    const handleSubmit = () => {
        console.log("Challenge submitted")
    }


    return (
        <div>
            <div className='hand'>
                <h2>Select all tiles that reduce shanten or complete the hand</h2>
                {console.log(currentHand)}
                {console.log(currentWait)}
                {
                    currentHand.map((id, index) => {
                        const tile = tiles.find(({ tile_id }) => tile_id === id)

                        return (
                            <span key={index}>
                                <Tile tile_id={id} tile={tile.tile} challenge={false} />
                            </span>
                        )
                    }, 0)
                }
            </div>

            <button className='submit-challenge' onClick={handleSubmit}>Submit</button>

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
        </div >
    )

}

Challenge.propTypes = {
    tileSelect: PropTypes.array.isRequired,
    handleTileSelection: PropTypes.func.isRequired,
    tiles: PropTypes.array.isRequired
}

export default Challenge