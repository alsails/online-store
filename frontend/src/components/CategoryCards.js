import React from "react"
import shortid from "shortid"
import { useParams } from 'react-router-dom';

import PreviewCard from "./PreviewCard";

import styles from "../styles/categoryCards.module.scss"
import CategoryTitle from "./CategoryTitle";

function CategoryCards({categories, goods, sale}) {
    const { categoriesId } = useParams();
    const allGoods = goods.map(good => {
        const matchingName = sale.find(item => item.good_name.name === good.name);
        if (matchingName) {
            return {...good, new_price: matchingName.new_price};
        } else {
            return good;
        }
    });

    const category = categories.filter((category) => {
        return category._id === categoriesId
    })

    const categoryTitle = category.map(item => item.name)

    return (
        <section className={styles.category_cards }>
            <div>
                    <CategoryTitle title={categoryTitle} key={shortid.generate()}/>
                    <ul className={styles.category_cards__container}>
                        {
                            allGoods.filter((good) => {
                                return good.category.category._id === categoriesId
                            }).map(item => {
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
            </div>
        </section>
    );
}

export default CategoryCards;