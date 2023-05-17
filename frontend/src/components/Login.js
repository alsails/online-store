import React from 'react';
import { useForm } from "../hooks/useForm"
import PopUpWithForm from "./PopUpWithForm";

import styles from "../styles/popUpWithForm.module.scss";

function Login({ onClose, isOpen, handleLogin, register }) {

    const { values, handleChange } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.email || !values.password) {
            return;
        }
        handleLogin(values.email, values.password)
    }

    return (
        <PopUpWithForm
            name='login'
            title="Вход"
            buttonText="Войти"
            registerLink={true}
            register = {register}
            values = {values}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
        >
            <input className={styles.popup__form__input} id="email-input" type="email" name="email" placeholder="Email"
                   required value={values.email || ""} onChange={handleChange}/>
            <input className={styles.popup__form__input}  id="password-input" type="password" name="password" placeholder="Пароль"
                   required value={values.password || ""} onChange={handleChange}/>
        </PopUpWithForm>
    );
}

export default Login;