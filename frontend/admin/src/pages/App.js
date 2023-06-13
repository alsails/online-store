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
import Api from "../utils/Api";
import Orders from "../components/Orders";
import Statistics from "../components/Statistics";
import Staff from "../components/Staff";
import OrderPage from "../OrderPage";


function App() {
    const [currentUser, setCurrentUser] = useState({})
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])

    const navigate = useNavigate();

    function handleLogin(login, password) {
        auth.signin(login, password)
            .then(() => {
                setLoggedIn(true)
                navigate('/dashboard')
            })
            .catch(err => console.log(err));
    }

    function changeOrder({_id, status}) {
        Api.changeOrders({_id, status})
            .then((info) => {
                setOrders((prevOrders) => {
                    return prevOrders.map((order) => {
                        if (order._id === info._id) {
                            return {...order, status: info.status};
                        }
                        return order;
                    });
                });
            })
            .catch(err => console.log(err));
    }


    function signOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);

        navigate('/sign-in');
    }

    useEffect(() => {
        function handleTokenCheck() {
            const token = localStorage.getItem('token');
            if (token) {
                auth.checkToken().then((res) => {
                    if (res) {
                        setLoggedIn(true);
                        setCurrentUser(res);
                        navigate("/dashboard", {replace: true})
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
            Api.getUsers()
                .then((users) => {
                    setUsers(users)
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

                        <Route path="/dashboard/*" element={<ProtectedRouteElement element={Main} loggedIn={isLoggedIn} signOut={signOut} currentUser={currentUser}/>}>
                            <Route path="" element={<Statistics users={users} orders={orders}/>} />
                            <Route path="orders" element={<Orders order={orders} changeOrder={changeOrder}/>} />
                            <Route path="order/:orderID" element={<OrderPage order={orders}/>} />
                            <Route path="staff" element={<Staff orders={orders}/>} />
                        </Route>
                    </Routes>
                </CurrentStaffContext.Provider>
            </div>
        </div>
    )
}

export default App