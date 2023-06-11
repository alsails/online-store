import React from "react";
import {Link, useParams} from "react-router-dom";
import styles from '../styles/Good.module.scss'


function Good({goods, sale, isLoggedIn, onLoginPopUpClick, onCardLike, currentUser, carts, onCart}) {
    const {goodId} = useParams();

    const allGoods = goods.map(good => {
        const matchingName = sale.find(item => item.good_name.name === good.name);
        if (matchingName) {
            return {...good, new_price: matchingName.new_price};
        } else {
            return good;
        }
    });

    const good = allGoods.filter((good) => {
        return good._id === goodId
    })

    const goodExists = carts.some((good) => {
        return good.good._id === goodId;
    });

    console.log(goodExists)

    return (
        <div className={styles.good}>
            {good.map(item => {
                let status = 'new_price' in item

                const isLiked = item.likes.some(i => {
                    return i._id === currentUser._id
                });
                const cardLikeButtonClassName = `${isLiked ? styles.good__card__container__info__card_for_buy__info__like__active : styles.good__card__container__info__card_for_buy__info__like}`

                function handleLikeClick() {
                    onCardLike(item);
                }

                function handelAddCart() {
                    onCart(item._id)
                }
                return (
                    <>
                        <ul className={styles.good__category_bar}>
                            <Link to={`/`} style={{ textDecoration: 'none'}}>
                                <li className={styles.good__category_bar__point}>Главная</li>
                            </Link>
                            <Link to={`/categories/${item.category.category._id}`} style={{ textDecoration: 'none'}}>
                                <li className={styles.good__category_bar__point}>{item.category.category.name}</li>
                            </Link>

                        </ul>
                        <div className={styles.good__card}>
                            <div className={styles.good__card__container}>
                                <img src={item.img} alt={item.name} className={styles.good__card__container__img}/>
                                <div className={styles.good__card__container__info}>
                                    <h1 className={styles.good__card__container__info__title}>{item.name}</h1>
                                    <div className={styles.good__card__container__info__card_for_buy}>
                                        <div className={styles.good__card__container__info__card_for_buy__info}>
                                            {status && <p className={styles.good__card__container__info__card_for_buy__info__new_price}>{item.new_price.toFixed(2)} ₽</p>}
                                            {status && <p className={styles.good__card__container__info__card_for_buy__info__old_price}><s>{item.price.toFixed(2)} ₽</s></p>}
                                            {!status && <p className={styles.good__card__container__info__card_for_buy__info__price}>{item.price.toFixed(2)} ₽</p>}
                                            {isLoggedIn
                                                ?
                                                <button className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                                                :
                                                <button className={styles.good__card__container__info__card_for_buy__info__like} onClick={onLoginPopUpClick}/>
                                            }
                                        </div>
                                        <button onClick={handelAddCart} className={`${styles.good__card__container__info__card_for_buy__buy} ${goodExists ? styles.good__card__container__info__card_for_buy__buy__active : " " }`}>{goodExists ? 'В корзине' : 'В корзину'}</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.good__card__description}>
                                <p className={styles.good__card__description__title}>Описание</p>
                                <p className={styles.good__card__description__text}>{item.description}</p>
                            </div>
                        </div>
                    </>
                )
            })}
                </div>
                );
            }

            export default Good;