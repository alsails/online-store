import React from "react"

import Logo from "../image/logo.png"
import iconLike from "../image/icons/like.svg"
import iconBuy from "../image/icons/buy.svg"
import iconProfile from "../image/icons/profile.svg"

import styles from "../styles/header.module.scss"

function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.header__container}>
            <div className={styles.header__logo}>
                <img className={styles.header__logo__img} alt="Логотип" src={Logo}/>
            </div>
            <div className={styles.header__search_bar}>
                <button className={styles.header__search_bar__catalog_button}>Каталог</button>
                <input className={styles.header__search_bar__search}/>
                <button className={styles.header__search_bar__search_button}/>
            </div>
            <ul className={styles.header__menu_icons}>
                <li className={styles.header__menu_icon}>
                    <img className={styles.header__menu_icon__img} src={iconLike} alt="Избранное"/>
                </li>
                <li className={styles.header__menu_icon}>
                    <img className={styles.header__menu_icon__img} src={iconBuy} alt="Корзина"/>
                </li>
                <li className={styles.header__menu_icon}>
                    <img className={styles.header__menu_icon__img} src={iconProfile} alt="Профиль"/>
                </li>
            </ul>
        </div>
    </header>
  );
}

export default Header;
