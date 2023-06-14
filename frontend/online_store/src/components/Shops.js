import React from "react"
import styles from "../styles/shops.module.scss"
import Maps from "./Map";

function Shops() {
    return (
        <section className={styles.about}>
            <h2 className={styles.about__title}>Магазины</h2>
            <Maps />
            <p className={`${styles.about__text} ${styles.about__text__subtitle}`}>Круглосуточный магазин в ТЦ "ВЭЙПАРК".</p>
            <p className={`${styles.about__text}`}>МО, Красногорский район, 71 км МКАД (внешнее кольцо), д. Путилково, 16 А, 1 этаж.</p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}><b>Режим работы:</b> КРУГЛОСУТОЧНО </p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}><b>Телефон:</b> 89035761111</p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}><b>E-mail:</b> info@veldish.ru</p>
            <p className={`${styles.about__text} ${styles.about__text__mid}`}>Добраться до нас на машине:</p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}>Въезд на территорию ТРЦ «ВЭЙПАРК» находится на 71-м км МКАД с внешней стороны, между ул. Свободы и Волоколамским шоссе.</p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}>При движении по внутренней стороне МКАД, необходимо проехать до эстакады на ул.Свободы, сделать разворот на внешнюю сторону МКАД и следовать до поворота с указателем "ВЭЙПАРК"</p>
            <p className={`${styles.about__text} ${styles.about__text__mid}`}>Добраться на общественном транспорте:</p>
            <ul>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>от станции Павшино на рейсовом автобусе №852 до остановки «Птицефабрика»;</p>
                </li>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>от станции метро «Митино» на маршрутном автобусе №892 до остановки «Птицефабрика»;</p>
                </li>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>от станции метро «Тушинская» на маршрутном такси № 326 до остановки «Птицефабрика»;</p>
                </li>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>от станции «Химки» на рейсовом автобусе №26 до остановки «Птицефабрика»;</p>
                </li>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>от станции метро «Волоколамская» на рейсовом автобусе №26 К до остановки «Птицефабрика».</p>
                </li>
            </ul>

            <p className={`${styles.about__text} ${styles.about__text__subtitle} ${styles.about__text__subtitle__mid_padding}`}>Магазин на рынке "Садовод".</p>
            <p className={`${styles.about__text}`}>МКАД, 14-й километр, 10, стр. 1</p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}><b>Режим работы:</b> 06:00 - 18:30 </p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}><b>Телефон:</b> 89035761111</p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}><b>E-mail:</b> info@veldish.ru</p>
            <p className={`${styles.about__text} ${styles.about__text__mid}`}>Добраться до нас на машине:</p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}>С севера по внутренней стороне МКАД. Не доезжая развязки необходимо свернуть на съезд в сторону ул. Верхние Поля. Далее необходимо двигаться все время прямо, рынок Садовод будет по левую руку. Держимся правой полосы, разворачиваемся, едем в обратном направлении и уже тогда сможем заехать на рынок.</p>
            <p className={`${styles.about__text} ${styles.about__text__mid}`}>Добраться на общественном транспорте:</p>
            <ul>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>от станции «Котельники» на маршрктном автобусе №315к, №954к, №870к, №1121, №1074, №470 до остановки ТЦ "Садовод";</p>
                </li>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>от станции метро «Люблино» на маршрутном автобусе №518к, №315к, №1121, №553к, до остановки ТЦ "Садовод";</p>
                </li>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>от станции метро «Братиславская» на маршрктном автобусе №943к, №1207к, №942, №10, №965 до остановки ТЦ "Садовод";</p>
                </li>
                <li className={styles.about__list}>
                    <p className={`${styles.about__text} ${styles.about__text__list}`}>от станции «Жулебино» на маршрктном автобусе №315к, №1074, №470, №436 до остановки ТЦ "Садовод";</p>
                </li>
            </ul>

            <p className={`${styles.about__text} ${styles.about__text__subtitle} ${styles.about__text__subtitle__mid_padding}`}>Магазин в городе Гусь-Хрустальный на стекольном рынке.</p>
            <p className={`${styles.about__text}`}>Владимирская область, Гусь-Хрустальный, улица Рудницкой, 10</p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}><b>Режим работы:</b> 08:00 - 18:00 </p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}><b>Телефон:</b> 89035761111</p>
            <p className={`${styles.about__text} ${styles.about__text__small_padding}`}><b>E-mail:</b> info@veldish.ru</p>
        </section>
    );
}

export default Shops;
