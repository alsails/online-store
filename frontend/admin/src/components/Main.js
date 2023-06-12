import styles from "../styles/Main.module.sass"
import Plots from "./Plot";
import Statistics from "./Statistics";

function Main({currentUser, orders}) {
    return (
        <div className={styles.main}>
           <Statistics orders={orders}/>
        </div>
    );
}

export default Main;
