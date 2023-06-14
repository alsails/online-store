import React, { useState, useEffect } from "react";
import styles from "../styles/carts.module.scss";
import PreviewCart from "./PreviewCart";
import {Link} from "react-router-dom";


function Carts({carts, goods, sale, currentUser, onUpdateQuantity, onDelCart}) {
    const [nothing, setNothing] = useState(false);
    const [allprice, setAllPrice] = useState(0);
    const [sum, setSum] = useState(0);
    const [percentSale, setPercentSale] = useState(0);
    const [salePrice, setSalePrice] = useState(0);

    useEffect(() => {
        updateCarts();
    }, [carts]);

    const Goods = goods.map((good) => {
        const matchingName = sale.find((item) => item.good_name._id === good._id);
        if (matchingName) {
            return { ...good, new_price: matchingName.new_price };
        } else {
            return good;
        }
    });

    const allGood = Goods.map((good) => {
        const full_price = good.new_price !== undefined ? good.new_price : good.price;
        return { ...good, full_price };
    });

    const allGoods = allGood.map((good) => {
        const matchingName = carts.find((item) => item.good._id === good._id);
        if (matchingName) {
            return { ...good, quantity: matchingName.quantity, cart: matchingName._id };
        } else {
            return good;
        }
    });

    const userCarts = carts.filter((cart) => {
        return cart.user._id === currentUser._id;
    });

    useEffect(() => {
        if (userCarts.length === 0) {
            setNothing(true);
        } else {
            setNothing(false);
        }
    }, [userCarts]);

    const needCarts = allGoods.filter((good) => {
        return userCarts.find((item) => item.good._id === good._id);
    });

    const count = userCarts.length;

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

    function updateCarts() {
        let sum = 0;
        let allprice = 0;

        needCarts.forEach((item) => {
            allprice += item.price * item.quantity;
            sum += item.full_price * item.quantity;
        });

        const percentSale = allprice === 0 ? 0 : 100 - (sum * 100) / allprice;
        const salePrice = allprice * percentSale / 100;

        setSum(sum);
        setAllPrice(allprice);
        setPercentSale(percentSale);
        setSalePrice(salePrice);
    }

    const  word = getWordForItems(count)
    const status = true;
    return (
        <div className={styles.carts}>
            <h2 className={styles.carts__title}>Корзина</h2>
            {nothing && <p className={styles.carts__nothing}>Корзина пустая, добавте товар</p>}
            {!nothing && <>
                <div className={styles.carts__container}>
                    <ul className={styles.carts__container__cards}>
                        {
                            needCarts.map(item => {
                                return <li className={styles.carts__container__cards__list}>
                                    <PreviewCart status={status} updateCarts={updateCarts} onDelCart={onDelCart} onUpdateQuantity={onUpdateQuantity} item={item}/>
                                </li>
                            })
                        }
                    </ul>

                    <aside className={styles.carts__container__aside}>
                        <p className={styles.carts__container__aside__title}>Оформление</p>
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
                            <p className={styles.carts__container__aside__result__text}>К оплате</p>
                            <p className={styles.carts__container__aside__result__price}>{sum.toFixed(2)} ₽</p>
                        </div>
                        <Link  to={`/orders`} style={{ textDecoration: 'none' }}>
                            <button className={styles.carts__container__aside__button}>Оформить заказ</button>
                        </Link>
                    </aside>
                </div>
            </>}
        </div>
    );
}

export default Carts;
