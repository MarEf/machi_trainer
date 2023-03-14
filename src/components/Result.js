import axios from 'axios'
import PropTypes from 'prop-types'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const token = cookies.get("TOKEN")

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
        if (token) {
            axios
                .post("http://localhost:3001/api/score",
                    {
                        user_id: 1,
                        correct: tilesCorrect,
                        wrong: tilesIncorrect,
                        total: totalTiles
                    },
                    {
                        headers: {
                            Authorization: token
                        }
                    }
                ).then(() => {
                    setChallengesLeft(5)
                    setTotalWaitTiles(0)
                    setTilesCorrect(0)
                    setTilesIncorrect(0)
                })
        } else {
            setChallengesLeft(5)
            setTotalWaitTiles(0)
            setTilesCorrect(0)
            setTilesIncorrect(0)
        }
    }

    return (
        <div>
            <h3>You got {tilesCorrect} wait tiles correct out of {totalTiles}</h3>
            {(tilesIncorrect !== 0) || (tilesCorrect !== totalTiles)
                ? <p>You also got {tilesIncorrect} {tilesIncorrect === 1 ? 'tile' : 'tiles'} incorrect.</p>
                : <p>Congratulations! You got a perfect score with no errors!</p>
            }

            <p>Would you like to reset the challenge and try again? If you&apos;re logged in, this will also save your score.</p>
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