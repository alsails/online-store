import React from "react"

import styles from "../styles/previewCard.module.scss"


function PreviewCard({ item, sale }) {
    let status;

    status = sale === "true";

    return (
        <div className={styles.card}>
            <div className={styles.card__top}>
                <button className={styles.card__top__like} />
                {status && <p className={styles.card__top__sale}>{item.sale}</p>}
            </div>
            <img className={styles.card__img} src={item.src} alt={item.title} />
            <p className={styles.card__description}>{item.title}</p>
            <div className={styles.card__bottom}>
                <div className={styles.card__bottom__prices}>
                    {status && <p className={styles.card__bottom__prices__old}><s>{item.oldPrice}</s></p>}
                    {status && <p className={styles.card__bottom__prices__new}>{item.newPrice}</p>}
                    {!status && <p className={styles.card__bottom__prices__price}>{item.price}</p>}
                </div>
                <button className={styles.card__bottom__buy} />
            </div>
        </div>
    );
}

export default PreviewCard;