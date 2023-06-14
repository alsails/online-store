import React from "react"
import styles from "../styles/aboutUs.module.scss"

function AboutUs() {
    return (
        <section className={styles.about}>
            <h2 className={styles.about__title}>О нас</h2>
            <p className={styles.about__text}>Приветствуем Вас на нашем сайте</p>
            <p className={styles.about__text}>Наш магазин — один из крупнейших оптово-розничных центров посуды и бытовой техники, который находится в г. Москве, на 71-м км МКАД, в ТЦ Вэйпарк.</p>
            <p className={styles.about__text}>Ассортимент более 30 000 позиций по самым низким ценам в Москве, удобная система выбора, упаковки и оплаты.</p>
            <p className={`${styles.about__text} ${styles.about__text__bold} ${styles.about__subtitle}`}>Наши преимущества:</p>
            <p className={`${styles.about__text} ${styles.about__text__subtitle}`}>Для оптовиков:</p>
            <ul>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>крупнейший выбор бытовой техники и посуды;</p>
                </li>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>реальные остатки в достаточном количестве всегда в наличии;</p>
                </li>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>большой просторный зал более 2000 кв.м., в котором вы можете посмотреть и там же выбрать товар. Пока вы выбираете товар, мы его собираем и упаковываем. Имеется удобная парковка и погрузка товара;</p>
                </li>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>все производители посуды и бытовой техники в одном месте и, что самое главное, по минимальным ценам. На весь товар есть гарантия и сертификаты;</p>
                </li>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>в нашем магазине представлены такие бренды как: Hoffmann, Maestro, Kamille, Hitt, OMS, Rashel, Interos, Mercury, Pasabahce, Mayer&Boch, Kelli, Centek, Econ, Starwind, Viconte, Zeidan, Luminarc, Daewoo, Duralex, Vissner, Green Point, Zimber, Royal, Ziggler, Tramontina, MiEssa, Domotec, а также Российские производители: Сково ТД Демидовский завод, БИОЛ, КЗМП (г. Кукмор), Алкоа Металлург Рус (г. Белая Калитва), СТАЛЬЭМАЛЬ (г. Череповец), Опытный стекольный завод, АК ЛМЗ (г. Лысьва), КМК (г. Керчь), Аквафор, Барьер, Великие Реки, ЭРА и многие другие.</p>
                </li>
            </ul>
            <p className={`${styles.about__text}`}>Если вы только начинаете бизнес и открываете магазин с ассортиментом посуды и бытовой техники, то приезжайте к нам. Мы охотно проконсультируем, сформируем ассортимент и дадим рекомендации по разным вопросам. У нас есть успешный опыт в помощи открытия магазинов.</p>
            <p className={`${styles.about__text} ${styles.about__text__padding} ${styles.about__text__subtitle}`}>Для розничных покупателей:</p>
            <p className={styles.about__text}>Вы хотите купить товар в большом гипермаркете и по низким ценам?</p>
            <p className={styles.about__text}>Тогда вам надо ехать к нам. Мы работаем КРУГЛОСУТОЧНО каждый день без перерывов и выходных. Наши цены, выбор и обслуживание вас приятно удивят, и вы станете нашим постоянным покупателем</p>
        </section>
    );
}

export default AboutUs;
