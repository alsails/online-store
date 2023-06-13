import styles from '../styles/orders.module.sass'
import {useEffect, useState} from "react";

function Orders({order, changeOrder}) {
    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('Все');

    useEffect(() => {
        setOrders(order)
    }, [])

    const handleStatusChange = (event, orderId) => {
        const newStatus = event.target.value;
        changeOrder({
            status: event.target.value,
            _id: orderId
        })

        setOrders(prevOrders => {
            const updatedOrders = prevOrders.map(order => {
                if (order._id === orderId) {
                    return { ...order, status: newStatus };
                }
                return order;
            });
            return updatedOrders;
        });
    };


    const handleRadioStatusChange = (event) => {
        setSelectedStatus(event.target.value)
    };

    // Фильтрация массива orders в зависимости от выбранного статуса
    const filteredOrders = selectedStatus === 'Все' ? orders : orders.filter(order => order.status === selectedStatus);

    return (
        <div className={styles.orders_container}>
            <p className={styles.orders_container__title}>Заказы</p>

            <div className={styles.orders_container__inputs}>
                <div className={styles.orders_container__inputs__container}>
                    <input className={styles.orders_container__input} type="radio" name="status" id="Все"
                           value="Все" checked={selectedStatus === 'Все'}
                           onChange={handleRadioStatusChange}/>
                    <label className={styles.orders_container__lable} htmlFor="Все">Все</label>
                </div>
                <div className={styles.orders_container__inputs__container}>
                    <input className={styles.orders_container__input} type="radio" name="status" id="Обрабатывается"
                           value="Обрабатывается" checked={selectedStatus === 'Обрабатывается'}
                           onChange={handleRadioStatusChange}/>
                    <label className={styles.orders_container__lable} htmlFor="Обрабатывается">Обрабатываются</label>
                </div>
                <div className={styles.orders_container__inputs__container}>
                    <input className={styles.orders_container__input} type="radio" name="status" id="В сборке"
                           value="В сборке" checked={selectedStatus === 'В сборке'}
                           onChange={handleRadioStatusChange}/>
                    <label className={styles.orders_container__lable} htmlFor="В сборке">В сборке</label>
                </div>
                <div className={styles.orders_container__inputs__container}>
                    <input className={styles.orders_container__input} type="radio" name="status" id="В доставке"
                           value="В доставке" checked={selectedStatus === 'В доставке'}
                           onChange={handleRadioStatusChange}/>
                    <label className={styles.orders_container__lable} htmlFor="В доставке">В доставке</label>
                </div>
                <div className={styles.orders_container__inputs__container}>
                    <input className={styles.orders_container__input} type="radio" name="status" id="Завершен"
                           value="Завершен" checked={selectedStatus === 'Завершен'}
                           onChange={handleRadioStatusChange}/>
                    <label className={styles.orders_container__lable} htmlFor="Завершены">Завершены</label>
                </div>
            </div>

            <div className={styles.orders_table__container}>
                <table className={styles.orders_table}>
                    <tr className={styles.orders_table__tr}>
                        <th className={styles.orders_table__th}>Номер заказа</th>
                        <th className={styles.orders_table__th}>Дата</th>
                        <th className={styles.orders_table__th}>Покупатель</th>
                        <th className={styles.orders_table__th}>Сумма</th>
                        <th className={styles.orders_table__th}>Статус</th>
                    </tr>
                    {
                        filteredOrders.map((item) => {
                            let date = new Date(item.date);
                            let formattedDate = ('0' + date.getUTCDate()).slice(-2) + '.' + ('0' + (date.getUTCMonth() + 1)).slice(-2) + '.' + date.getUTCFullYear();

                            return (
                                <tr className={`${styles.orders_table__tr} ${styles.orders_table__tr__data}`}>
                                    <td className={styles.orders_table__td}>№{String(item.order_number).padStart(4, '0')}</td>
                                    <td className={styles.orders_table__td}>{formattedDate}</td>
                                    <td className={styles.orders_table__td}>{item.user.name}</td>
                                    <td className={styles.orders_table__td}>{item.total_price} ₽</td>
                                    <td className={styles.orders_table__td}>
                                        <select
                                            className={styles.orders_table__statusSelect}
                                            value={item.status}
                                            onChange={(event) => handleStatusChange(event, item._id)}
                                        >
                                            <option className={styles.orders_table__statusSelect__option} value="Обрабатывается">Обрабатывается</option>
                                            <option className={styles.orders_table__statusSelect__option} value="В сборке">В сборке</option>
                                            <option className={styles.orders_table__statusSelect__option} value="В доставке">В доставке</option>
                                            <option className={styles.orders_table__statusSelect__option} value="Завершен">Завершен</option>
                                        </select>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        </div>
    )
}

export default Orders