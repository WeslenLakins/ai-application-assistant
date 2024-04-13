import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getPosts, getPost, reset } from "../features/posts/postSlice"; // Import getPost
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function Posts() {
	const { posts, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.post
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getPosts());
		return () => {
			dispatch(reset());
		};
	}, [dispatch]);

	const handleReadMore = (id) => {
		dispatch(getPost(id));
		navigate(`/post/${id}`);
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <div>Error: {message}</div>;
	}

	return (
		<div className='blog-posts'>
			<h1>Posts</h1>
			{isSuccess && posts.length > 0 ? (
				posts.map((post) => (
					<div key={post.id} className='post-card'>
						<div className='post-content'>
							<h2 className='post-title'>{post.title}</h2>
							<p className='post-excerpt'>{post.headline}</p>
							<div className='post-info'>
								<span>By {post.author}</span>
								<span>
									Published on {new Date(post.createdAt).toLocaleDateString()}
								</span>
								<button
									className='read-more-btn'
									onClick={() => handleReadMore(post._id)}>
									Read More
								</button>
							</div>
						</div>
					</div>
				))
			) : (
				<p>No posts found.</p>
			)}
		</div>
	);
}

export default Posts;
