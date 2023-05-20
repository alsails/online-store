import React, {useEffect} from "react";
import styles from "../styles/popUpWithForm.module.scss";

function PopUpWithForm({name, title, children, buttonText, isOpen, onClose, onSubmit, registerLink, register}) {
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
                    <h2 className={styles.popup__title}>{title}</h2>
                    <form action="submit" className={styles.popup__form} name={`${name}`} onSubmit={onSubmit}>
                        {children}
                        <button type="submit" className={styles.popup__form__save_button}>{buttonText || 'Обработка...'}</button>
                        {registerLink && <a href="#" onClick={register} className={styles.popup__form__login_link}>
                            Еще не зарегистрированы? Регистрация
                        </a>}
                    </form>
                </div>
        </div>
        </>
    );
}

export default PopUpWithForm;