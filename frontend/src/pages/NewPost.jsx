import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPost, reset } from "../features/posts/postSlice";
import Spinner from "../components/Spinner";

function NewPost() {
	const { user } = useSelector((state) => state.auth);
	const { isError, isLoading, isSuccess, message } = useSelector(
		(state) => state.post
	);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [headline, setHeadline] = useState("");
	const [author, setAuthor] = useState("");

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			toast.success(message);
			dispatch(reset());
			navigate("/posts");
		}

		dispatch(reset());
	}, [isError, isSuccess, message, dispatch, navigate]);

	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(createPost({ title, content, headline, author }, user.token));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1>Create New Post</h1>
				<p>Please fill out the form below</p>
			</section>

			<section className='form'>
				<div className='form-group'>
					<form onSubmit={onSubmit}>
						<label htmlFor='author'>Author</label>
						<input
							className='form-group'
							type='text'
							id='author'
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							placeholder='Your name'
						/>

						<label htmlFor='title'>Title</label>
						<input
							className='form-group'
							type='text'
							id='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder='Title of the post'
						/>

						<label htmlFor='headline'>Headline</label>
						<input
							className='form-group'
							type='text'
							id='headline'
							value={headline}
							onChange={(e) => setHeadline(e.target.value)}
							placeholder='Headline of the post'
						/>

						<label htmlFor='content'>Content</label>
						<textarea
							id='content'
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder='Content of the Post'
							className='form-group'></textarea>

						<div className='form-group'>
							<button className='btn btn-block'>Submit</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}

export default NewPost;
