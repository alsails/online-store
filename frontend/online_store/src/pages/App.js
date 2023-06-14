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
import Likes from "../components/Likes";
import Carts from "../components/Carts";
import Orders from "../components/Orders";
import ChangeUserInfo from "../components/ChangeUserInfo";
import ConfirmationPopUp from "../components/ConfirmationPopUp";
import Privacy from "../components/Privacy";
import InfoOrder from "../components/InfoOrder";
import AboutUs from "../components/AboutUs";
import Warranty from "../components/Warranty";
import Shops from "../components/Shops";
import SearchPage from "../components/SearchPage";

function App() {
    const [categories, setCategories] = useState([])
    const [goods, setGoods] = useState([])
    const [sale, setSale] = useState([])
    const [isCatalogPopUp, setIsCatalogPopUp] = useState(false)
    const [isLoginPopUp, setIsLoginPopUp] = useState(false)
    const [isChangePopUp, setIsChangePopUp] = useState(false)
    const [isRegisterPopUp, setIsRegisterPopUp] = useState(false)
    const [isConfirmationPopUp, setIsConfirmationPopUp] = useState(false)
    const [isSearchPopUp, setIsSearchPopUp] = useState(false)
    const [currentUser, setCurrentUser] = useState({})
    const [carts, setCarts] = useState([])
    const [orders, setOrders] = useState([])

    const isOpen = isCatalogPopUp || isLoginPopUp

    const [isLoggedIn, setLoggedIn] = useState(false)

    const navigate = useNavigate();

    function bodyHidden() {
        document.body.style.overflow = 'hidden';
    }

    function handleChangeUserInfoClick() {
        setIsChangePopUp(true)
        bodyHidden()
    }

    function handleCatalogPopUpClick() {
        setIsCatalogPopUp(true)
        bodyHidden()
    }

    function handleLoginPopUpClick() {
        setIsLoginPopUp(true)
        bodyHidden()
    }

    function handleConfirmationClick() {
        setIsConfirmationPopUp(true)
        bodyHidden()
    }

    function handleSearchClick() {
        setIsSearchPopUp(true)
        bodyHidden()
    }

    function closeAllPopups() {
        setIsCatalogPopUp(false)
        setIsLoginPopUp(false)
        setIsRegisterPopUp(false)
        setIsChangePopUp(false)
        setIsConfirmationPopUp(false)
        setIsSearchPopUp(false)
        document.body.style.overflow = '';
    }

    function register() {
        setIsRegisterPopUp(true)
        setIsLoginPopUp(false)
        bodyHidden()
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

    function handleRegister(email, password, date) {
        auth.signup(email, password, date)
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

    function handleCardLike(good) {
        const isLiked = good.likes.some(i => i._id === currentUser._id)

        if (!isLiked) {
            Api
                .putLike(good._id, !isLiked)
                .then((newGood) => {
                    setGoods((state) =>
                        state.map((c) => (c._id === good._id ? newGood : c))
                    )
                })
                .catch(err =>
                    console.log(err))
        } else {
            Api
                .delLike(good._id, isLiked)
                .then((newGood) => {
                    setGoods((state) =>
                        state.map((c) => (c._id === good._id ? newGood : c))
                    )
                })
                .catch(err =>
                    console.log(err))
        }
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
            Api.getCarts()
                .then((cart) => {
                    setCarts(cart)
                })
                .catch(err => console.log(err))
            Api.getOrders()
                .then((order) => {
                    setOrders(order)
                })
                .catch(err => console.log(err))
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

    function handleAddGoodToCart(data) {
        Api
            .postCarts(data)
            .then((newCart) => {
                setCarts([newCart, ...carts])
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handlePlaceAnOrder(data, userCarts) {
        Api
            .addOrders(data)
            .then((order) => {
                setOrders([order, ...orders])
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                userCarts.map((cart) => {
                    Api
                        .delCart(cart._id)
                        .then(() => {
                            setCarts((state) =>
                                state.filter(item => item._id !== (cart._id))
                            )
                        })
                    handleConfirmationClick()
                })
            })
        navigate('/');
    }

    function handleChangeQuantity(info) {
        Api
            .changeQuantity(info)
            .then((newInfo) => {
                setCarts((prevCarts) => {
                    return prevCarts.map((cart) => {
                        if (cart._id === info._id) {
                            return {...cart, quantity: info.quantity};
                        }
                        return cart;
                    });
                });
            })
            .catch(err =>
                console.log(err))
    }

    function handleCartDelete(cart) {
        Api
            .delCart(cart)
            .then(() => {
                setCarts((state) =>
                    state.filter(item => item._id !== (cart))
                )
            })
            .catch(err =>
                console.log(err))
    }

    function handleUpdateUser(info) {
        Api
            .changeUserInfo(info)
            .then((newInfo) => {
                setCurrentUser(newInfo)
                closeAllPopups()
            })
            .catch(err =>
                console.log(err))
    }

    return (
        <div className={root.root}>
            <div className={page.page}>
                <Header onCategoryPopUpClick={handleCatalogPopUpClick} onLoginPopUpClick={handleLoginPopUpClick}
                        isLoggedIn={isLoggedIn} currentUser={currentUser} goods={goods} sale={sale} onSearchPopUpClick={handleSearchClick}
                        onClose={closeAllPopups} isOpen={isSearchPopUp}/>
                <main className={page.page__main}>
                    <Routes>
                        <Route path="/" element={
                            <>
                                <CategoryGoods categories={categories}/>
                                <CategorySlider carts={carts} onCart={handleAddGoodToCart} isLoggedIn={isLoggedIn} onCardLike={handleCardLike} onLoginPopUpClick={handleLoginPopUpClick} currentUser={currentUser} categories={categories} goods={goods} sale={sale}/>
                            </>
                        }/>
                        <Route path="/categories/:categoriesId" element={
                            <>
                                <CategoryCards carts={carts} onCart={handleAddGoodToCart} isLoggedIn={isLoggedIn} currentUser={currentUser} onCardLike={handleCardLike} categories={categories} goods={goods} sale={sale}/>
                            </>
                        }/>
                        <Route path="/good/:goodId" element={
                            <>
                                <Good carts={carts} onCart={handleAddGoodToCart} isLoggedIn={isLoggedIn} currentUser={currentUser} onLoginPopUpClick={handleLoginPopUpClick} onCardLike={handleCardLike} goods={goods} sale={sale}/>
                            </>
                        }/>
                        <Route path="/profile/:userId" element={
                            <>
                                <Profile order={orders} onChangePopUpClick={handleChangeUserInfoClick} currentUser={currentUser} onClick={signOut}/>
                            </>
                        }/>
                        <Route path="/goods/like" element={
                            <>
                                <Likes isLoggedIn={isLoggedIn} goods={goods} onLoginPopUpClick={handleLoginPopUpClick} onCardLike={handleCardLike} sale={sale} currentUser={currentUser}/>
                            </>
                        }/>
                        <Route path="/carts" element={
                            <>
                                <Carts onDelCart={handleCartDelete} onUpdateQuantity={handleChangeQuantity} carts={carts} goods={goods} sale={sale} currentUser={currentUser}/>
                            </>
                        }/>
                        <Route path="/carts" element={
                            <>
                                <Carts onDelCart={handleCartDelete} onUpdateQuantity={handleChangeQuantity} carts={carts} goods={goods} sale={sale} currentUser={currentUser}/>
                            </>
                        }/>
                        <Route path="/orders" element={
                            <>
                                <Orders order={orders} onOrder={handlePlaceAnOrder} onChangePopUpClick={handleChangeUserInfoClick}  carts={carts} goods={goods} sale={sale} currentUser={currentUser}/>
                            </>
                        }/>
                        <Route path="/orders/:orderID" element={
                            <>
                                <InfoOrder order={orders} onOrder={handlePlaceAnOrder} onChangePopUpClick={handleChangeUserInfoClick}  carts={carts} goods={goods} sale={sale} currentUser={currentUser}/>
                            </>
                        }/>
                        <Route path="/privacy" element={
                            <>
                                <Privacy />
                            </>
                        }/>
                        <Route path="/about" element={
                            <>
                                <AboutUs />
                            </>
                        }/>
                        <Route path="/warranty" element={
                            <>
                                <Warranty />
                            </>
                        }/>
                        <Route path="/shops" element={
                            <>
                                <Shops />
                            </>
                        }/>
                        <Route path="/shops/:searchTerm" element={
                            <>
                                <SearchPage carts={carts} onCart={handleAddGoodToCart} isLoggedIn={isLoggedIn} currentUser={currentUser} onCardLike={handleCardLike} categories={categories} goods={goods} sale={sale}/>
                            </>
                        }/>
                    </Routes>
                </main>
                <Footer categories={categories}/>
                <CatalogPopUp onClose={closeAllPopups} isOpen={isCatalogPopUp} categories={categories}/>
                <Login onClose={closeAllPopups} isOpen={isLoginPopUp} handleLogin={handleLogin} register={register}/>
                <Register onClose={closeAllPopups} isOpen={isRegisterPopUp} handleRegister={handleRegister}/>
                <ChangeUserInfo currentUser={currentUser} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isOpen={isChangePopUp}/>
                <ConfirmationPopUp onClose={closeAllPopups} isOpen={isConfirmationPopUp}/>
            </div>
        </div>
    )
        ;
}

export default App;
