import useReviewService from "../../services/ReviewService";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './singleReview.scss';

const SingleReview = () => {

    const {reviewId} = useParams();

    const [data, setData] = useState(null);

    const {getReviewById} = useReviewService();

    useEffect(() => {
        getReviewById(reviewId)
            .then(data => setData(data))
    }, [reviewId]);

    console.log(data);
    
    const renderItems = (data) => {

        return(
            <div class="container">
            <div class="container-1">
            <p>{data.created.slice(0,10) + ' '+ data.created.slice(11,16)}</p>
            <p>{data.reviewer.nickname + ' о компании ' + '"' + data.companyName + '"'}</p>
            <p>ПЛЮСЫ: {data.liked}</p>
            <p>МИНУСЫ: {data.unliked === null ? '-' : data.unliked}</p>
            <p>Комментарий: {data.comment === null ? '-' : data.comment}</p>
            <p>Оценка: {data.grade} из 5</p>
            </div>
          </div>
        )
    }

    let items;
    if(data !== null){
        items = renderItems(data);
    }

    return (
        <div className='orderlist1_container'>
            {data !== null ? items : null}
        </div>
        
    )

}

export default SingleReview;