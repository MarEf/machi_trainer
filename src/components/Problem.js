import Tile from './Tile'
import React from 'react'
import './Challenge.css'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useEffect } from 'react'
import Hand from './Hand'

const Problem = ({
    tileSelect,
    setTileSelect,
    selectedTiles,
    handleTileSelection,
    challengesLeft,
    setChallengesLeft,
    totalWaitTiles,
    setTotalWaitTiles,
    tilesCorrect,
    setTilesCorrect,
    tilesIncorrect,
    setTilesIncorrect,
    tiles,
    mode }) => {

    const [hands, setHands] = React.useState(new Array());
    const [currentHand, setCurrentHand] = React.useState(new Array());
    const [currentWait, setCurrentWait] = React.useState(new Array());
    const [displayWait, setDisplayWait] = React.useState(new Array());
    const [solved, setSolved] = React.useState(false)

    const scrambleHand = (hand) => {
        if (mode === "scrambled") {
            return (hand.sort(() => Math.random() - 0.5))
        } else {
            return (hand.sort())
        }
    }

    useEffect(() => {
        axios
            .get("http://localhost:3001/hands/")
            .then(response => {
                const handId = Math.floor(Math.random() * response.data.length)
                const newHands = response.data
                setHands(newHands)

                setCurrentHand(scrambleHand(newHands[handId].hand))
                setCurrentWait(newHands[handId].wait)
            })
    }, [])

    const handleSubmit = () => {
        /* Sort arrays so that their contents are in the same order before comparing */
        const wait = [...currentWait].sort()
        const selection = [...selectedTiles].sort()

        /* Variables for score calculation */
        const totalTiles = totalWaitTiles + wait.length
        let totalCorrect = tilesCorrect
        let totalIncorrect = tilesIncorrect

        console.log(`Total tiles: ${totalTiles}`)

        /* Compare selection to expected wait and calculate the score */
        if (JSON.stringify(wait) === JSON.stringify(selection)) {
            totalCorrect += wait.lenght
        } else {
            selection.forEach(tile => {
                if (wait.includes(tile)) {
                    totalCorrect += 1
                } else {
                    totalIncorrect += 1
                }
            });
        }

        console.log(`Total correct: ${totalCorrect}`)
        console.log(`Total incorrect: ${totalIncorrect}`)

        setTotalWaitTiles(totalTiles)
        setTilesCorrect(totalCorrect)
        setTilesIncorrect(totalIncorrect)

        /* Set display for previous wait, whether the guess was correct or not */
        setDisplayWait(wait)

        /* Set problem as solved (you only get one try per run!) */
        setSolved(true)
    }

    const handleNext = () => {
        /* Set new hands, so that the challenge can continue */
        const newHandId = Math.floor(Math.random() * hands.length)

        /* Decrement challenge counter */
        setChallengesLeft(challengesLeft - 1)
        setSolved(false)


        setCurrentHand(scrambleHand(hands[newHandId].hand))
        setCurrentWait(hands[newHandId].wait)

        /* Reset previous wait and player selection */
        setDisplayWait(new Array())
        setTileSelect(new Array(tiles.length).fill(false))
    }

    return (
        <div>
            <div className='handView'>
                {displayWait.length > 0 && <div>
                    <h2>Wait tiles for previous hand:</h2>
                    <Hand hand={displayWait} tiles={tiles} />
                </div>
                }

                <h2>Select all tiles that reduce shanten or complete the hand</h2>

                <Hand hand={currentHand} tiles={tiles} />

            </div>

            {!solved
                ? <button className='submit-challenge' onClick={handleSubmit}>Submit</button>
                : <button className='next-challenge' onClick={handleNext}>Continue</button>
            }

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
    setTileSelect: PropTypes.func.isRequired,
    selectedTiles: PropTypes.array.isRequired,
    handleTileSelection: PropTypes.func.isRequired,
    challengesLeft: PropTypes.number,
    setChallengesLeft: PropTypes.func,
    totalWaitTiles: PropTypes.number,
    setTotalWaitTiles: PropTypes.func,
    tilesCorrect: PropTypes.number,
    setTilesCorrect: PropTypes.func,
    tilesIncorrect: PropTypes.number,
    setTilesIncorrect: PropTypes.func,
    tiles: PropTypes.array.isRequired,
    mode: PropTypes.string
}

export default Problem