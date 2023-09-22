import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './appHeader.scss';

const AppHeader = ({setIsAuth}) => {

    const navigate = useNavigate();

    const exit = () => {
        sessionStorage.clear();
        setIsAuth(false);
        navigate("/login");
    }

    return (
        <div className="app_header">
            <span>Отзовик</span>

            <Button variant="contained" size="medium" background="white" type="submit" onClick={() => exit()}>Выход</Button>
        </div>
    )
}

export default AppHeader;