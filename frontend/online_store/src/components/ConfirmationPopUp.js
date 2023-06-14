import React, {useEffect} from "react";
import styles from "../styles/popUpWithForm.module.scss";
import style from "../styles/сonfirmationPopUp.module.scss";

function ConfirmationPopUp({name, title, children, buttonText, isOpen, onClose, onSubmit, registerLink, register}) {
    const classes = `${styles.popup} ${isOpen ? styles.popup__opened : " "}`

    useEffect(() => {
        function closeByOverlayClick(evt) {
            if (evt.target === evt.target.closest('.popUpWithForm_popup__YDAJS')) {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('click', closeByOverlayClick);
            return () => {
                document.removeEventListener('click', closeByOverlayClick);
            };
        }
    }, [isOpen])

    return (
        <>
            <div className={classes}>
                <div className={styles.popup__container}>
                    <button type="button" id="profile-close" className={styles.popup__container__close_button} onClick={onClose}></button>
                    <h2 className={style.popup__title}>Заказ оформлен!</h2>
                </div>
            </div>
        </>
    );
}

export default ConfirmationPopUp;