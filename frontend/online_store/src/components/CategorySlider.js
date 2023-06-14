import React from "react"
import shortid from "shortid"

import CategoryTitle from "./CategoryTitle";
import PreviewCard from "./PreviewCard";

import styles from "../styles/categorySlider.module.scss"
import {Link} from "react-router-dom";

function CategorySlider({carts, categories, goods, sale, onCardLike, currentUser, isLoggedIn, onLoginPopUpClick, onCart}) {
    const allGoods = goods.map(good => {
        const matchingName = sale.find(item => item.good_name._id === good._id);
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
                        allGoods.filter(item => {
                            return item.new_price !== undefined
                        }).slice(0, 3).map(item => {
                            return(
                                <>
                                    <li key={shortid.generate()}>
                                        <PreviewCard carts={carts} onLoginPopUpClick={onLoginPopUpClick} isLoggedIn={isLoggedIn} currentUser={currentUser} onCardLike={onCardLike} item={item} onCart={onCart}/>
                                    </li>
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
                                                    <li key={shortid.generate()}>
                                                        <PreviewCard carts={carts} onLoginPopUpClick={onLoginPopUpClick} isLoggedIn={isLoggedIn} currentUser={currentUser} onCardLike={onCardLike} item={item} onCart={onCart}/>
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