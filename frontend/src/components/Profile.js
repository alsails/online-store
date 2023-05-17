import { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import styles from "../styles/profile.module.scss"

function Profile() {
    const currentUser = useContext(CurrentUserContext);
    return (
        <div className={styles.profile}>
            <h2 className={styles.profile__title}></h2>

            <div className={styles.profile__info}>
                <p className={styles.profile__info__title}></p>
            </div>
        </div>
    )
}

export default Profile;