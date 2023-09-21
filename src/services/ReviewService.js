import { useHttp } from "../hooks/http.hook";

const useReviewService = () => {

    const {request, error, clearError} = useHttp();
    const _apiBase = 'http://localhost:5288/api/';

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        console.log(JSON.parse(tokenString));
        return JSON.parse(tokenString);
    }

    const getResource = async(url) => {
        return await request(url, 'GET', null, {'Authorization': 'Bearer ' + getToken()});
    }

    const registerUser = async(credentials) => {
        const url = `${_apiBase}auth/register`;
        return await request(url, 'POST', JSON.stringify(credentials), {'Content-Type': 'application/json'});
    }

    const loginUser = async(credentials) => {
        const url = `${_apiBase}auth/login`
        return await request(url, 'POST', JSON.stringify(credentials), {'Content-Type': 'application/json'});
    }

    const createReview = async(data) => {
        const url = `${_apiBase}review/create`;
        return await request(url, 'POST', JSON.stringify(data), {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()})
    }

    const deleteReview = async(data) => {
        const url = `${_apiBase}review/delete`;
        return await request(url, 'POST', JSON.stringify(data), {'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()})
    }

    const getReviewById = async (id) => {
        const res = await getResource(_apiBase + `review/${id}`);
        console.log(res);
        return res;
    }

    const getAllReviews = async () => {
        const res = await getResource(_apiBase + `review/allReviews`);
        return res;
    }

    return(
        error, 
        clearError,
        getToken,
        getResource,
        registerUser,
        loginUser,
        createReview,
        deleteReview,
        getReviewById,
        getAllReviews
    );
};

export default useReviewService;