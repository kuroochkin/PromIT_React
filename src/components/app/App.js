import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import useToken from '../../hooks/useToken';
import './App.css';

import AuthForm from "../authForm/AuthForm";
import ReviewList from "../reviewList/ReviewList";
import SingleReview from "../singleReview/SingleReview";
import AddReview from "../addReview/AddReview";
import AdminReviewList from "../adminReviewList/AdminReviewList";
import AppHeader from "../appHeader/AppHeader";
import DeleteConfirmed from "../deleteConfirmed/DeleteConfirmed";

function App() {

    const {token, setToken } = useToken();
	const [isAuth, setIsAuth] = useState(false);

    if(!token && !isAuth) {
		console.log('Токена нет');
		return (
			<>
				<AuthForm setToken={setToken} setIsAuth={setIsAuth} />
			</>
		)	
	}

	const user = sessionStorage.getItem('typeUser')

	if(user === 'Reviewer'){
		return (
		  <div className="App">
			<AppHeader setIsAuth={setIsAuth}/>
			<div className="sitebackground">
				<Routes>
				  <Route path="/home" element={<ReviewList/>}/>
				  <Route path="/review/:reviewId" element={<SingleReview/>}/>
				  <Route path="/review/addReview" element={<AddReview/>}/>
				  <Route path="/login" element={<AuthForm setToken={setToken} setIsAuth={setIsAuth}/>}/>
				</Routes> 
			</div>
		  </div>
		);
	}
	if(user === 'Administrator'){
		return (
			<div className="App">
				<AppHeader setIsAuth={setIsAuth}/>
			  <div className="sitebackground">
				  <Routes>
					<Route path="/administrator" element={<AdminReviewList/>}/>
					<Route path="/review/:reviewId" element={<SingleReview/>}/>
					<Route path="/review/delete/:reviewId" element={<DeleteConfirmed/>}/>
					<Route path="/login" element={<AuthForm setToken={setToken} setIsAuth={setIsAuth}/>}/>
				  </Routes> 
			  </div>
			</div>
		);
	}
};

export default App;
