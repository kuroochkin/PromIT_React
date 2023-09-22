import { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useReviewService from "../../services/ReviewService";
import './addReview.scss';


const AddReview = () => {

    const {createReview} = useReviewService();

    const navigate = useNavigate();

    const [companyName, setCompanyName] = useState(null);
    const [address, setAddress] = useState(null);
    const [liked, setLiked] = useState(null);
    const [unliked, setUnliked] = useState(null);
    const [comment, setComment] = useState(null);
    const [grade, setGrade] = useState(null);

    const [itsOk, setItsOk] = useState(false);
    const [isRequest, setIsRequest] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();

        setIsRequest(true);

        const data = await createReview({
            companyName,
            address,
            liked,
            unliked,
            comment,
            grade
        });

        console.log(data);

        if (data?.status === 500){
			console.log('Очистка формы')
			e.target.reset(); 
		}
        else {
            setItsOk(true);
        }

        setIsRequest(false);
        navigate(`/home`)
    };

    return (
        <div className="form_container">
            <form onSubmit={handleSubmit}> 
                <div className="text input">
                    <label>
                        <p>Название компании</p>
                        <input type="text" required={true} onChange={e => setCompanyName(e.target.value)}/>
                    </label>
                </div>
                <div className="text input">
                    <label>
                        <p>Адрес компании (необязательно)</p>
                        <input type="text" required={false} onChange={e => setAddress(e.target.value)}/>
                    </label>
                </div>
                <p>Плюсы</p>
                <textarea
                value={liked} 
                required={true}
                onChange={e => setLiked(e.target.value)} 
                />
                <p>Минусы (необязательно)</p>
                <textarea
                value={unliked} 
                onChange={e => setUnliked(e.target.value)} 
                />
                <p>Комментарий</p>
                <textarea
                value={comment} 
                required={true}
                onChange={e => setComment(e.target.value)} 
                />
                <div className="text input">
                    <label>
                        <p>Оценка (от 1 до 5)</p>
                        <input type="number" min="1" max="5" required={true} onChange={e => setGrade(e.target.value)}/>
                    </label>
                </div>
                <div className="button input">
                    <Button variant="contained" size="medium" type="submit">Добавить</Button>
                </div>   
            </form>
        </div>
    )
};

export default AddReview;