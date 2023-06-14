import styles from '../styles/orderPage.module.sass'
import {Link, useParams} from "react-router-dom";

function OrderPage({orders, accessLevel}) {
    const {orderID} = useParams();

    const order = orders.find((item) => item._id === orderID);

    let date = new Date(order.date);
    let formattedDate = ('0' + date.getUTCDate()).slice(-2) + '.' + ('0' + (date.getUTCMonth() + 1)).slice(-2) + '.' + date.getUTCFullYear();
    return (
        <div className={styles.order_page}>
            <div className={styles.order_page__info}>
                <p className={styles.order_page__info__title}>Заказ  №{String(order.order_number).padStart(4, '0')}</p>
                <div className={styles.order_page__info__container}>
                    <div className={styles.order_page__info__container__header}>
                        <p className={`${styles.order_page__info__container__text} ${styles.order_page__info__container__text__title} ${styles.order_page__info__container__text__w120}`}>Дата заказа</p>
                         {(accessLevel === 100 || accessLevel === 60 || accessLevel === 40) && (
                             <>
                                <p className={`${styles.order_page__info__container__text} ${styles.order_page__info__container__text__title} ${styles.order_page__info__container__text__w340}`}>Адресс</p>
                                <p className={`${styles.order_page__info__container__text} ${styles.order_page__info__container__text__title} ${styles.order_page__info__container__text__w200}`}>Покупатель</p>
                                <p className={`${styles.order_page__info__container__text} ${styles.order_page__info__container__text__title} ${styles.order_page__info__container__text__w280}`}>Комментарий</p>
                             </>
                         )}
                        <p className={`${styles.order_page__info__container__text} ${styles.order_page__info__container__text__title} ${styles.order_page__info__container__text__w120}`}>Итог</p>
                    </div>
                    <div className={styles.order_page__info__container__header}>
                        <p className={`${styles.order_page__info__container__text} ${styles.order_page__info__container__text__w120}`}>{formattedDate}</p>
                         {(accessLevel === 100 || accessLevel === 60 || accessLevel === 40) && (
                             <>
                                <p className={`${styles.order_page__info__container__text} ${styles.order_page__info__container__text__w340}`}>{order.address}</p>
                                <p className={`${styles.order_page__info__container__text} ${styles.order_page__info__container__text__w200}`}>{order.user.name}</p>
                                <p className={`${styles.order_page__info__container__text} ${styles.order_page__info__container__text__w280}`}>{order.comment}</p>
                             </>
                         )}
                        <p className={`${styles.order_page__info__container__text} ${styles.order_page__info__container__text__w120}`}>{order.total_price} ₽</p>
                    </div>
                </div>
            </div>
            <div className={styles.order_page__goods}>
                <p className={styles.order_page__goods__title}>Состав</p>
                <div className={styles.order_page__goods__container}>
                    <table className={styles.order_page__goods__table}>
                        <tr className={styles.order_page__goods__table__tr}>
                            <th className={styles.order_page__goods__table__th}>Товар</th>
                            <th className={styles.order_page__goods__table__th}>Количество</th>
                            <th className={styles.order_page__goods__table__th}>Цена</th>
                            <th className={styles.order_page__goods__table__th}>Сумма</th>
                        </tr>
                        {
                            order.goods.map((good) => {
                                const sum = good.quantity * good.full_price
                                return (
                                    <tr className={`${styles.order_page__goods__table__tr} ${styles.order_page__goods__table__tr__data}`}>
                                        <td className={`${styles.order_page__goods__table__td} ${styles.order_page__goods__table__td__name}`}>{good.name}</td>
                                        <td className={styles.order_page__goods__table__td}>{good.quantity}</td>
                                        <td className={styles.order_page__goods__table__td}>{good.full_price} ₽</td>
                                        <td className={styles.order_page__goods__table__td}>{sum} ₽</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
            <div className={styles.order_page__status}>
                <p className={styles.order_page__status__title}>Статус заказа:</p>
                <p className={styles.order_page__status__text}>{order.status.toLowerCase()}</p>
            </div>
        </div>
    )
}

export default OrderPage