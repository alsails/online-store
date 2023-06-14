import styles from '../styles/staff.module.sass'
import {useState} from "react";
import {Link} from "react-router-dom";

function Staff({staff, onDel, handelOpenPopUp}) {
    const staffs = staff.filter(staff => staff.role.name !== 'Администратор');
    const [selectedRole, setSelectedRole] = useState('Все');

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value)
    };

    const filteredStaffs = selectedRole === 'Все' ? staffs : staffs.filter(staff => staff.role.name === selectedRole);

    return (
        <div className={styles.staff_container}>
            <h1 className={styles.staff_container__title}>Сотрудники</h1>

            <div className={styles.staff_container__inputs}>
                <div className={styles.staff_container__inputs__container}>
                    <input className={styles.staff_container__input} type="radio" name="status" id="Все"
                           value="Все" checked={selectedRole === 'Все'}
                           onChange={handleRoleChange}/>
                    <label className={styles.staff_container__lable} htmlFor="Все">Все</label>
                </div>
                <div className={styles.staff_container__inputs__container}>
                    <input className={styles.staff_container__input} type="radio" name="status" id="Отдел сборки заказов"
                           value="Отдел сборки заказов" checked={selectedRole === 'Отдел сборки заказов'}
                           onChange={handleRoleChange}/>
                    <label className={styles.staff_container__lable} htmlFor="Отдел сборки заказов">Отдел сборки заказов</label>
                </div>
                <div className={styles.staff_container__inputs__container}>
                    <input className={styles.staff_container__input} type="radio" name="status" id="Отдел доставки"
                           value="Отдел доставки" checked={selectedRole === 'Отдел доставки'}
                           onChange={handleRoleChange}/>
                    <label className={styles.staff_container__lable} htmlFor="Отдел доставки">Отдел доставки</label>
                </div>
                <div className={styles.staff_container__inputs__container}>
                    <input className={styles.staff_container__input} type="radio" name="status" id="Отдел контроля исполнения заказов"
                           value="Отдел контроля исполнения заказов" checked={selectedRole === 'Отдел контроля исполнения заказов'}
                           onChange={handleRoleChange}/>
                    <label className={styles.staff_container__lable} htmlFor="Отдел контроля исполнения заказов">Отдел контроля исполнения заказов</label>
                </div>
            </div>

            <div className={styles.staff_table__container}>
                <table className={styles.staff_table}>
                    <tr className={styles.staff_table__tr}>
                        <th className={styles.staff_table__th}>Имя</th>
                        <th className={styles.staff_table__th}>Логин</th>
                        <th className={styles.staff_table__th}>Отдел</th>
                        <th className={styles.staff_table__th}>Действие</th>
                    </tr>
                    {
                        filteredStaffs.map((item) => {
                            function handleStaffDel() {
                                onDel(item._id)
                            }

                            return (
                                <tr className={`${styles.staff_table__tr} ${styles.staff_table__tr__data}`}>
                                    <td className={styles.staff_table__td}>{item.name}</td>
                                    <td className={styles.staff_table__td}>{item.login}</td>
                                    <td className={styles.staff_table__td}>{item.role.name}</td>
                                    <td onClick={handleStaffDel} className={`${styles.staff_table__td} ${styles.staff_table__td__block}`}>Удалить</td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
            <button onClick={handelOpenPopUp} className={styles.staff_container__button}>Добавть нового сотрудника</button>
        </div>
    )
}

export default Staff