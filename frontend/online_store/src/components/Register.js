import React from 'react';
import { useForm } from "../hooks/useForm"
import '../index.css'
import styles from "../styles/popUpWithForm.module.scss";
import PopUpWithForm from "./PopUpWithForm";



function Register({onClose, isOpen, handleRegister}) {
    const { values, handleChange } = useForm({});
    const today = new Date();

    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister(values.email, values.password, today)
    }

    return (
        <PopUpWithForm
            name='register'
            title="Регистрация"
            buttonText="Зарегистрироваться"
            registerLink={false}
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

export default Register;