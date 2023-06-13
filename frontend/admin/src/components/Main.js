import {Outlet, Route, Routes} from 'react-router-dom';
import styles from '../styles/main.module.sass'
import Aside from "./Aside";
function Main({currentUser, signOut}) {

    return (
        <div className={styles.main_container}>
            <Aside currentUser={currentUser} signOut={signOut}/>
            <Outlet />
        </div>
    )
}

export default Main