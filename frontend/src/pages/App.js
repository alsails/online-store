import {useEffect, useState} from 'react';
import root from "../styles/root.module.scss"
import page from "../styles/page.module.scss"
import Header from "../components/Header";
import CategoryGoods from "../components/CategoryGoods/CategoryGoods";
import CategorySlider from "../components/CategorySlider";
import Footer from "../components/Footer";
import Api from '../utils/Api'

function App() {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        Api.getCategories()
            .then((categories) => {
                console.log('getCategories =>', categories.categories)
                setCategories(categories.categories)
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className={root.root}>
            <div className={page.page}>
                <Header/>
                <main className={page.page__main}>
                    <CategoryGoods categories={categories}/>
                    <CategorySlider/>
                </main>
                <Footer/>
            </div>
        </div>
    );
}

export default App;
