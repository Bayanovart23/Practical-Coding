import React from 'react';
import styles from './Header.module.css';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser} from "../../redux/Slices/LoginPageSlice";
const Header = () => {

    const user = useSelector(state => state.loginPage.login)
    const dispatch = useDispatch();
    const handleLogOut = ()=>{
        dispatch(deleteUser());
        window.scrollTo(0, 0);
    }
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.user}>{user}</h2>
            <button onClick={()=>handleLogOut()} className={styles.btn}>Logout</button>
        </div>
    );
};

export default Header;