import React from "react"
import shortid from "shortid"

import { categoryCards } from "../utils/categoryCards"

import styles from "../styles/footer.module.scss"


function Footer() {
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
                        <h2 className={styles.footer__info__list__title}>Категории</h2>
                        <div className={styles.footer__info__list__category}>
                            <ul className={styles.footer__info__list__points}>
                                {categoryCards.slice(0, 3).map(item => {
                                    return <li key={shortid.generate()} className={styles.footer__info__list__point}>{item.title}</li>
                                })}
                            </ul>
                            <ul className={styles.footer__info__list__points}>
                                {categoryCards.slice(3.4).map(item => {
                                    return <li key={shortid.generate()} className={styles.footer__info__list__point}>{item.title}</li>
                                })}
                            </ul>
                        </div>
                    </li>

                    <li className={styles.footer__info__list}>
                        <h2 className={styles.footer__info__list__title}>Информация</h2>
                        <ul className={styles.footer__info__list__points}>
                            <li className={styles.footer__info__list__point}>Каталог</li>
                            <li className={styles.footer__info__list__point}>О нас</li>
                            <li className={styles.footer__info__list__point}>Гарантия</li>
                            <li className={styles.footer__info__list__point}>Магазины</li>
                        </ul>
                    </li>
                </ul>

                <div className={styles.footer__bottom}>
                    <p className={styles.footer__bottom__copywriting}>©2023. Официальный сайт сети «Велдиш»</p>
                    <button className={styles.footer__bottom__privacy}>Политика конфиденциальности</button>
                </div>
            </div >
        </footer >
    );
}

export default Footer;
