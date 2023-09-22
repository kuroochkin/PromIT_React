import { Button } from "@mui/material";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

import "./loginForm.scss";

import useReviewService from "../../services/ReviewService";

const LoginForm = ({setToken, setIsAuth}) => {
    const {loginUser, error} = useReviewService();
    const navigate = useNavigate();

    const [nickname, setNickname] = useState();
    const [password, setPassword] = useState();


    const handleSubmit = async e => {
		e.preventDefault();
        
		const data = await loginUser({
			nickname: nickname,
		  	password: password
		});

        console.log(data);

		if (data?.status === 500){
			e.target.reset(); 
		}
		else{
			setToken(data.token);
            console.log(data.token);
			setIsAuth(true);
            console.log(data.typeUser);
            console.log(data.Id);
			if (data.typeUser === 'Reviewer'){
                sessionStorage.setItem('typeUser', 'Reviewer');
                navigate('/home'); 
            }
			else {
                sessionStorage.setItem('typeUser', 'Administrator');
                navigate('/administrator');
            }
		}
	}

    let errorMessage = (
        <div>
            <span style={{'color': '#ffffff', 'font-size': '1em'}}>
                Произошла ошибка
            </span>
        </div>
    )

    errorMessage = error ? errorMessage : null;

    return(
        <div className="box">
            <form onSubmit={handleSubmit}> 
                <div className="input text">
                    <label>
                        <p>Логин</p>
                        <input type="text" onChange={e => setNickname(e.target.value)}/>
                    </label>
                </div>
                <div className="password input">
                    <label>
                        <p>Пароль</p>
                        <input type="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                </div>
                
                <p></p>
                <div className="button input">
                    <Button variant="contained" size="medium" type="submit">Войти!</Button>
                </div>     
                {errorMessage}
            </form>
        </div>
        
    )
}

export default LoginForm;


