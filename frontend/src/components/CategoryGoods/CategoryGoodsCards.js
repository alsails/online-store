import React from "react"
import shortid  from "shortid"

import styles from "../../styles/categoryGoods/categoryGoodsCards.module.scss"
import CategoryGoodsCard from "./CategoryGoodsCard";

function CategoryGoodsCards({categories}) {
    return (
        <section className={styles.cards__container}>
            <ul className={styles.cards}>
                {categories.map((item) => {
                    return <li className="card" key={shortid.generate()}><CategoryGoodsCard name={item.name} img={item.img} /></li>
                }
                )}
            </ul>
        </section>
    );
}

export default CategoryGoodsCards;