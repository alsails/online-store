import React from "react"
import { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Logo from "../image/logo.png"
import iconLike from "../image/icons/like.svg"
import iconBuy from "../image/icons/buy.svg"
import iconProfile from "../image/icons/profile.svg"

import styles from "../styles/header.module.scss"
import {Link} from "react-router-dom";

function Header({onCategoryPopUpClick, onLoginPopUpClick, isLoggedIn}) {
    const currentUser = useContext(CurrentUserContext);
    console.log(isLoggedIn)
  return (
    <header className={styles.header}>
        <div className={styles.header__container}>
            <div className={styles.header__logo}>
                <Link  to={`/`} style={{ textDecoration: 'none' }}>
                    <img className={styles.header__logo__img} alt="Логотип" src={Logo}/>
                </Link>
            </div>
            <div className={styles.header__search_bar}>
                <button onClick={onCategoryPopUpClick} className={styles.header__search_bar__catalog_button}>Каталог</button>
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
                    {isLoggedIn
                        ?
                        <Link to={`/profile/${currentUser._id}`}><img className={styles.header__menu_icon__img} src={iconProfile} alt="Профиль"/></Link>
                        :
                        <img onClick={isLoggedIn ? " " : onLoginPopUpClick} className={styles.header__menu_icon__img} src={iconProfile} alt="Профиль"/>
                    }
                </li>
            </ul>
        </div>
    </header>
  );
}

export default Header;
