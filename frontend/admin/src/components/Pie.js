import {Pie} from "react-chartjs-2";
import {Chart, registerables} from 'chart.js';

import styles from '../styles/pie.module.sass'

function Pies({orders}) {
    const orderStatuses = orders
        .filter((order) => order.status !== 'Завершен')
        .map((order) => order.status);

    // Подсчитайте количество заказов для каждого статуса
    const statusCounts = orderStatuses.reduce((acc, status) => {
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                data: Object.values(statusCounts),
                backgroundColor: [
                    'rgb(64,64,183)',
                    'rgb(125,167,214)',
                    'rgb(105,133,205)',
                ],
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
        },
        layout: {
            padding: {
                bottom: 20,
            },
        },
    };


    return (
        <div className={styles.pie}>
            <Pie data={chartData} options={chartOptions}/>
        </div>
    )
}

export default Pies