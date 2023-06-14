import React from "react"

import arrow from "../image/icons/arrow.svg"

import styles from "../styles/categoryTitle.module.scss"

function CategoryTitle({title}) {
  return (
    <div className={styles.header}>
          <h2 className={styles.header__title}>{title}</h2>
          <img className={styles.header__arrow} src={arrow} alt="Стрелочка"/>
    </div>
  );
}

export default CategoryTitle;