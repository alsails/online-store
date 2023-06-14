import React, {useEffect, useState} from "react"
import styles from "../styles/search.module.scss"
import SearchPopUp from "./SearchPopUp";
import {useNavigate} from "react-router-dom";

function Search({goods, sale, onSearchPopUpClick, onClose, isOpen}) {
    const navigate = useNavigate();
    let filterCards = []
    const data = goods.map(good => {
        const matchingName = sale.find(item => item.good_name._id === good._id);
        if (matchingName) {
            return {...good, new_price: matchingName.new_price};
        } else {
            return good;
        }
    });

    const [cardsList, setCardsList] = useState(data);
    const [searchTerm, setSearchTerm] = useState('');

    function filterCard(searchText, listOfCards) {
      if(!searchText) {
          onClose();
          return;
      }

      onSearchPopUpClick();
        return filterCards = listOfCards.filter(card => {
            return card.name.toLowerCase().includes(searchText.toLowerCase())
          })
    }

    useEffect(() => {
        const Debounce = setTimeout(() => {
            const filteredCarts = filterCard(searchTerm, data)
            setCardsList(filteredCarts)
        }, 300)

        return () => clearTimeout(Debounce)
    }, [searchTerm])

    function close() {
        onClose();
        setSearchTerm("");
    }

    function handleKeyPress(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            navigate(`/shops/${searchTerm}`)
            setSearchTerm("");
            onClose()
        }
    }

    return (
        <>
            <input
                className={styles.header__search_bar__search}
                value={searchTerm}
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => handleKeyPress(e)}
            />
            {isOpen && <SearchPopUp isOpen={isOpen} onClose={close} cardsList={cardsList}/>}
        </>
    );
}

export default Search;
