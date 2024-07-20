import React from "react";
import { Link } from "react-router-dom";
import { track } from "@vercel/analytics";

function Home() {
	// URLs for hosted images
	const heroImageURL =
		"https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218079&authkey=%21AFGzAbrOIssUjq8&width=512&height=512";
	const tailoredCoverLetterImageURL =
		"https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218080&authkey=%21AKmqOfKoD9fwt5I&width=384&height=384";
	const dataSecurityImageURL =
		"https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218082&authkey=%21AMGQQGjKVTfaJs8&width=384&height=384";
	const keywordOptimizationImageURL =
		"https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218081&authkey=%21ABLyq1iz4rc7q_I&width=384&height=384";

	// Event tracking for the "Try for Free" button
	const handleTryForFreeClick = () => {
		track("Try for Free Clicked"); // Custom event tracking
	};

	// Event tracking for the "Beat the Bots" button
	const handleBeatTheBotsClick = () => {
		track("Beat the Bots Clicked"); // Custom event tracking
	};

	// Function to track clicks on Yahoo Finance mention
	const trackYahooFinanceClick = () => {
		track("Press Mention Clicked", { outlet: "Yahoo Finance" });
	};

	// Function to track clicks on MarketWatch mention
	const trackMarketWatchClick = () => {
		track("Press Mention Clicked", { outlet: "MarketWatch" });
	};

	// Function to track when users click the area containing the video demo
	const trackVideoDemoClick = () => {
		track("Video Demo Clicked");
	};

	return (
		<div className='home-container'>
			<section className='hero-section'>
				<div className='hero-content'>
					<h1 className='hero-title'>
						Land your dream job with AI Application Assistant!
					</h1>
					<p className='hero-subtitle'>
						Get the job you deserve with AI Application Assistant's tailored
						cover letter and resume creation, reliable email outreach tools for
						networking, professional headshot generation, and more!
					</p>
					<Link
						to='/new-job'
						className='hero-button'
						onClick={handleTryForFreeClick}>
						Try for Free
					</Link>
				</div>
				<div className='hero-image-container'>
					<img
						src={heroImageURL}
						alt='Job seeker with cover letters'
						className='hero-image'
					/>
				</div>
			</section>

			<section className='video-demo-section'>
				<div className='video-wrapper' onClick={trackVideoDemoClick}>
					<iframe
						width='560'
						height='315'
						src='https://www.youtube.com/embed/rTgrsSEL79Q?si=haiI9cV5ow_Le4tn'
						title='YouTube video player'
						frameborder='0'
						allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
						allowfullscreen></iframe>
				</div>
			</section>

			<section className='services'>
				<div className='service'>
					<img
						src={tailoredCoverLetterImageURL}
						alt='Tailored Cover Letters & Resumes'
						className='service-image'
					/>
					<h2 className='service-title'>
						Tailored Cover Letter & Resume Creation
					</h2>
					<p className='service-description'>
						Craft customized cover letters and resumes that perfectly align your
						skills and experiences with the job's specific requirements.
					</p>
				</div>
				<div className='service'>
					<img
						src={keywordOptimizationImageURL}
						alt='Email Outreach Tools'
						className='service-image'
					/>
					<h2 className='service-title'>Reliable Email Outreach Tools</h2>
					<p className='service-description'>
						Identify relevant contacts, find their contact details, and send
						personalized emails to grow your network and increase your chances
						of getting hired.
					</p>
				</div>
				<div className='service'>
					<img
						src={dataSecurityImageURL}
						alt='Professional Headshot Generation'
						className='service-image'
					/>
					<h2 className='service-title'>Professional Headshot Generation</h2>
					<p className='service-description'>
						Generate professional headshots that make a great first impression
						and help you stand out from the competition.
					</p>
				</div>
			</section>

			<section className='press-mentions'>
				<h2>As Featured In</h2>
				<div className='press-logos'>
					<a
						href='https://finance.yahoo.com/news/ai-application-assistant-launches-innovative-133200039.html'
						target='_blank'
						rel='noopener noreferrer'
						onClick={trackYahooFinanceClick}>
						<img
							src='https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218195&authkey=%21ANCR0O1xkw2RoqI&width=1600&height=586'
							alt='Yahoo Finance Logo'
						/>
					</a>
					<a
						href='https://www.marketwatch.com/press-release/ai-application-assistant-launches-innovative-tool-to-empower-job-seekers-and-recruiters-b4ac16a2?mod=search_headline'
						target='_blank'
						rel='noopener noreferrer'
						onClick={trackMarketWatchClick}>
						<img
							src='https://onedrive.live.com/embed?resid=4B1C8510CEF67D18%218197&authkey=%21AD67u8PPQB_cU1U&width=900&height=500'
							alt='MarketWatch Logo'
						/>
					</a>
				</div>
			</section>

			<section className='cta'>
				<h1 className='cta-title'>
					Don't Let Your Application Get Lost in the Shuffle
				</h1>
				<p className='cta-subtext'>
					AI Application Assistant helps you stand out from the crowd and land
					your dream job. Get started today!
				</p>
				<Link
					to='/new-job'
					className='cta-button'
					onClick={handleBeatTheBotsClick}>
					Beat the Bots
				</Link>
			</section>
		</div>
	);
}

export default Home;
