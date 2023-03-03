import './Challenge.css'
import Problem from './Problem'
import PropTypes from 'prop-types'
import { useState } from 'react'
import Result from './Result'


const Challenge = ({ hands, setHands, tileSelect, setTileSelect, selectedTiles, handleTileSelection, tiles, mode }) => {
    const [challengesLeft, setChallengesLeft] = useState(5)
    const [totalWaitTiles, setTotalWaitTiles] = useState(0)
    const [tilesCorrect, setTilesCorrect] = useState(0)
    const [tilesIncorrect, setTilesIncorrect] = useState(0)

    return (
        <div>
            {challengesLeft > 0
                ? <Problem
                    hands={hands}
                    setHands={setHands}
                    tileSelect={tileSelect}
                    setTileSelect={setTileSelect}
                    selectedTiles={selectedTiles}
                    handleTileSelection={handleTileSelection}
                    challengesLeft={challengesLeft}
                    setChallengesLeft={setChallengesLeft}
                    totalWaitTiles={totalWaitTiles}
                    setTotalWaitTiles={setTotalWaitTiles}
                    tilesCorrect={tilesCorrect}
                    setTilesCorrect={setTilesCorrect}
                    tilesIncorrect={tilesIncorrect}
                    setTilesIncorrect={setTilesIncorrect}
                    tiles={tiles}
                    mode={mode} />
                : <Result
                    tilesCorrect={tilesCorrect}
                    tilesIncorrect={tilesIncorrect}
                    totalTiles={totalWaitTiles}
                    setChallengesLeft={setChallengesLeft}
                    setTotalWaitTiles={setTotalWaitTiles}
                    setTilesCorrect={setTilesCorrect}
                    setTilesIncorrect={setTilesIncorrect}
                />
            }
        </div >
    )

}

Challenge.propTypes = {
    hands: PropTypes.array.isRequired,
    setHands: PropTypes.func.isRequired,
    tileSelect: PropTypes.array.isRequired,
    setTileSelect: PropTypes.func.isRequired,
    selectedTiles: PropTypes.array.isRequired,
    handleTileSelection: PropTypes.func.isRequired,
    tiles: PropTypes.array.isRequired,
    mode: PropTypes.string
}

export default Challenge