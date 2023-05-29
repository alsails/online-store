import {useState} from 'react';
import shortid from "shortid"
import {Link, useParams} from 'react-router-dom';

import PreviewCard from "./PreviewCard";

import styles from "../styles/categoryCards.module.scss"
import "../styles/custom_select.scss"
import CategoryTitle from "./CategoryTitle";
import Select from "react-select";

function CategoryCards({categories, goods, sale, onCardLike, currentUser, onLoginPopUpClick, isLoggedIn}) {
    const {categoriesId} = useParams();
    let categoryTitle;
    let necessaryGoods;
    let goodsArray;
    let manufacturers = [];
    let subcategories = [];

    const [selectedManufacturers, setSelectedManufacturers] = useState([])
    const [selectedSubCategories, setSelectedSubCategories] = useState([])
    const [selectedSort, setSelectedSort] = useState('По популярности')

    let sort = [
        {
            label: 'По популярности',
            value: 'По популярности'
        },
        {
            label: 'По возрастанию цены',
            value: 'По возрастанию цены'
        },
        {
            label: 'По убыванию цены',
            value: 'По убыванию цены'
        }
    ];

    const Goods = goods.map(good => {
        const matchingName = sale.find(item => item.good_name._id === good._id);
        if (matchingName) {
            return {...good, new_price: matchingName.new_price};
        } else {
            return good;
        }
    });

    const allGoods = Goods.map(good => {
        const full_price = good.new_price !== undefined ? good.new_price : good.price;
        return { ...good, full_price };
    });

    if (categoriesId !== 'sale') {
        const category = categories.filter((category) => {
            return category._id === categoriesId
        })

        categoryTitle = category.map(item => item.name)
        necessaryGoods = allGoods.filter((good) => {
            return good.category.category._id === categoriesId
        })
    } else {
        categoryTitle = 'Скидки'
        necessaryGoods = allGoods.filter(item => {
            return item.new_price !== undefined
        })
    }

    necessaryGoods.forEach(item => {
        let currentManufacturer = item.manufacturer.name;

        if (!manufacturers.some(manufacturer => manufacturer.label === currentManufacturer)) {
            manufacturers.push({ label: currentManufacturer, value: currentManufacturer });
        }
    })

    necessaryGoods.forEach(item => {
        let currentManufacturer = item.category.subcategory;

        if (!subcategories.some(subcategory => subcategory.label === currentManufacturer)) {
            subcategories.push({ label: currentManufacturer, value: currentManufacturer });
        }
    })

    const getValueManufacturers = () => {
        return manufacturers.filter((c) => selectedManufacturers.includes(c.value))
    }

    const onChangeManufacturers = (newValue) => {
        setSelectedManufacturers(newValue.map(v => v.value))
    }

    const getValueSubCategories = () => {
        return subcategories.filter((c) => selectedSubCategories.includes(c.value))
    }

    const onChangeSubCategories = (newValue) => {
        setSelectedSubCategories(newValue.map(v => v.value))
    }

    const getValueSort = () => {
        return sort.find((c) => c.value === selectedSort)
    }

    const onChangeSort = (newValue) => {
        setSelectedSort(newValue.value)
    }

    if (selectedManufacturers.length === 0) {
        if (selectedSubCategories.length === 0) {
            if (selectedSort === 'По популярности') {
                goodsArray = necessaryGoods
            } else if (selectedSort === 'По возрастанию цены') {
                 goodsArray = necessaryGoods.sort((a, b) => a.full_price - b.full_price);
            } else if (selectedSort === 'По убыванию цены') {
                goodsArray = necessaryGoods.sort((a, b) => b.full_price - a.full_price);
            }
        } else {
            if (selectedSort === 'По популярности') {
                goodsArray = necessaryGoods.filter(item => selectedSubCategories.includes(item.category.subcategory));
            } else if (selectedSort === 'По возрастанию цены') {
                goodsArray = necessaryGoods.filter(item => selectedSubCategories.includes(item.category.subcategory)).sort((a, b) => a.full_price - b.full_price);
            } else if (selectedSort === 'По убыванию цены') {
                goodsArray = necessaryGoods.filter(item => selectedSubCategories.includes(item.category.subcategory)).sort((a, b) => b.full_price - a.full_price);
            }
        }
    }
    else {
        if (selectedSubCategories.length === 0) {
            if (selectedSort === 'По популярности') {
                goodsArray = necessaryGoods.filter(item => selectedManufacturers.includes(item.manufacturer.name));
            } else if (selectedSort === 'По возрастанию цены') {
                goodsArray = necessaryGoods.filter(item => selectedManufacturers.includes(item.manufacturer.name)).sort((a, b) => a.full_price - b.full_price);
            } else if (selectedSort === 'По убыванию цены') {
                goodsArray = necessaryGoods.filter(item => selectedManufacturers.includes(item.manufacturer.name)).sort((a, b) => b.full_price - a.full_price);
            }
        } else {
            if (selectedSort === 'По популярности') {
                goodsArray = necessaryGoods.filter(item => selectedManufacturers.includes(item.manufacturer.name)).filter(item => selectedSubCategories.includes(item.category.subcategory))
            } else if (selectedSort === 'По возрастанию цены') {
                goodsArray = necessaryGoods.filter(item => selectedManufacturers.includes(item.manufacturer.name)).filter(item => selectedSubCategories.includes(item.category.subcategory)).sort((a, b) => a.full_price - b.full_price);
            } else if (selectedSort === 'По убыванию цены') {
                goodsArray = necessaryGoods.filter(item => selectedManufacturers.includes(item.manufacturer.name)).filter(item => selectedSubCategories.includes(item.category.subcategory)).sort((a, b) => b.full_price - a.full_price);
            }
        }
    }

    return (
        <section className={styles.category_cards}>
            <div>
                <CategoryTitle title={categoryTitle} key={shortid.generate()}/>
                <div className={styles.selectors}>
                    <Select
                        classNamePrefix='custom_select'
                        onChange={onChangeManufacturers}
                        value={getValueManufacturers()}
                        options={manufacturers}
                        isMulti={true}
                        placeholder='Выбрать производителя'
                    />
                    <Select
                        classNamePrefix='custom_select'
                        onChange={onChangeSubCategories}
                        value={getValueSubCategories()}
                        options={subcategories}
                        isMulti={true}
                        placeholder='Выбрать подкатегорию'
                    />
                    <Select
                        classNamePrefix='custom_select'
                        onChange={onChangeSort}
                        value={getValueSort()}
                        options={sort}
                        isMulti={false}
                        placeholder='Выбрать подкатегорию'
                    />
                </div>
                <ul className={styles.category_cards__container}>
                    {
                        goodsArray.map(item => {
                            return (
                                <>
                                    <li key={shortid.generate()}>
                                        <PreviewCard onLoginPopUpClick={onLoginPopUpClick} onCardLike={onCardLike} isLoggedIn={isLoggedIn} currentUser={currentUser} onCardLike={onCardLike} item={item}/>
                                    </li>
                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </section>
    );
}

export default CategoryCards;