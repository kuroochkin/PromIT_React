import {useState} from "react";
import LoginForm from "../loginForm/LoginForm.js";
import RegisterForm from "../registerForm/RegisterForm.js";
import './authForm.scss';
import "../style/style.scss";

const AuthForm = ({setToken, setIsAuth}) => {

    const [isLoginForm, setIsLoginForm] = useState(true);

    return (
        <>
        <div className="auth_form__container">
            
               
                <div className="ButtonLogin" disabled={isLoginForm} onClick={() => setIsLoginForm(true)}>Вход</div>
                <div className="ButtonRegister" disabled={!isLoginForm} onClick={() => setIsLoginForm(false)}>Регистрация</div>

            {isLoginForm ? <LoginForm setToken={setToken} setIsAuth={setIsAuth}/> 
            : <RegisterForm setToken={setToken}/>} 
        </div>
        </>
    )
} 

export default AuthForm;