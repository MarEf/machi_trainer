import PropTypes from 'prop-types'

const Result = ({
    tilesCorrect,
    tilesIncorrect,
    totalTiles,
    setChallengesLeft,
    setTotalWaitTiles,
    setTilesCorrect,
    setTilesIncorrect }) => {


    /* Reset the trainer for a new round */
    const handleReset = () => {
        setChallengesLeft(5)
        setTotalWaitTiles(0)
        setTilesCorrect(0)
        setTilesIncorrect(0)
    }

    return (
        <div>
            <h3>You got {tilesCorrect} wait tiles correct out of {totalTiles}</h3>
            {tilesIncorrect !== 0
                ? <p>You also got {tilesIncorrect} {tilesIncorrect === 1 ? 'tile' : 'tiles'} incorrect.</p>
                : <p>Congratulations! You got a perfect score with no errors!</p>
            }
            <p>Would you like to reset the challenge and try again?</p>
            <button onClick={handleReset}>Play again</button>
        </div>
    )
}

Result.propTypes = {
    tilesCorrect: PropTypes.number.isRequired,
    tilesIncorrect: PropTypes.number.isRequired,
    totalTiles: PropTypes.number.isRequired,
    setChallengesLeft: PropTypes.func.isRequired,
    setTotalWaitTiles: PropTypes.func.isRequired,
    setTilesCorrect: PropTypes.func.isRequired,
    setTilesIncorrect: PropTypes.func.isRequired
}

export default Result