import React, {useState} from 'react';
import styles from './Login.module.css'
import {useDispatch} from "react-redux";
import {addUser} from "../../redux/Slices/LoginPageSlice";
const Login = () => {
    const [login, setLogin] = useState('');
    const dispatch = useDispatch();

    const handleLogin = () =>{
        dispatch(addUser(login))
    }

    return (
        <div className={styles.wrapper}>
            <h1> Enter your login:</h1>
            <input value={login} onChange={(e)=> setLogin(e.target.value)} className={styles.input} placeholder={'Enter login...'}/>
            { login && <button onClick={()=>handleLogin()} className={styles.btn}>Login</button>}
        </div>
    );
};

export default Login;