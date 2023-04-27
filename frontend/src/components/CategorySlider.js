import React from "react"
import shortid from "shortid"

import CategoryTitle from "./CategoryTitle";
import PreviewCard from "./PreviewCard";

import { goods } from "../utils/goods";

import styles from "../styles/categorySlider.module.scss"

function CategorySlider() {
    var sale__goods = goods.filter(function (item) {
        return item.sale
    })

    var noSale__goods = goods.filter(function (item) {
        return !item.sale
    })

    return (
        <section className={styles.category}>
            <div className={styles.category__slider}>
                <CategoryTitle title="Скидки" />
                <ul className={styles.cards}>
                    {sale__goods.slice(0, 3).map(item => {
                        return <li key={shortid.generate()}><PreviewCard item={item} sale="true" /></li>
                    })}
                </ul>
                <button className={styles.category__slider__button} />
            </div>

            <div className={styles.category__slider}>
                <CategoryTitle title="Посуда, кухонный принадлежности" />
                <ul className={styles.cards}>
                    {noSale__goods.slice(0, 3).map(item => {
                        return <li key={shortid.generate()}><PreviewCard item={item} sale="false" /></li>
                    })}
                </ul>
                <button className={styles.category__slider__button} />
            </div>

            <div className={styles.category__slider}>
                <CategoryTitle title="Бытовая техника для кухни" />
                <ul className={styles.cards}>
                    {noSale__goods.slice(0, 3).map(item => {
                        return <li key={shortid.generate()}><PreviewCard item={item} sale="false" /></li>
                    })}
                </ul>
                <button className={styles.category__slider__button} />
            </div>

            <div className={styles.category__slider}>
                <CategoryTitle title="Бытовая химия" />
                <ul className={styles.cards}>
                    {noSale__goods.slice(0, 3).map(item => {
                        return <li key={shortid.generate()}><PreviewCard item={item} sale="false" /></li>
                    })}
                </ul>
                <button className={styles.category__slider__button} />
            </div>

            <div className={styles.category__slider}>
                <CategoryTitle title="Хозяйственные товары" />
                <ul className={styles.cards}>
                    {noSale__goods.slice(0, 3).map(item => {
                        return <li key={shortid.generate()}><PreviewCard item={item} sale="false" /></li>
                    })}
                </ul>
                <button className={styles.category__slider__button} />
            </div>

            <div className={styles.category__slider}>
                <CategoryTitle title="Товары для дома и дачи" />
                <ul className={styles.cards}>
                    {noSale__goods.slice(0, 3).map(item => {
                        return <li key={shortid.generate()}><PreviewCard item={item} sale="false" /></li>
                    })}
                </ul>
                <button className={styles.category__slider__button} />
            </div>

            <div className={styles.category__slider}>
                <CategoryTitle title="Товары для ухода за собой" />
                <ul className={styles.cards}>
                    {noSale__goods.slice(0, 3).map(item => {
                        return <li key={shortid.generate()}><PreviewCard item={item} sale="false" /></li>
                    })}
                </ul>
                <button className={styles.category__slider__button} />
            </div>
        </section>
    );
}

export default CategorySlider;