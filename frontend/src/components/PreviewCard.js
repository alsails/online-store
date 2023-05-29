import React from "react"
import {Link, NavLink} from "react-router-dom";

import styles from "../styles/previewCard.module.scss"


function PreviewCard({item, onCardLike, currentUser, isLoggedIn, onLoginPopUpClick}) {
    let status = 'new_price' in item
    const isLiked = item.likes.some(i => {
        return i._id === currentUser._id
    });
    const cardLikeButtonClassName = `${isLiked ? styles.card__top__like__active : styles.card__top__like}`

    function handleLikeClick() {
        onCardLike(item);
    }

    return (
            <div className={styles.card}>
                <div className={styles.card__top}>
                    {isLoggedIn
                        ?
                        <button className={cardLikeButtonClassName} onClick={handleLikeClick}/>
                        :
                        <button className={styles.card__top__like} onClick={onLoginPopUpClick}/>
                    }
                    {status && <p className={styles.card__top__sale}>-{Math.round(100 - ((item.new_price * 100) / item.price))}%</p>}
                </div>
                <Link to={`/good/${item._id}`} style={{ textDecoration: 'none' }}>
                    <img className={styles.card__img} src={item.img} alt={item.name} />
                </Link>
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
    );
}

export default PreviewCard;