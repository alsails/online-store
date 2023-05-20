import React from "react"
import {Link} from "react-router-dom";

import styles from "../styles/previewCard.module.scss"


function PreviewCard({item}) {
    let status = 'new_price' in item

    return (
        <Link to={`/good/${item._id}`} style={{ textDecoration: 'none' }}>
            <div className={styles.card}>
                <div className={styles.card__top}>
                    <button className={styles.card__top__like} />
                    {status && <p className={styles.card__top__sale}>-{Math.round(100 - ((item.new_price * 100) / item.price))}%</p>}
                </div>
                <img className={styles.card__img} src={item.img} alt={item.name} />
                <p className={styles.card__description}>{item.name}</p>
                <div className={styles.card__bottom}>
                    <div className={styles.card__bottom__prices}>
                        {status && <p className={styles.card__bottom__prices__old}><s>{item.price.toFixed(2)} ₽</s></p>}
                        {status && <p className={styles.card__bottom__prices__new}>{item.new_price.toFixed(2)} ₽</p>}
                        {!status && <p className={styles.card__bottom__prices__price}>{item.price.toFixed(2)} ₽</p>}
                    </div>
                    <button className={styles.card__bottom__buy} />
                </div>
            </div>
        </Link>
    );
}

export default PreviewCard;