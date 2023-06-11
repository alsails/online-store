import React, {useEffect, useState} from "react"
import styles from "../styles/searchPopUp.module.scss"
import {Link} from "react-router-dom";

function SearchPopUp({isOpen, onClose, cardsList}) {
    console.log(cardsList)

    useEffect(() => {
        const popup = document.querySelector('.searchPopUp_popup__1gKkW')
        function closeByOverlayClick(evt) {
            if (evt.target === evt.currentTarget) {
                onClose();
            }
        }

        if (isOpen) {
            popup.addEventListener('click', closeByOverlayClick);
            return () => {
                popup.removeEventListener('click', closeByOverlayClick);
            };
        }
    }, [isOpen])

    const nothing = cardsList.length < 1;

    return (
        <div className={`${styles.popup} ${isOpen ? styles.popup__opened : " "}`}>
            <div className='popup__container'>
                <div className={styles.popup__container}>
                    {nothing &&
                        <p className={styles.popup__container__nothing}>Ничего не найдено</p>
                    }
                    {!nothing &&
                        <ul className={styles.popup__container__cards}>
                            {
                                cardsList.slice(0, 5).map((card) => {
                                    let status = 'new_price' in card
                                    return (
                                        <Link to={`/good/${card._id}`} onClick={onClose} style={{textDecoration: 'none'}}>
                                            <li className={styles.popup__container__card}>
                                                <div className={styles.popup__container__card__info}>
                                                    <img className={styles.popup__container__card__img} src={card.img}
                                                         alt={card.name}/>
                                                    <p className={styles.popup__container__card__text}>{card.name}</p>
                                                </div>
                                                <div>
                                                    {status && <p className={styles.popup__container__card__price__old}>
                                                        <s>{card.price.toFixed(2)} ₽</s></p>}
                                                    {status &&
                                                        <p className={styles.popup__container__card__price__new}>{card.new_price.toFixed(2)} ₽</p>}
                                                    {!status &&
                                                        <p className={styles.popup__container__card__price}>{card.price.toFixed(2)} ₽</p>}
                                                </div>
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchPopUp;
