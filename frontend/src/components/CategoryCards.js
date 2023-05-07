import React from "react"
import shortid from "shortid"
import {Link, useParams} from 'react-router-dom';

import PreviewCard from "./PreviewCard";

import styles from "../styles/categoryCards.module.scss"
import CategoryTitle from "./CategoryTitle";

function CategoryCards({categories, goods, sale}) {
    const { categoriesId } = useParams();
    let categoryTitle;
    let necessaryGoods;

    const allGoods = goods.map(good => {
        const matchingName = sale.find(item => item.good_name.name === good.name);
        if (matchingName) {
            return {...good, new_price: matchingName.new_price};
        } else {
            return good;
        }
    });

    if (categoriesId !== 'sale') {
        const category = categories.filter((category) => {
            return category._id === categoriesId
        })

        categoryTitle = category.map(item => item.name)
        necessaryGoods =  allGoods.filter((good) => {
            return good.category.category._id === categoriesId
        })
    } else {
        categoryTitle = 'Скидки'
        necessaryGoods = sale.map(item => {
            return {_id: item.good_name._id, name: item.good_name.name, img: item.good_name.img, price: item.good_name.price, new_price: item.new_price}
        })
    }

    return (
        <section className={styles.category_cards }>
            <div>
                    <CategoryTitle title={categoryTitle} key={shortid.generate()}/>
                    <ul className={styles.category_cards__container}>
                        {
                            necessaryGoods.map(item => {
                                return (
                                    <>
                                        <Link target="_blank" to={`/good/${item._id}`} style={{ textDecoration: 'none' }}>
                                            <li key={shortid.generate()}>
                                                <PreviewCard item={item}/>
                                            </li>
                                        </Link>
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