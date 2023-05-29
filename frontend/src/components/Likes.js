import styles from "../styles/likes.module.scss"
import {useEffect} from "react";
import Api from "../utils/Api";
import PreviewCard from "./PreviewCard";

function Likes({goods, sale, onCardLike, currentUser, isLoggedIn}) {
    const allGoods = goods.map(good => {
        const matchingName = sale.find(item => item.good_name.name === good.name);
        if (matchingName) {
            return {...good, new_price: matchingName.new_price};
        } else {
            return good;
        }
    });

    return (
        <div className={styles.likes}>
            <h1 className={styles.likes__title}>Избранное</h1>
            <div className={styles.likes__container}>
                {
                    allGoods.filter(item => {
                        return item.likes.some(i => i._id === currentUser._id)
                    }).map(item => {
                    return <PreviewCard isLoggedIn={isLoggedIn} currentUser={currentUser} onCardLike={onCardLike} item={item}/>
                })
                }
            </div>
        </div>
    )
}

export default Likes;