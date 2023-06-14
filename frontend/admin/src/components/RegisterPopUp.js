import styles from '../styles/registerPopUp.module.sass'
import "../styles/custom_select.scss"

import {useForm} from "../hooks/useForm";
import {useEffect, useState} from "react";
import Select from "react-select";

function RegisterPopUp({isOpen, onClose, handleRegister}) {
    const [selectedRole, setSelectedRole] = useState()
    const { values, handleChange, setValues } = useForm({});

    let role = [
        {
            label: 'Отдел сборки заказов',
            value: '6488a4de9eaf652d07f96945'
        },
        {
            label: 'Отдел доставки',
            value: '6488a4ec9eaf652d07f96946'
        },
        {
            label: 'Отдел контроля исполнения заказов',
            value: '6488a5069eaf652d07f96947'
        }
    ];

    useEffect(() => {
        function closeByOverlayClick(evt) {
            if (evt.target === evt.target.closest('.registerPopUp_popup__fHhTx')) {
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

    useEffect(() => {
        if (isOpen) {
            setValues({});
        }
    }, [isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.login || !values.password || !values.name) {
            return;
        }
        handleRegister({login: values.login, password: values.password, name: values.name, role: selectedRole})
    }

    const getValueRole = () => {
        return role.find((c) => c.value === selectedRole)
    }

    const onChangeRole = (newValue) => {
        setSelectedRole(newValue.value)
    }

    return (
        <div className={`${styles.popup} ${isOpen ? styles.popup__opened : " "}`}>
            <div className={styles.popup__container}>
                <button type="button" id="profile-close" className={styles.popup__container__close_button} onClick={onClose}></button>
                <h2 className={styles.popup__title}>Создать пользователя</h2>
                <form action="submit" className={styles.popup__form} name="register" onSubmit={handleSubmit}>
                    <input className={styles.popup__form__input} id="name-input" type="name" name="name" placeholder="Имя"
                           required value={values.name || ""} onChange={handleChange}/>
                    <input className={styles.popup__form__input} id="login-input" type="login" name="login" placeholder="Логин"
                           required value={values.login || ""} onChange={handleChange}/>
                    <input className={styles.popup__form__input}  id="password-input" type="password" name="password" placeholder="Пароль"
                           required value={values.password || ""} onChange={handleChange}/>
                    <Select
                        classNamePrefix='custom_select'
                        onChange={onChangeRole}
                        value={getValueRole()}
                        options={role}
                        isMulti={false}
                        placeholder='Выбрать отдел'
                    />
                    <button type="submit" className={styles.popup__form__save_button}>Создать</button>
                </form>
            </div>
        </div>
    )
}

export default RegisterPopUp