import {
	FaSignInAlt,
	FaHome,
	FaSignOutAlt,
	FaUser,
	FaUserCircle,
	FaLaptop,
	FaBlog,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { reset as subscriptionReset } from "../features/subscription/subscriptionSlice";
import { track } from "@vercel/analytics";

function Header() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.auth);

	const onLogout = () => {
		dispatch(logout());
		dispatch(reset());
		dispatch(subscriptionReset());
		navigate("/");
	};

	const trackLinkClick = (linkName) => {
		track("Header Link Clicked", { name: linkName });
	};

	return (
		<header className='header'>
			<div className='header-left'>
				<div className='logo'>
					<Link to='/' onClick={() => trackLinkClick("Home")}>
						<FaHome /> Home
					</Link>
				</div>
				<div className='logo'>
					<Link to='/dashboard' onClick={() => trackLinkClick("Dashboard")}>
						<FaLaptop /> Dashboard
					</Link>
				</div>
				<div className='logo'>
					<Link to='/posts' onClick={() => trackLinkClick("Posts")}>
						<FaBlog /> Blog
					</Link>
				</div>
			</div>
			<div className='header-right'>
				<ul>
					{user ? (
						<>
							<li>
								<Link to={`/profile`} onClick={() => trackLinkClick("Profile")}>
									<FaUserCircle /> Profile
								</Link>
							</li>
							<li>
								<button className='btn' onClick={onLogout}>
									<FaSignOutAlt />
									Sign Out
								</button>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to='/login' onClick={() => trackLinkClick("Sign In")}>
									<FaSignInAlt /> Sign In
								</Link>
							</li>
							<li>
								<Link to='/register' onClick={() => trackLinkClick("Sign Up")}>
									<FaUser /> Sign Up
								</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</header>
	);
}

export default Header;
