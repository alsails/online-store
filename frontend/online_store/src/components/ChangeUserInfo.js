import React from 'react';
import { useEffect } from "react";
import { useForm } from "../hooks/useForm"
import PopUpWithForm from "./PopUpWithForm";

import styles from "../styles/popUpWithForm.module.scss";

function ChangeUserInfo({ onClose, isOpen, onUpdateUser, currentUser}) {

    const { values, handleChange, setValues } = useForm({});

    useEffect(() => {
        if (isOpen) {
            setValues({
                name: currentUser.name,
                phone: currentUser.phone_number
            });
        }
    }, [isOpen, currentUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.name || !values.phone) {
            return;
        }
        onUpdateUser({
            name: values.name,
            phone_number: values.phone
        })
    }

    return (
        <PopUpWithForm
            name='changeUserInfo'
            title="Изменить данные"
            buttonText="Сохранить"
            registerLink={false}
            values = {values}
            handleChange={handleChange}
            onSubmit={handleSubmit}
            onClose={onClose}
            isOpen={isOpen}
        >
            <input className={styles.popup__form__input} id="name-input" type="name" name="name" placeholder="ФИО"
                   required value={values.name || ""} onChange={handleChange}/>
            <input className={styles.popup__form__input}  id="phone-input" type="phone" name="phone" placeholder="89998887777"
                   required value={values.phone || ""} onChange={handleChange}/>
        </PopUpWithForm>
    );
}

export default ChangeUserInfo;