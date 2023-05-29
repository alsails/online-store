import styles from "../styles/profile.module.scss"

function Profile({currentUser, onClick}) {
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
                <button className={styles.profile__info__change_button}>Изменить</button>
            </div>

            <div className={styles.profile__orders}>
                <p className={styles.profile__orders__title}>Заказы:</p>
                <ul className={styles.profile__orders__container}>
                    <li className={styles.profile__order_container}>
                        <div className={styles.profile__order_container__info}>
                            <p className={styles.profile__order_container__info__number}>№1103</p>
                            <div className={styles.profile__order_container__info__addition}>
                                <p className={styles.profile__order_container__info__addition__date}>От 21.05.2023</p>
                                <p className={styles.profile__order_container__info__addition__sum}>1500 ₽</p>
                            </div>
                        </div>
                        <p className={styles.profile__order_container__status}>В доставке</p>
                    </li>
                    <li className={styles.profile__order_container}>
                        <div className={styles.profile__order_container__info}>
                            <p className={styles.profile__order_container__info__number}>№1103</p>
                            <div className={styles.profile__order_container__info__addition}>
                                <p className={styles.profile__order_container__info__addition__date}>От 21.05.2023</p>
                                <p className={styles.profile__order_container__info__addition__sum}>1500 ₽</p>
                            </div>
                        </div>
                        <p className={styles.profile__order_container__status}>В доставке</p>
                    </li>
                </ul>
                <button className={styles.profile__orders__button}>История</button>
            </div>

        </div>
    )
}

export default Profile;