import {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';

import root from "../styles/root.module.scss"
import page from "../styles/page.module.scss"
import Header from "../components/Header";
import CategoryGoods from "../components/CategoryGoods/CategoryGoods";
import CategorySlider from "../components/CategorySlider";
import Footer from "../components/Footer";
import Api from '../utils/Api'
import CategoryCards from "../components/CategoryCards";
import CatalogPopUp from "../components/CatalogPopUp";
import Good from "../components/Good";
import Login from "../components/Login";
import Register from "../components/Register";
import * as auth from "../utils/Auth";

function App() {
    const [categories, setCategories] = useState([])
    const [goods, setGoods] = useState([])
    const [sale, setSale] = useState([])
    const [isCatalogPopUp, setIsCatalogPopUp] = useState(false)
    const [isLoginPopUp, setIsLoginPopUp] = useState(false)
    const [isRegisterPopUp, setIsRegisterPopUp] = useState(false)

    const isOpen = isCatalogPopUp || isLoginPopUp

    // const [userEmail, setUserEmail] = useState("")

    const [isLoggedIn, setLoggedIn] = useState(false)

    const navigate = useNavigate();

    function handleCatalogPopUpClick() {
        setIsCatalogPopUp(true)
    }

    // function handleLoginPopUpClick() {
    //     setIsLoginPopUp(true)
    // }

    function handleRegisterPopUpClick() {
        setIsRegisterPopUp(true)
    }

    function closeAllPopups() {
        setIsCatalogPopUp(false)
        setIsLoginPopUp(false)
        setIsRegisterPopUp(false)
    }

    function login() {
        setIsRegisterPopUp(false)
        setIsLoginPopUp(true)
    }

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) { // навешиваем только при открытии
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

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

    function handleRegister(formValue) {
        auth.signup(formValue)
            .then(() => {
                    navigate('/sign-in', { replace: true });
                }
            )
            .catch((err) => console.log(err))
    }

    function handleLogin(email, password) {
        auth.signin(email, password)
            .then(() => {
                setUserEmail(email)
                setLoggedIn(true)
                navigate('/')
            })
            .catch(err => console.log(err));
    }

    // const handleTokenCheck = () => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         auth.checkToken(token).then((res) => {
    //             if (res) {
    //                 setLoggedIn(true);
    //                 setUserEmail(res.data.email)
    //                 navigate("/", { replace: true })
    //             }
    //         })
    //             .catch(err => {
    //                 console.log(err);
    //             });
    //     }
    // }

    return (
        <div className={root.root}>
            <div className={page.page}>
                <Header onCategoryPopUpClick={handleCatalogPopUpClick} onRegisterPopUpClick={handleRegisterPopUpClick} isLoggedIn={isLoggedIn}/>
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
                                <CategoryCards categories={categories} goods={goods} sale={sale}/>
                            </>
                        }/>
                        <Route path="/good/:goodId" element={
                            <>
                                <Good goods={goods} sale={sale}/>
                            </>
                        }/>
                    </Routes>
                </main>
                <Footer categories={categories}/>
                <CatalogPopUp onClose={closeAllPopups} isOpen={isCatalogPopUp} categories={categories}/>
                <Login onClose={closeAllPopups} isOpen={isLoginPopUp} handleLogin={handleLogin} />
                <Register onClose={closeAllPopups} login={login} isOpen={isRegisterPopUp} handleRegister={handleRegister} />
            </div>
        </div>
    );
}

export default App;
