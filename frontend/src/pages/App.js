import {useEffect, useState} from 'react';
import { Route, Routes} from 'react-router-dom';

import root from "../styles/root.module.scss"
import page from "../styles/page.module.scss"
import Header from "../components/Header";
import CategoryGoods from "../components/CategoryGoods/CategoryGoods";
import CategorySlider from "../components/CategorySlider";
import Footer from "../components/Footer";
import Api from '../utils/Api'
import CategoryCards from "../components/CategoryCards";

function App() {
    const [categories, setCategories] = useState([])
    const [goods, setGoods] = useState([])
    const [sale, setSale] = useState([])

    useEffect(() => {
        Api.getCategories()
            .then((categories) => {
                setCategories(categories)
            })
            .catch(err => console.log(err))
        Api.getGoods()
            .then((goods) => {
                setGoods(goods)
            })
            .catch(err => console.log(err))
        Api.getSale()
            .then((sale) => {
                setSale(sale)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className={root.root}>
            <div className={page.page}>
                <Header/>
                <main className={page.page__main}>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <CategoryGoods categories={categories}/>
                                <CategorySlider categories={categories} goods={goods} sale={sale}/>
                            </>
                        }/>
                        <Route path="/categories/:categoriesId" element={
                            <>
                                <CategoryGoods categories={categories}/>
                                <CategoryCards categories={categories} goods={goods} sale={sale}/>
                            </>
                        }/>
                    </Routes>
                </main>
                <Footer categories={categories}/>
            </div>
        </div>
    );
}

export default App;
