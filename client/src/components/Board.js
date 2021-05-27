import React, { useContext } from 'react'
import rd3 from 'react-d3-library';
import AppContext from '../context/app'

const BarChart = rd3.BarChart;
export default function Board() {
    const {results, currentQuestion, status} = useContext(AppContext)

    var barGraphData = (results) => {
        return Object.keys(results).map((choice) => {
            return {
                label: choice,
                value: results[choice]
            };
        })
    }
    if (status === "connected") {
        if(currentQuestion) {
            return (
                <div>
                    <h1>Board</h1>
                    <BarChart 
                        data={barGraphData(results)}
                        title={currentQuestion.q}
                        height={window.innerWidth * 0.6}
                        width={window.innerWidth * 0.8}
                    />
                </div>
            ) 
        } else if (currentQuestion === false) {
            return <h3>Waiting for a question...</h3>
        }
    }
    return null
    
}
