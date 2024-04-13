import React from "react";
import DomainSearch from "../components/DomainSearch";

function NetworkingPro() {
	return (
		<div className='hunter-tools'>
			<section className='heading'>
				<h1>Connect Pro</h1>
				<p>
					Introducing ConnectPro - your strategic advantage in professional
					networking and recruitment. Below, find a step-by-step guide on how to
					leverage the Domain Search feature to connect with industry
					professionals efficiently.
				</p>
			</section>
			{/* Step-by-step guide for using DomainSearch component */}
			<div className='domain-search-guide'>
				<h2>How it Works:</h2>
				<ol>
					<li>
						<strong>Enter the Domain:</strong> Start by entering the domain name
						of the target company into the domain search input field. This is
						the foundational step that triggers the search process.
					</li>
					<li>
						<strong>Select Departments:</strong> For a more focused search, add
						filters to search for contacts within specific departments.
					</li>
					<li>
						<strong>Initiate Search:</strong> Click the 'Search' button to begin
						the search. The system will then query the database for email
						addresses and other contact information associated with the domain
						you provided.
					</li>
					<li>
						<strong>Refine Results:</strong> Use the search bar within the
						search results to narrow down the contacts. You can search for
						specific names, positions, or any relevant detail provided in the
						initial results to find exactly who you are looking for.
					</li>
				</ol>
			</div>

			{/* DomainSearch component */}
			<DomainSearch />
		</div>
	);
}

export default NetworkingPro;
