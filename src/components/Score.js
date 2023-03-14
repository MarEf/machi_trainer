import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from "universal-cookie"
import LineChart from './LineChart';


const cookies = new Cookies()
const token = cookies.get("TOKEN")

const Score = () => {

    // Hardcoded user id for demo and testing purposes, until the login hooks work
    // Final release will have this value passed as a prop or a parameter
    const [score, setScore] = useState(new Array())
    const [error, setError] = useState("")
    const [hasData, setHasData] = useState(false)
    const id = 1

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/score/${id}`, {
                headers: {
                    Authorization: token
                }
            })
            .then(response => {
                // Store response data into temporary variables
                let scores = response.data
                let correct = new Array()
                let wrong = new Array()
                let total = new Array()
                let timestamps = new Array()

                // Map variables into appropreate arrays
                scores.map(score => {
                    correct = correct.concat(score.correct)
                    wrong = wrong.concat(score.wrong)
                    total = total.concat(score.total)
                    timestamps = timestamps.concat(score.date)
                })

                // Form the score object to be passed down to ChartJS
                const score = {
                    labels: timestamps,
                    datasets: [
                        {
                            label: "Tiles Correct",
                            data: correct,
                            borderColor: 'rgb(0, 107, 0)',
                            backgroundColor: 'rgba(0, 107, 0, 0.5)'
                        },
                        {
                            label: "Tiles Wrong",
                            data: wrong,
                            borderColor: 'rgb(107, 0, 0)',
                            backgroundColor: 'rgba(107, 0, 0, 0.5)'
                        },
                        {
                            label: "Total Tiles",
                            data: total,
                            borderColor: 'rgb(0, 0, 107)',
                            backgroundColor: 'rgba(0, 0, 107, 0.5)'
                        }
                    ]
                }

                // Set hooks
                setScore(score)
                setHasData(true)

            }).catch(error => {
                setError(error)
            })
    }, [id])


    return (
        <div >
            {error &&
                <div className='alert'>{error}</div>
            }

            <div className='score'>
                {hasData &&
                    <LineChart data={score} />
                }
            </div>
        </div >
    )
}

export default Score