import { useState, useEffect } from "react";
import { Table, Button ,TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Paper} from "@mui/material";
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import {FaRegNewspaper, FaRegTrashAlt} from 'react-icons/fa';
import useReviewService from "../../services/ReviewService";
import "./adminReviewList.scss";

const AdminReviewList = () => {

    const [dataReviews, setDataReviews] = useState(null);
    const [visibleItems, setVisibleItems] = useState(5);

    const {getAllReviews} = useReviewService();

    const navigate = useNavigate();

    useEffect(() => {
        getAllReviews()
            .then(dataReviews => setDataReviews(dataReviews));
    }, []);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          background: "black",
          color: "white",
          fontSize: 20,
          fontFamily: 'Nunito',
          textAlign: 'center'
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 18,
          fontFamily: 'Nunito',
          textAlign: 'center'
        },
      }));

      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

      const singlePage = (id) => {
        navigate(`/review/${id}`)
        };

        const loadMore = () => {
            setVisibleItems(prevVisibleItems => prevVisibleItems + 5);
          };

        const deleteReview = (id) => {
            navigate(`/review/delete/${id}`);
        };

      const renderItems = (data) => {
        return (
            <>
                <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell align="center">Читать</StyledTableCell>
                            <StyledTableCell align="center">Автор</StyledTableCell>
                            <StyledTableCell align="center">Дата создания</StyledTableCell>
                            <StyledTableCell align="center">О компании</StyledTableCell>
                            <StyledTableCell align="center">Оценка</StyledTableCell>
                            <StyledTableCell align="center">Удалить</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {data.reviews.slice(0, visibleItems).map((review) => (
                            <StyledTableRow>
                                 <StyledTableCell align="center">
                                    <button type="button" onClick={() => singlePage(review.reviewId)} >
                                        <div className="icon">{<FaRegNewspaper/>}</div>
                                    </button>
                                </StyledTableCell>
                                <StyledTableCell align="center">{review.reviewer.nickname}</StyledTableCell>
                                <StyledTableCell align="center">{review.created.slice(0,10) + ' '+ review.created.slice(11,16)}</StyledTableCell>
                                <StyledTableCell align="center">{review.companyName}</StyledTableCell>
                                <StyledTableCell align="center">{review.grade}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <button type="button" onClick={() => deleteReview(review.reviewId)} >
                                        <div className="icon">{<FaRegTrashAlt/>}</div>
                                    </button>
                                </StyledTableCell>
                            </StyledTableRow>))}
                    </TableBody>
                </Table>
            </TableContainer>
            <p></p>
            <Button variant="contained" size="medium" type="submit" onClick={() => loadMore()}>Загрузить еще</Button>
            </>
        )
    }

    let items;
    if(dataReviews !== null){
        items = renderItems(dataReviews);
    }

    return (
        <div className='reviewlist_container'>
            {dataReviews !== null ? items : null}
        </div> 
    )
}

export default AdminReviewList;