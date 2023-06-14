import React from "react"
import { useState } from 'react';

import styles from "../styles/previewCart.module.scss"


function PreviewCart({item, onUpdateQuantity, onDelCart, updateCarts, status}) {
    const [quantity, setQuantity] = useState(item.quantity);
    const cartId = item.cart

    function plusQuantity() {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onUpdateQuantity({
            _id: cartId,
            quantity: newQuantity
        })
        updateCarts()
    }
    function minusQuantity() {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onUpdateQuantity({
                _id: cartId,
                quantity: newQuantity
            })
            updateCarts()
        } else onDelCart(cartId)
    }
    return (
        <>
            <img src={item.img} className={styles.carts__container__cards__list__img}  alt={item.name}/>
            <div className={styles.carts__container__cards__list__info}>
                <div className={styles.carts__container__cards__list__info__container}>
                    {
                        'new_price' in item && <p className={styles.carts__container__cards__list__info__container__sale}>-{Math.round(100 - ((item.new_price * 100) / item.price))}%</p>
                    }
                    <p className={styles.carts__container__cards__list__info__container__name}>{item.name}</p>
                    { status &&
                        <div className={styles.carts__container__cards__list__info__container__counter}>
                            <button onClick={minusQuantity} className={styles.carts__container__cards__list__info__container__counter__minus}/>
                            <p className={styles.carts__container__cards__list__info__container__counter__count}>{quantity} шт.</p>
                            <button onClick={plusQuantity} className={styles.carts__container__cards__list__info__container__counter__plus}/>
                        </div>
                    }
                </div>
                <div className={styles.carts__container__cards__list__info__prices}>
                    {'new_price' in item && <p className={styles.carts__container__cards__list__info__prices__old}><s>{(item.price * quantity).toFixed(2)} ₽</s></p>}
                    {'new_price' in item && <p className={styles.carts__container__cards__list__info__prices__new}>{(item.new_price * quantity).toFixed(2)} ₽</p>}
                    {!('new_price' in item) && <p className={styles.carts__container__cards__list__info__prices__price}>{(item.price * quantity).toFixed(2)} ₽</p>}
                </div>
            </div>
        </>
    );
}

export default PreviewCart;