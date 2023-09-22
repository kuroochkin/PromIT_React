import useReviewService from "../../services/ReviewService";
import { useState, useEffect } from "react";

import { Button } from "@mui/material";
import './registerForm.scss';

const RegisterForm = ({setToken}) => {

    const {registerUser, error, clearError} = useReviewService();

    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [itsOk, setItsOk] = useState(false);
    const [isRequest, setIsRequest] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        setIsRequest(true);

        const data = await registerUser({
            nickname,
            password,
            isReviewer: true
        });

        console.log(data);

        if (data?.status === 500){
			console.log('Очистка формы')
			e.target.reset(); 
		}
        else {
            setToken(data.token);
            setItsOk(true);
        }

        setIsRequest(false);
    }

    useEffect(() => {
        clearError();
    }, []);

    return (
        <div className="box">
            <form onSubmit={handleSubmit}> 
                <div className="text input">
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
                    <Button variant="contained" size="medium" type="submit">Далее</Button>
                </div>   
            </form>
        </div>
    )
}

export default RegisterForm;