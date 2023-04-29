import React from "react"
import shortid from "shortid"

import CategoryTitle from "./CategoryTitle";
import PreviewCard from "./PreviewCard";

import styles from "../styles/categorySlider.module.scss"

function CategorySlider({categories}) {
    const nameCategory = [{name: 'Скидки'}]
    const nameCategories = nameCategory.concat(categories)

    return (
        <section className={styles.category}>
            <div className={styles.category__slider}>
                {
                    nameCategories.map(item => {
                        return (
                            <>
                                <CategoryTitle title={item.name} key={shortid.generate()}/>
                                <ul className={styles.cards}>
                                    {sale__goods.slice(0, 3).map(item => {
                                        return (<li key={shortid.generate()}><PreviewCard item={item} sale="true"/></li>)
                                    })}
                                </ul>
                            </>
                        )
                    })
                }
                <button className={styles.category__slider__button} />
            </div>
        </section>
    );
}

export default CategorySlider;