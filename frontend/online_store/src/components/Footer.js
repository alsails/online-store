import React from "react"
import shortid from "shortid"

import styles from "../styles/footer.module.scss"
import {Link} from "react-router-dom";


function Footer({categories}) {
    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <ul className={styles.footer__info}>
                    <li className={styles.footer__info__list}>
                        <h2 className={styles.footer__info__list__title}>Контакты</h2>
                        <ul className={styles.footer__info__list__points}>
                            <li className={styles.footer__info__list__point_contact}>8 (903) 576-11-11</li>
                            <li className={styles.footer__info__list__point_contact}>info@veldish.ru</li>
                        </ul>
                    </li>

                    <li className={styles.footer__info__list}>
                        <h2 className={styles.footer__info__list__title}>Каталог</h2>
                        <div className={styles.footer__info__list__category}>
                            <ul className={styles.footer__info__list__points}>
                                {categories.slice(0, 3).map(item => {
                                    return <Link to={`/categories/${item._id}`} style={{ textDecoration: 'none' }}>
                                        <li key={shortid.generate()} className={styles.footer__info__list__point}>{item.name}</li>
                                    </Link>
                                })}
                            </ul>
                            <ul className={styles.footer__info__list__points}>
                                {categories.slice(3.4).map(item => {
                                    return <Link to={`/categories/${item._id}`} style={{ textDecoration: 'none' }}>
                                        <li key={shortid.generate()} className={styles.footer__info__list__point}>{item.name}</li>
                                    </Link>
                                })}
                            </ul>
                        </div>
                    </li>

                    <li className={styles.footer__info__list}>
                        <h2 className={styles.footer__info__list__title}>Информация</h2>
                        <ul className={styles.footer__info__list__points}>
                            <Link  to={`/about`} style={{ textDecoration: 'none' }}>
                                <li className={styles.footer__info__list__point}>О нас</li>
                            </Link>
                            <Link  to={`/warranty`} style={{ textDecoration: 'none' }}>
                                <li className={styles.footer__info__list__point}>Гарантия</li>
                            </Link>
                            <Link  to={`/shops`} style={{ textDecoration: 'none' }}>
                                <li className={styles.footer__info__list__point}>Магазины</li>
                            </Link>
                        </ul>
                    </li>
                </ul>

                <div className={styles.footer__bottom}>
                    <p className={styles.footer__bottom__copywriting}>©2023. Официальный сайт сети «ВЕЛДИШ»</p>
                    <Link  to={`/privacy`} style={{ textDecoration: 'none' }}>
                        <button className={styles.footer__bottom__privacy}>Политика конфиденциальности</button>
                    </Link>
                </div>
            </div >
        </footer >
    );
}

export default Footer;
