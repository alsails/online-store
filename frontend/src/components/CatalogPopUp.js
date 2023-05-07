import React from "react"
import styles from "../styles/catalogPopUp.module.scss";
import {Link} from "react-router-dom";
import shortid from "shortid";

function CatalogPopUp({categories, isOpen, onClose}) {
    const classes = `${styles.popup} ${isOpen ? styles.popup__opened : " "}` // два класса

    return (
        <div className={classes}>
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
    );
}

export default CatalogPopUp;