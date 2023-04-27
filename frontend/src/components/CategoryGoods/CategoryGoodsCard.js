import React from "react"

import styles from "../../styles/categoryGoods/categoryGoodsCard.module.scss"

function CategoryGoodsCard({name, img}) {
  return (
    <section className={styles.card}>
        <img className={styles.card__img} src={img} alt={name}/>
        <div className={styles.card__info_container}>
            <p className={styles.card__title}>{name}</p>
        </div>
    </section>
  );
}

export default CategoryGoodsCard;