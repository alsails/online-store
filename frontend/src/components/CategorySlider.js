import React from "react"
import shortid from "shortid"

import CategoryTitle from "./CategoryTitle";
import PreviewCard from "./PreviewCard";

import styles from "../styles/categorySlider.module.scss"
import {Link} from "react-router-dom";

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
                <Link to={`/categories/sale`} style={{ textDecoration: 'none' }}>
                    <CategoryTitle title='Скидки' />
                </Link>
                <ul className={styles.cards}>
                    {
                        sale.slice(0, 3).map(item => {
                            const info = {_id: item.good_name._id, name: item.good_name.name, img: item.good_name.img, price: item.good_name.price, new_price: item.new_price}
                            return(
                                <>
                                    <Link target="_blank" to={`/good/${info._id}`} style={{ textDecoration: 'none' }}>
                                        <li key={shortid.generate()}>
                                            <PreviewCard item={info}/>
                                        </li>
                                    </Link>
                                </>
                            )
                        })
                    }
                </ul>
                {
                    categories.map(item => {
                        return (
                            <>
                                <Link to={`/categories/${item._id}`} style={{ textDecoration: 'none' }}>
                                    <CategoryTitle title={item.name} key={shortid.generate()}/>
                                </Link>
                                <ul className={styles.cards}>
                                    {
                                        allGoods.filter((good) => {
                                            return good.category.category.name === item.name
                                        }).slice(0, 3).map(item => {
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
                            </>
                        )
                    })
                }
            </div>
        </section>
    );
}

export default CategorySlider;