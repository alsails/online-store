import React, {useEffect, useState} from 'react';
import styles from "../styles/orders.module.scss";
import {useForm} from "../hooks/useForm";
import {format} from 'date-fns';
import {ru} from 'date-fns/locale';


function Orders({currentUser, onChangePopUpClick, carts, goods, sale, order, onOrder}) {
    const {values, handleChange} = useForm({});

    const order_number = order.length + 1;

    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [hasErrors, setHasErrors] = useState(false);
    const [addressStatus, setAddressStatus] = useState(false);
    const [errorFields, setErrorFields] = useState([]);

    const Goods = goods.map((good) => {
        const matchingName = sale.find((item) => item.good_name._id === good._id);
        if (matchingName) {
            return {...good, new_price: matchingName.new_price};
        } else {
            return good;
        }
    });

    const allGood = Goods.map((good) => {
        const full_price = good.new_price !== undefined ? good.new_price : good.price;
        return {...good, full_price};
    });

    const allGoods = allGood.map((good) => {
        const matchingName = carts.find((item) => item.good._id === good._id);
        if (matchingName) {
            return {...good, quantity: matchingName.quantity, cart: matchingName._id};
        } else {
            return good;
        }
    });

    const userCarts = carts.filter((cart) => {
        return cart.user._id === currentUser._id;
    });

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

    let sum = 0;
    let allprice = 0;

    needCarts.forEach((item) => {
        allprice += item.price * item.quantity;
        sum += item.full_price * item.quantity;
    });

    const percentSale = allprice === 0 ? 0 : 100 - (sum * 100) / allprice;
    const salePrice = allprice * percentSale / 100;


    const word = getWordForItems(count)

    const handleSubmit = (e) => {
        e.preventDefault();

        const requiredFields = ['city', 'street', 'apartment', 'level'];
        const missingFields = requiredFields.filter(field => !values[field]);

        if (missingFields.length > 0) {
            setHasErrors(true);
            setErrorFields(missingFields);
            return;
        }

        setHasErrors(false)
        if (values.entrance) {
            setAddressStatus(true);
            setAddress(`${values.city}, ${values.street}, подъезд ${values.entrance}, кв. ${values.apartment}, этаж ${values.level}`);
        } else {
            setAddressStatus(true);
            setAddress(`${values.city}, ${values.street},  кв. ${values.apartment}, этаж ${values.level}`);
        }

        if (values.comment) {
            setComment(values.comment)
        }
    }

    const today = new Date();
    today.setDate(today.getDate() + 4);
    const formattedDate = format(today, 'd MMMM', {locale: ru});

    function handelCreateOrder() {
        console.log(comment)
        onOrder({
            order_number: order_number,
            date: today,
            address: address,
            goods: needCarts,
            total_price: sum,
            comment: comment
        }, userCarts)

    }

    return (
        <div className={styles.order}>
            <h2 className={styles.order__title}>Оформление заказа</h2>
            {!addressStatus &&
                <section className={`${styles.order__address} ${styles.order__container}`}>
                    <p className={styles.order__address__title}>Адрес доставки</p>
                    <div className={styles.order__address__container}>
                        <input
                            className={`${styles.order__address__container__input} ${styles.order__address__container__input__city} ${errorFields.includes('city') ? styles.order__address__container__input__error : ''}`}
                            id="city-input" type="text" name="city" placeholder="Город"
                            required value={values.city || ""} onChange={handleChange}/>
                        <input
                            className={`${styles.order__address__container__input} ${styles.order__address__container__input__street} ${errorFields.includes('street') ? styles.order__address__container__input__error : ''}`}
                            id="street-input" type="text" name="street" placeholder="Улица, дом"
                            required value={values.street || ""} onChange={handleChange}/>
                        <input
                            className={`${styles.order__address__container__input} ${styles.order__address__container__input__addition} ${errorFields.includes('apartment') ? styles.order__address__container__input__error : ''}`}
                            id="apartment-input" type="text" name="apartment" placeholder="Квартира"
                            required value={values.apartment || ""} onChange={handleChange}/>
                        <input
                            className={`${styles.order__address__container__input} ${styles.order__address__container__input__addition} `}
                            id="entrance-input" type="text" name="entrance" placeholder="Подъезд"
                            value={values.entrance || ""} onChange={handleChange}/>
                        <input
                            className={`${styles.order__address__container__input} ${styles.order__address__container__input__addition} ${errorFields.includes('level') ? styles.order__address__container__input__error : ''}`}
                            id="level-input" type="text" name="level" placeholder="Этаж"
                            required value={values.level || ""} onChange={handleChange}/>
                        <input
                            className={`${styles.order__address__container__input} ${styles.order__address__container__input__comment}`}
                            id="comment-input" type="text" name="comment" placeholder="Комментарий для курьера"
                            value={values.comment || ""} onChange={handleChange}/>
                        <div className={styles.order__address__container__bottom}>
                            <button onClick={handleSubmit} className={styles.order__address__container__button}>Далее
                            </button>
                            {hasErrors &&
                                <p className={styles.order__address__container__bottom__error}>Обязательные поля не
                                    заполнены</p>}
                        </div>
                    </div>
                </section>
            }
            {addressStatus &&
                <>
                    <section className={`${styles.order__address__container__complite} ${styles.order__container}`}>
                        <p className={styles.order__address__container__complite__title}>Доставит курьер</p>
                        <p className={styles.order__address__container__complite__info}>Стандартная доставка - 0 ₽</p>
                        <p className={styles.order__address__container__complite__info}>{address}</p>
                        <p className={styles.order__address__container__complite__info}>Ожидаемая дата доставки, {formattedDate}, 09:00
                            - 22:00</p>
                    </section>

                    <section className={`${styles.order__container} ${styles.order__payment}`}>
                        <p className={styles.order__payment__title}>Способ оплаты</p>
                        <input className={styles.order__payment__input} checked type="radio" name="payment" id="cash"
                               value="cash"/>
                        <label className={styles.order__payment__lable} for="cash">Наличными или картой при
                            получение</label>
                    </section>

                    <section className={`${styles.order__container} ${styles.order__buyer}`}>
                        <p className={styles.order__buyer__title}>Получатель</p>
                        <div className={styles.order__buyer__container}>
                            <div className={styles.order__buyer__container__info}>
                                <p className={styles.order__buyer__container__info__text}>Имя и фамилия</p>
                                <p className={styles.order__buyer__container__info__text}>Номер телефона</p>
                            </div>
                            <div className={styles.order__buyer__container__data}>
                                <p className={styles.order__buyer__container__data__text}>{currentUser.name}</p>
                                <p className={styles.order__buyer__container__data__text}>{currentUser.phone_number}</p>
                                <p onClick={onChangePopUpClick}
                                   className={styles.order__buyer__container__data__link}>Изменить данные</p>
                            </div>
                        </div>
                    </section>

                    <section className={`${styles.order__container} ${styles.order__decoration}`}>
                        <p className={styles.order__decoration__title}>Оформление</p>
                        <div className={styles.order__decoration__container}>
                            <div className={styles.order__decoration__container__first_column}>
                                <div className={styles.order__decoration__container__first_column__info}>
                                    <p className={styles.order__decoration__container__first_column__info__text}>{count} {word}</p>
                                    <p className={styles.order__decoration__container__first_column__info__text}>{allprice.toFixed(2)} ₽</p>
                                </div>
                                <div className={styles.order__decoration__container__first_column__info}>
                                    <p className={styles.order__decoration__container__first_column__info__text}>Скидка {Math.ceil(percentSale)}%</p>
                                    <p className={styles.order__decoration__container__first_column__info__text}>{salePrice.toFixed(2)} ₽</p>
                                </div>
                                <div className={styles.order__decoration__container__first_column__info}>
                                    <p className={styles.order__decoration__container__first_column__info__text}>Доставка</p>
                                    <p className={styles.order__decoration__container__first_column__info__text}>0 ₽</p>
                                </div>
                            </div>

                            <div className={styles.order__decoration__container__second_column}>
                                <div className={styles.order__decoration__container__second_column__info}>
                                    <p className={styles.order__decoration__container__second_column__info__text}>Итого</p>
                                    <p className={styles.order__decoration__container__second_column__info__price}>{sum.toFixed(2)} ₽</p>
                                </div>
                                <button onClick={handelCreateOrder} className={styles.order__decoration__container__second_column__button}>Оформить</button>
                            </div>

                            <div className={styles.order__decoration__container__third_column}>
                                <p className={styles.order__decoration__container__third_column__text}>Продолжая оформление заказа, я соглашаюсь с условиями оферты и даю согласие на обработку своих персональных данных.
                                    В соответствии с ФЗ № 54-ФЗ кассовый чек при онлайн-оплате на сайте будет предоставлен в электронном виде на указанный при оформлении заказа номер телефона.</p>
                            </div>
                        </div>
                    </section>
                </>
            }
        </div>
    );
}

export default Orders;