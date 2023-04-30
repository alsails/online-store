import React from "react"
import shortid from "shortid"

import CategoryTitle from "./CategoryTitle";
import PreviewCard from "./PreviewCard";

import styles from "../styles/categorySlider.module.scss"

function CategorySlider({categories, goods, sale}) {
    const allGoods = goods.map(good => {
        const matchingName = sale.find(item => item.good_name.name === good.name);
        if (matchingName) {
            return {...good, new_price: matchingName.new_price};
        } else {
            return good;
        }
    });

    return (
        <section className={styles.category}>
            <div>
                {
                    categories.map(item => {
                        return (
                            <>
                                <CategoryTitle title={item.name} key={shortid.generate()}/>
                                <ul className={styles.cards}>
                                    {
                                        allGoods.filter((good) => {
                                            return good.category.category.name === item.name
                                        }).slice(0, 3).map(item => {
                                            return (
                                                <>
                                                        <li key={shortid.generate()}>
                                                            <PreviewCard item={item}/>
                                                        </li>
                                                </>
                                            )
                                        })
                                    }
                                </ul>
                            </>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default CategorySlider;