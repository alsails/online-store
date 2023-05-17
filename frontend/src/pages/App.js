import {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';

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
import Profile from "../components/Profile";
import * as auth from "../utils/Auth";
// import ProtectedRouteElement from "../components/ProtectedRoute";
// import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
    const [categories, setCategories] = useState([])
    const [goods, setGoods] = useState([])
    const [sale, setSale] = useState([])
    const [isCatalogPopUp, setIsCatalogPopUp] = useState(false)
    const [isLoginPopUp, setIsLoginPopUp] = useState(false)
    const [isRegisterPopUp, setIsRegisterPopUp] = useState(false)
    const [currentUser, setCurrentUser] = useState({})

    const isOpen = isCatalogPopUp || isLoginPopUp

    const [userInfo, setUserInfo] = useState([])

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
        if (isOpen) {
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
                    login()
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
        function handleTokenCheck() {
            const token = localStorage.getItem('token');
            if (token) {
                auth.checkToken().then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        navigate("/", { replace: true })
                    }
                })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }

        handleTokenCheck();
    }, [navigate])

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         Promise.all([Api.getUserInfo()])
    //             .then(([userData, cards]) => {
    //                 setCurrentUser(userData.data);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    // }, [isLoggedIn]);

    return (
        <div className={root.root}>
            <div className={page.page}>
                {/*<CurrentUserContext.Provider value={currentUser}>*/}
                    {/*<Header onCategoryPopUpClick={handleCatalogPopUpClick} onLoginPopUpClick={handleLoginPopUpClick} isLoggedIn={isLoggedIn}/>*/}
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
                            {/*<Route path="/good/:goodId" element={*/}
                            {/*    <>*/}
                            {/*        <Good goods={goods} sale={sale}/>*/}
                            {/*    </>*/}
                            {/*}/>*/}
                            {/*<Route path="/profile" element={*/}
                            {/*    <>*/}
                            {/*        <ProtectedRouteElement element={Profile} loggedIn={isLoggedIn}/>*/}
                            {/*    </>*/}
                            {/*} />*/}
                        </Routes>
                    </main>
                    <Footer categories={categories}/>
                    <CatalogPopUp onClose={closeAllPopups} isOpen={isCatalogPopUp} categories={categories}/>
                    <Login onClose={closeAllPopups} register={register} isOpen={isLoginPopUp} handleLogin={handleLogin} />
                    <Register onClose={closeAllPopups}  isOpen={isRegisterPopUp} handleRegister={handleRegister} />
                {/*</CurrentUserContext.Provider>*/}
            </div>
        </div>
    );
}

export default App;
