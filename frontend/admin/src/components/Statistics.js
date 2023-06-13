
import styles from '../styles/statistics.module.sass'
import Card from "./Card";
import ruble from '../image/icon/currency_ruble.svg'
import cart from '../image/icon/shopping_cart.svg'
import person from '../image/icon/person.svg'
import Histogram from "./Histogram";
import Pies from "./Pie";

function Statistics({orders, users}) {
    const currentDate = new Date();
    const lastMonthDate = new Date();
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    const filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.date);
        return orderDate > lastMonthDate;
    });

    const filteredUsers = users.filter((user) => {
        const userDate = new Date(user.date);
        return userDate > lastMonthDate;
    });

    const totalSum = filteredOrders.reduce((sum, order) => sum + order.total_price, 0);
    const orderCount = filteredOrders.length;
    const userCount = filteredUsers.length;

    function formatNumber(number) {
        if (number >= 1000) {
            const abbreviatedNumber = Math.floor(number / 1000);
            return `${abbreviatedNumber}к`;
        }

        return number.toString();
    }
    const formattedNumber = formatNumber(totalSum)
    console.log(orders)

    return (
        <div className={styles.statistics}>
            <div className={styles.statistics__container}>
                <Card number={formattedNumber} category="ПРИБЫЛЬ" img={ruble}/>
                <Card number={orderCount} category="ЗАКАЗЫ" img={cart}/>
                <Card number={userCount} category="НОВЫЕ ПОЛЬЗОВАТЕЛИ" img={person}/>
            </div>
            <div className={styles.statistics__charts}>
                <div className={styles.statistics__histogram}>
                    <p className={styles.statistics__histogram__title}>Продажи</p>
                    <Histogram orders={orders}/>
                </div>
                <div className={styles.statistics__pie}>
                    <p className={styles.statistics__histogram__title}>Заказы</p>
                    <Pies orders={orders}/>
                </div>
            </div>
        </div>
    )
}

export default Statistics