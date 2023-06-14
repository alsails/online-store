import React, {useEffect, useState} from "react"
import styles from "../styles/searchPage.module.scss"
import SearchPopUp from "./SearchPopUp";
import PreviewCard from "./PreviewCard";
import {useParams} from "react-router-dom";

function SearchPage({carts, goods, sale, onCardLike, currentUser, isLoggedIn, onLoginPopUpClick, onCart}) {
    const {searchTerm} = useParams();

    let filterCards = []
    const data = goods.map(good => {
        const matchingName = sale.find(item => item.good_name._id === good._id);
        if (matchingName) {
            return {...good, new_price: matchingName.new_price};
        } else {
            return good;
        }
    });

    function filterCard(searchText, listOfCards) {
        return filterCards = listOfCards.filter(card => {
            return card.name.toLowerCase().includes(searchText.toLowerCase())
        })
    }

    const useGood = filterCard(searchTerm, data)

    return (
        <div className={styles.search_page}>
            <h2 className={styles.search_page__title}> По запросу {searchTerm} найдено:</h2>
            <ul className={styles.search_page__container}>
                {useGood.map(item => {
                    return (
                        <PreviewCard carts={carts} onLoginPopUpClick={onLoginPopUpClick} isLoggedIn={isLoggedIn} currentUser={currentUser} onCardLike={onCardLike} item={item} onCart={onCart}/>
                    )
                })}
            </ul>
        </div>
    );
}

export default SearchPage;
