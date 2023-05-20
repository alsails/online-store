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
import Profile from "../components/Profile";

function App() {
    const [categories, setCategories] = useState([])
    const [goods, setGoods] = useState([])
    const [sale, setSale] = useState([])
    const [isCatalogPopUp, setIsCatalogPopUp] = useState(false)
    const [isLoginPopUp, setIsLoginPopUp] = useState(false)
    const [isRegisterPopUp, setIsRegisterPopUp] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    const isOpen = isCatalogPopUp || isLoginPopUp

    const [isLoggedIn, setLoggedIn] = useState(false)

    const navigate = useNavigate();

    function handleCatalogPopUpClick() {
        setIsCatalogPopUp(true)
    }

    function handleLoginPopUpClick() {
        setIsLoginPopUp(true)
    }

    function handleRegisterPopUpClick() {
        setIsRegisterPopUp(true)
    }

    function closeAllPopups() {
        setIsCatalogPopUp(false)
        setIsLoginPopUp(false)
        setIsRegisterPopUp(false)
    }

    function register() {
        setIsRegisterPopUp(true)
        setIsLoginPopUp(false)
    }

    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }

        function closeByOverlayClick(evt) {
            if (evt.target === evt.currentTarget) {
                closeAllPopups();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            };
        }
    }, [isOpen, closeAllPopups])

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
                    closeAllPopups()
                }
            )
            .catch((err) => console.log(err))
    }

    function handleLogin(email, password) {
        auth.signin(email, password)
            .then(() => {
                setLoggedIn(true)
                navigate('/')
                closeAllPopups()
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([Api.getUserInfo()])
                .then(([userData]) => {
                    setCurrentUser(userData);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [isLoggedIn]);

    useEffect(() => {
        function handleTokenCheck() {
            const token = localStorage.getItem('token');
            if (token) {
                auth.checkToken().then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setCurrentUser(res);
                        navigate("/", {replace: true})
                    }
                })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }

        handleTokenCheck();
    }, [])

    function signOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);

        navigate('/');
    }

    return (
        <div className={root.root}>
            <div className={page.page}>
                <Header onCategoryPopUpClick={handleCatalogPopUpClick} onLoginPopUpClick={handleLoginPopUpClick}
                        isLoggedIn={isLoggedIn} currentUser={currentUser}/>
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
                        <Route path="/profile/:userId" element={
                            <>
                                <Profile currentUser={currentUser} onClick={signOut}/>
                            </>
                        }/>
                    </Routes>
                </main>
                <Footer categories={categories}/>
                <CatalogPopUp onClose={closeAllPopups} isOpen={isCatalogPopUp} categories={categories}/>
                <Login onClose={closeAllPopups} isOpen={isLoginPopUp} handleLogin={handleLogin} register={register}/>
                <Register onClose={closeAllPopups} isOpen={isRegisterPopUp}
                          handleRegister={handleRegister}/>
            </div>
        </div>
    )
        ;
}

export default App;
