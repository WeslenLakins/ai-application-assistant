import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost, updatePost } from "../features/posts/postSlice";

function UpdatePost() {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { post, isLoading, isError, message } = useSelector(
		(state) => state.post
	);

	// Local state to store the updated post data
	const [title, setTitle] = useState("");
	const [headline, setHeadline] = useState("");
	const [content, setContent] = useState("");

	// Update local state when the post object changes
	useEffect(() => {
		if (post) {
			setTitle(post.title);
			setHeadline(post.headline);
			setContent(post.content);
		}
	}, [post]);

	useEffect(() => {
		if (id) {
			dispatch(getPost(id));
		}
	}, [dispatch, id]);

	const handleTitleChange = (e) => setTitle(e.target.value);
	const handleHeadlineChange = (e) => setHeadline(e.target.value);
	const handleContentChange = (e) => setContent(e.target.value);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updatePost({ id, title, headline, content }));
		navigate(`/posts`);
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error: {message}</div>;

	return (
		<div className='update-post-container'>
			<h2>Edit Post</h2>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						id='title'
						name='title'
						value={title}
						onChange={handleTitleChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='headline'>Headline</label>
					<input
						type='text'
						id='headline'
						name='headline'
						value={headline}
						onChange={handleHeadlineChange}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='content'>Content</label>
					<textarea
						id='content'
						name='content'
						rows='10'
						value={content}
						onChange={handleContentChange}></textarea>
				</div>
				<button type='submit' className='btn'>
					Update Post
				</button>
			</form>
		</div>
	);
}

export default UpdatePost;
