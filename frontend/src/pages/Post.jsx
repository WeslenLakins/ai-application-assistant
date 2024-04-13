import React from "react";
import { getPost } from "../features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Post() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Select the post state from the Redux store
	const { post, isLoading, isError, message } = useSelector(
		(state) => state.post
	);

	// Get admin state from Redux store
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(getPost(id));
	}, [dispatch, id]);

	// Handle loading and error states
	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <div>Error: {message}</div>;
	}

	const handleEdit = () => {
		navigate(`/edit/${id}`);
	};

	// Split the content into paragraphs
	const paragraphs = post.content
		.split("\n")
		.map((paragraph, index) => <p key={index}>{paragraph}</p>);

	return (
		<div className='post-container'>
			{user && user.token && user.isAdmin && (
				<button className='edit-btn' onClick={handleEdit}>
					Edit
				</button>
			)}
			<h2 className='post-title'>{post.title}</h2>
			<div className='post-meta'>
				<span className='post-author'>By {post.author}</span>
				<span className='post-date'>Published on {post.createdAt}</span>
				<span className='post-date'>Updated on {post.updatedAt}</span>
			</div>
			<div className='post-content'>{paragraphs}</div>
		</div>
	);
}

export default Post;
