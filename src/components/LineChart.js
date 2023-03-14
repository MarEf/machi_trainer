import PropTypes from 'prop-types'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Recent Score History',
        },
    },
}

const LineChart = ({ data }) => {
    return (
        <Line options={options} data={data} />
    )
}

LineChart.propTypes = {
    data: PropTypes.object.isRequired
}

export default LineChart