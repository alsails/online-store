import {useForm} from "../hooks/useForm";
import styles from "../styles/Login.module.sass"
import {useEffect} from "react";

function Login({handleLogin}) {
    const { values, handleChange } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!values.login || !values.password) {
            return;
        }
        console.log(values.login, values.password)
        handleLogin(values.login, values.password)
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.login_container}>
                <h1 className={styles.login_container__title}>Войдите в аккаунт</h1>
                <form action="submit" onSubmit={handleSubmit} className={styles.login_container__form}>
                    <input className={styles.login_container__form__input}  id="login-input" type="login" name="login" placeholder="Логин"
                            required value={values.login || ""} onChange={handleChange}/>
                    <input className={styles.login_container__form__input}  id="password-input" type="password" name="password" placeholder="Пароль"
                            required value={values.password || ""} onChange={handleChange}/>
                    <button className={styles.login_container__form__button}>Войти</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
