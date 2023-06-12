import styles from "../styles/Header.module.sass"

function Header({signOut, currentUser}) {
    console.log(currentUser.login)
    return (
        <div className={styles.header}>
            <div className={styles.header__container}>
                <p className={styles.header__container__name}>{currentUser.login}</p>
                <p className={`${styles.header__container__name} ${styles.header__container__out}`} onClick={signOut}>Выйти</p>
            </div>
        </div>
    )
}

export default Header;
