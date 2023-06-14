import styles from '../styles/aside.module.sass'
import {NavLink} from "react-router-dom";
import {CustomLink} from './CustomLink'

function Aside({currentUser, signOut, accessLevel}) {

    return (
        <div className={styles.aside}>
            <div className={styles.aside__info__container}>
                <p className={`${styles.aside__info__text} ${styles.aside__info__text__name}`}>{currentUser.name}</p>
                <p className={styles.aside__info__text}>{currentUser.role.name}</p>
            </div>
            <hr className={styles.aside__separator}/>
            <div className={styles.aside__nav}>
                <CustomLink to="/dashboard" className={styles.aside__nav__point}>Статистика</CustomLink>
                <CustomLink to="/dashboard/orders" className={styles.aside__nav__point}>Заказы</CustomLink>
                {(accessLevel === 100) && (
                    <CustomLink to="/dashboard/staff" className={styles.aside__nav__point}>Сотрудники</CustomLink>
                )}
            </div>
            <p className={styles.aside__out} onClick={signOut}>Выход</p>
        </div>
    )
}

export default Aside