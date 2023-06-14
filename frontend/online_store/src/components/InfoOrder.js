import React, {useEffect, useState} from 'react';
import styles from "../styles/carts.module.scss";
import PreviewCart from "./PreviewCart";
import {Link, useParams} from "react-router-dom";
import {format} from "date-fns";
import {ru} from "date-fns/locale";


function InfoOrder({currentUser, onChangePopUpClick, carts, goods, sale, order, onOrder}) {
    const {orderID} = useParams();
    const status = false;
    let allprice = 0;
    let percentSale = 0;
    let salePrice = 0;
    let sum = 0;


    const thisOrder = order.filter((order) => {
        return order._id === orderID
    })

    function getWordForItems(count) {
        let word = "товар";

        if (count % 10 === 1 && count % 100 !== 11) {
            word = "товар";
        } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
            word = "товара";
        } else {
            word = "товаров";
        }

        return word;
    }


    return (
        <div className={styles.carts}>
            {thisOrder.map((item) => {
                const count = item.goods.length;
                const word = getWordForItems(count);

                const date = new Date(item.date);
                console.log('date', date)
                date.setDate(date.getDate() + 4);
                const formattedDate = format(date, 'd MMMM', {locale: ru});
                return (
                    <>
                        <h2 className={styles.carts__title}>Заказ №{String(item.order_number).padStart(4, '0')}</h2>
                        <div className={styles.carts__container}>
                            <ul className={styles.carts__container__cards}>
                                {
                                    item.goods.map(good => {
                                        allprice += good.price * good.quantity;
                                        sum += good.full_price * good.quantity;
                                        return <li className={styles.carts__container__cards__list}>
                                            <PreviewCart stus={status} item={good}/>
                                        </li>
                                    })
                                }
                            </ul>
                            {percentSale = 100 - (sum * 100) / allprice}
                            {salePrice = allprice * percentSale / 100}
                            <div className={styles.carts__container__column}>
                                <aside className={`${styles.carts__container__aside} ${styles.carts__container__aside__min}`}>
                                    <p className={styles.carts__container__aside__title}>{item.status}</p>
                                    <div className={styles.carts__container__aside__info}>
                                        <div className={styles.carts__container__aside__info__count}>
                                            <p className={styles.carts__container__aside__info__count__text}>{count} {word}</p>
                                            <p className={styles.carts__container__aside__info__count__text}>{allprice.toFixed(2)} ₽</p>
                                        </div>
                                        <div className={styles.carts__container__aside__info__count}>
                                            <p className={styles.carts__container__aside__info__count__text}>Скидка {Math.ceil(percentSale)}%</p>
                                            <p className={styles.carts__container__aside__info__count__text}>{salePrice.toFixed(2)} ₽</p>
                                        </div>
                                    </div>
                                    <div className={styles.carts__container__aside__result}>
                                        <p className={styles.carts__container__aside__result__text}>Итог</p>
                                        <p className={styles.carts__container__aside__result__price}>{sum.toFixed(2)} ₽</p>
                                    </div>
                                </aside>
                                <aside className={`${styles.carts__container__aside} ${styles.carts__container__aside__min} ${styles.carts__container__aside__medium}`}>
                                    <p className={`${styles.carts__container__aside__title} ${styles.carts__container__aside__title__info}`}>Дополнительная информация</p>
                                    <div className={styles.carts__container__aside__info}>
                                        <div className={styles.carts__container__aside__info__count}>
                                            <p className={styles.carts__container__aside__info__count__text}>Дата доставки</p>
                                            <p className={`${styles.carts__container__aside__info__count__text} ${styles.carts__container__aside__info__count__text__date}`}>{formattedDate}</p>
                                        </div>
                                        <div className={styles.carts__container__aside__info__count}>
                                            <p className={styles.carts__container__aside__info__count__text}>Адресс</p>
                                            <p className={`${styles.carts__container__aside__info__count__text} ${styles.carts__container__aside__info__count__text__address}`}>{item.address}</p>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    );
}

export default InfoOrder;