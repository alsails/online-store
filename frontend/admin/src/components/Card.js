import styles from '../styles/card.module.sass'


function Card({number, category, img}) {
    let orange = false
    let blue = false
    if (category === 'ЗАКАЗЫ') {
        orange = true
    }
    if (category === 'НОВЫЕ ПОЛЬЗОВАТЕЛИ') {
        blue = true
    }
    return (
        <div className={styles.card_container}>
            <div className={styles.card_container__header}>
                <p className={styles.card_container__category}>{category}</p>
                <img alt='Категория' src={img} className={`${styles.card_container__category__img} ${orange && styles.card_container__category__img__orange} ${blue && styles.card_container__category__img__blue}`}/>
            </div>
            <p className={styles.card_container__price}>{number}</p>
            <p className={styles.card_container__addition}>За последний месяц</p>
        </div>
    )
}

export default Card