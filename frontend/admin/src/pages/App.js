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
import OrderPage from "../components/OrderPage";
import RegisterPopUp from "../components/RegisterPopUp";


function App() {
    const [currentUser, setCurrentUser] = useState({})
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [staff, setStaffs] = useState([])
    const [isRegisterPopUp, setRegisterPopUp] = useState(false)
    const [accessLevel, setAccessLevel] = useState()

    const navigate = useNavigate();

    function handelRegisterPopUpOpen() {
        setRegisterPopUp(true)
    }

    function ClosePopUp() {
        setRegisterPopUp(false)
    }

    function handleRegister(formValue) {
        auth.signup(formValue)
            .then((res) => {
                const newStaffMember = res;
                setStaffs(prevStaff => [...prevStaff, newStaffMember]);
                ClosePopUp()
            })
            .catch((err) => {
                console.log(err)
            })
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

        navigate('/');
    }

    function checkAccessLevel(role) {
        if (role === "Администратор") {
            setAccessLevel(100)
        }
        if (role === "Отдел сборки заказов") {
            setAccessLevel(80)
        }
        if (role === "Отдел доставки") {
            setAccessLevel(60)
        }
        if (role === "Отдел контроля исполнения заказов") {
            setAccessLevel(40)
        }
    }

    function handleTokenCheck() {
        const token = localStorage.getItem('token');
        if (token) {
            auth.checkToken().then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setCurrentUser(res);
                    checkAccessLevel(res.role.name)
                    navigate("/dashboard", {replace: true})
                }
            })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    useEffect(() => {
        handleTokenCheck();
    }, [])

    function handleLogin(login, password) {
        auth.signin(login, password)
            .then((res) => {
                handleTokenCheck()
            })
            .catch(err => console.log(err));
    }

    function handleStaffDelete(staff) {
        console.log(staff)
        Api
            .delStaff(staff)
            .then(() => {
                setStaffs((state) =>
                    state.filter(item => item._id !== (staff))
                )
            })
            .catch(err =>
                console.log(err))
    }

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
            Api.getStaffs()
                .then((staffs) => {
                    setStaffs(staffs)
                })
                .catch(err => console.log(err))
        }
    }, [isLoggedIn]);

    return (
        <div className={root.root}>
            <div className={page.page}>
                <CurrentStaffContext.Provider value={currentUser}>
                    <Routes>
                        <Route path="/" element={
                            <main className={page.page__main}>
                                <Login handleLogin={handleLogin}/>
                            </main>
                        }/>

                        <Route path="/dashboard/*"
                               element={<ProtectedRouteElement element={Main} loggedIn={isLoggedIn} signOut={signOut}
                                                               currentUser={currentUser} accessLevel={accessLevel}/>}>
                            <Route path="" element={<Statistics users={users} orders={orders} accessLevel={accessLevel}/>}/>
                            <Route path="orders" element={<Orders order={orders} changeOrder={changeOrder} accessLevel={accessLevel}/>}/>
                            <Route path="orders/:orderID" element={<OrderPage orders={orders} accessLevel={accessLevel}/>}/>
                            <Route path="staff"
                                   element={<Staff handelOpenPopUp={handelRegisterPopUpOpen} onDel={handleStaffDelete}
                                                   staff={staff}/>} />
                        </Route>
                    </Routes>
                </CurrentStaffContext.Provider>
                <RegisterPopUp handleRegister={handleRegister} isOpen={isRegisterPopUp} onClose={ClosePopUp}/>
            </div>
        </div>
    )
}

export default App