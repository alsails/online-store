import {useEffect, useState} from "react";
import Login from "../components/Login";
import Main from "../components/Main";

import '../App.css'
import root from "../styles/root.module.sass"
import page from "../styles/page.module.sass"

import * as auth from "../utils/Auth";
import {Route, Routes, useNavigate} from "react-router-dom";
import {CurrentStaffContext} from '../contexts/CurrentStaffContext.js'
import ProtectedRouteElement from "../components/ProtectedRoute";
import Header from "../components/Header";
import Api from "../utils/Api";


function App() {
    const [currentUser, setCurrentUser] = useState({})
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [orders, setOrders] = useState([])

    const navigate = useNavigate();

    function handleLogin(login, password) {
        auth.signin(login, password)
            .then(() => {
                setLoggedIn(true)
                navigate('/')
            })
            .catch(err => console.log(err));
    }

    function signOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);

        navigate('/');
    }

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

    useEffect(() => {
        if (isLoggedIn) {
            Api.getOrders()
                .then((order) => {
                    setOrders(order)
                })
                .catch(err => console.log(err))
        }
    }, [isLoggedIn]);

    return (
        <div className={root.root}>
            <div className={page.page}>
                <CurrentStaffContext.Provider value={currentUser}>
                    <Routes>
                        <Route path="/sign-in" element={
                            <main className={page.page__main}>
                                <Login handleLogin={handleLogin}/>
                            </main>
                        }/>

                        <Route path="/" element={
                            <>
                                <Header signOut={signOut} currentUser={currentUser}/>
                                <main className={page.page__main}>
                                    <ProtectedRouteElement element={Main} loggedIn={isLoggedIn}
                                                           currentUser={currentUser} orders={orders}
                                    />
                                </main>
                            </>
                        }/>
                    </Routes>
                </CurrentStaffContext.Provider>
            </div>
        </div>
    )
}

export default App