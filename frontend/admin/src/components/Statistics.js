import styles from "../styles/statistics.module.sass"
import Plots from "./Plot";

function Statistics({orders}) {
    const countByStatus = orders.reduce((accumulator, order) => {
        const {status} = order;
        accumulator[status] = (accumulator[status] || 0) + 1;
        return accumulator;
    }, {});

    const data = Object.keys(countByStatus).map((status) => ({
        status: [status],
        count: [countByStatus[status]],
    }));

    return (
        <>
            <h1 className={styles.statistics__title}>Статистика</h1>
            <p className={styles.statistics__subtitle}>За все время</p>
            <div className={styles.statistics}>
                <Plots countByStatus={countByStatus}/>
                <div className={styles.statistics__charts}>
                    {
                        data.map((item) => {
                            return (
                                <>
                                    <p className={styles.statistics__charts__text}><b>{item.status}</b></p>
                                    <p className={`${styles.statistics__charts__text} ${styles.statistics__charts__text__counter}`}>{item.count}</p>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Statistics;