import React, {useEffect} from "react"
import styles from "../styles/catalogPopUp.module.scss";
import {Link} from "react-router-dom";
import shortid from "shortid";

function CatalogPopUp({categories, isOpen, onClose}) {
    const classes = `${styles.popup} ${isOpen ? styles.popup__opened : " "}` // два класса

    useEffect(() => {
        const popup = document.querySelector('.popup__container')
        function closeByOverlayClick(evt) {
            if (evt.target === evt.currentTarget) {
                onClose();
            }
        }

        if (isOpen) {
            popup.addEventListener('click', closeByOverlayClick);
            return () => {
                popup.removeEventListener('click', closeByOverlayClick);
            };
        }
    }, [isOpen])

    return (
        <div className={classes}>
            <div className='popup__container'>
                <div className={styles.popup__container}>
                    <h2 className={styles.popup__title}>Каталог</h2>
                    <ul className={styles.popup__categories}>
                        {categories.map((item) => {
                            return (
                                <Link onClick={onClose} to={`/categories/${item._id}`} style={{ textDecoration: 'none' }}>
                                    <li className={styles.popup__categories__point} key={shortid.generate()}>{item.name}</li>
                                </Link>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CatalogPopUp;