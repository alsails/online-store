import styles from "../styles/profile.module.scss"
import moment from 'moment';
import {useEffect, useState} from "react";
import {format} from "date-fns";
import {ru} from "date-fns/locale";
import {Link} from "react-router-dom";

function Profile({currentUser, onClick, onChangePopUpClick, order}) {
    const [nothing, setNothing] = useState(false);

    const orders = order.filter(item => {
        return item.user._id === currentUser._id;
    })

    useEffect(() => {
        if (orders.length === 0) {
            setNothing(true);
        } else {
            setNothing(false);
        }
    }, [orders]);

    const sortOrder = orders.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
    });
    return (
        <div className={styles.profile}>
            <div className={styles.profile__header}>
                <h2 className={styles.profile__header__title}>Личный кабинет</h2>
                <p onClick={onClick} className={styles.profile__header__exit}>Выйти</p>
            </div>

            <div className={styles.profile__info}>
                <p className={styles.profile__info__title}>Личные данные:</p>
                <p className={styles.profile__info__data}>{currentUser.name ? currentUser.name : "ФИО"}</p>
                <p className={styles.profile__info__data}>{currentUser.email ? currentUser.email : "Почта"}</p>
                <p className={styles.profile__info__data}>{currentUser.phone_number ? currentUser.phone_number : "Номер телефона"}</p>
                <button onClick={onChangePopUpClick} className={styles.profile__info__change_button}>Изменить</button>
            </div>

            <div className={styles.profile__orders}>
                <p className={styles.profile__orders__title}>Заказы:</p>
                <ul className={styles.profile__orders__container}>
                    {setNothing &&
                        sortOrder.map((item) => {
                            const status = item.status === 'Завершен'
                            let date = new Date(item.date);
                            let formattedDate = ('0' + date.getUTCDate()).slice(-2) + '.' + ('0' + (date.getUTCMonth() + 1)).slice(-2) + '.' + date.getUTCFullYear();
                            return (
                                <Link to={`/orders/${item._id}`} style={{ textDecoration: 'none' }}>
                                    <li className={styles.profile__order_container}>
                                        <div className={styles.profile__order_container__info}>
                                            <p className={`${styles.profile__order_container__info__number} ${status ? styles.profile__order_container__info__number__end : ""}`}>№{String(item.order_number).padStart(4, '0')}</p>
                                            <div className={styles.profile__order_container__info__addition}>
                                                <p className={styles.profile__order_container__info__addition__date}>От {formattedDate}</p>
                                                <p className={`${styles.profile__order_container__info__addition__sum} ${status ? styles.profile__order_container__info__addition__sum__end : ""}`}>{item.total_price} ₽</p>
                                            </div>
                                        </div>
                                        <p className={styles.profile__order_container__status}>{item.status}</p>
                                    </li>
                                </Link>
                            )
                        })
                    }
                    {!setNothing &&
                        <p className={styles.profile__orders__container__nothing}>Вы еще не совершили ни одного заказа</p>
                    }
                </ul>
            </div>

        </div>
    )
}

export default Profile;