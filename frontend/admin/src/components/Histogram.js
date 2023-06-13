import {Bar} from "react-chartjs-2";
import { Chart, registerables} from 'chart.js';

import styles from '../styles/histogram.module.sass'

function Histogram({orders}) {
    const prepareDataForChart = (orders) => {
        const salesByMonth = Array(12).fill(0);

        orders.forEach((order) => {
            const orderDate = new Date(order.date);
            const month = orderDate.getMonth();

            salesByMonth[month]++;
        });

        return salesByMonth;
    };

    const data = prepareDataForChart(orders);

    const chartData = {
        type: 'bar',
        labels: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        datasets: [
            {
                label: 'Количество продаж',
                data: data,
                backgroundColor: 'rgba(51,87,163,0.45)',
                borderColor: 'rgba(51, 87, 163)',
                borderWidth: 1,
            },
        ],
    };

    const option = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom', // Положение меток: 'top', 'bottom', 'left', 'right'
            },
        },
        scales: {
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, .02)', // Более блеклый цвет полос
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    Chart.register(...registerables);

    return (
        <div className={styles.histogram}>
            <Bar data={chartData} options={option}/>
        </div>
    )
}

export default Histogram