import React from "react"

import Logo from "../image/logo.png"

import styles from "../styles/header.module.scss"
import {Link, NavLink} from "react-router-dom";
import Search from "./Search";

function Header({onCategoryPopUpClick, onLoginPopUpClick, isLoggedIn, currentUser, goods, sale, onSearchPopUpClick, onClose, isOpen}) {
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
                <Search goods={goods} sale={sale} onSearchPopUpClick={onSearchPopUpClick} onClose={onClose} isOpen={isOpen}/>
            </div>
            <ul className={styles.header__menu_icons}>
                <li className={styles.header__menu_icon}>
                    {isLoggedIn
                        ?
                        <NavLink to={`/goods/like`} className={({isActive}) => `${isActive ? styles.header__menu_icon__img__like__active : styles.header__menu_icon__img__like}`}></NavLink>
                        :
                        <div onClick={onLoginPopUpClick} className={styles.header__menu_icon__img__like}/>
                    }
                </li>
                <li className={styles.header__menu_icon}>
                    {isLoggedIn
                        ?
                        <NavLink to={`/carts`} className={({isActive}) => `${isActive ? styles.header__menu_icon__img__cart__active : styles.header__menu_icon__img__cart}`}></NavLink>
                        :
                        <div onClick={onLoginPopUpClick} className={styles.header__menu_icon__img__cart}/>
                    }
                </li>
                <li className={styles.header__menu_icon}>
                    {isLoggedIn
                        ?
                        <NavLink to={`/profile/${currentUser._id}`} className={({isActive}) => `${isActive ? styles.header__menu_icon__img__account__active : styles.header__menu_icon__img__account}`}></NavLink>
                        :
                        <div onClick={onLoginPopUpClick} className={styles.header__menu_icon__img__account}/>
                    }
                </li>
            </ul>
        </div>
    </header>
  );
}

export default Header;
