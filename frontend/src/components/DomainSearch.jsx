import React, { useState, useEffect } from "react";
import axios from "axios";

function DomainSearch() {
	const [domain, setDomain] = useState("");
	const [emails, setEmails] = useState([]);
	const [filteredEmails, setFilteredEmails] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [companyInfo, setCompanyInfo] = useState({});
	const [selectedDepartments, setSelectedDepartments] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const departments = [
		"executive",
		"it",
		"finance",
		"management",
		"sales",
		"legal",
		"support",
		"hr",
		"marketing",
		"communication",
		"education",
		"design",
		"health",
		"operations",
	];

	const toggleDepartment = (department) => {
		setSelectedDepartments((prev) =>
			prev.includes(department)
				? prev.filter((dep) => dep !== department)
				: [...prev, department]
		);
	};

	const handleSearch = async () => {
		setLoading(true);
		setError(null);
		setEmails([]);
		setCompanyInfo({});

		if (!domain) {
			setError("Please enter a domain name.");
			setLoading(false);
			return;
		}

		const departmentsQuery = selectedDepartments.join(",");
		try {
			// Replace the direct call with a call to your backend
			const response = await axios.post("/api/domain-search", {
				domain,
				departments: departmentsQuery,
			});
			setEmails(response.data.emails);
			setFilteredEmails(response.data.emails); // Initialize filteredEmails with all emails
			setCompanyInfo(response.data);
		} catch (error) {
			setError("An error occurred while searching the domain.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const results = emails.filter((email) =>
			email.value.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredEmails(results);
	}, [searchQuery, emails]);

	return (
		<div className='domain-search'>
			<h1>Domain Search</h1>
			<input
				className='domain-search-input'
				type='text'
				value={domain}
				onChange={(e) => setDomain(e.target.value)}
				placeholder='Enter a domain name (e.g., stripe.com, google.com, aa.com, etc.)'
			/>
			<div className='department-filters'>
				{departments.map((department) => (
					<label key={department}>
						<input
							type='checkbox'
							checked={selectedDepartments.includes(department)}
							onChange={() => toggleDepartment(department)}
						/>
						{department.charAt(0).toUpperCase() + department.slice(1)}
					</label>
				))}
			</div>
			<button
				className='btn btn reverse btn-block'
				onClick={handleSearch}
				disabled={loading}>
				{loading ? "Searching..." : "Search"}
			</button>
			{error && <div className='error'>{error}</div>}
			<div className='search-results'>
				<h1>Search Results:</h1>
				<input
					className='email-search-input'
					type='text'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					placeholder='Search results by name, positions, or any relevant detail...'
				/>
				{filteredEmails.length > 0 ? (
					<div className='email-details-container'>
						{filteredEmails.map((email, index) => (
							<div key={index} className='email-details-card'>
								<h3>#{index + 1}</h3>
								<p>Confidence: {email.confidence}%</p>
								<p>
									Email: {email.value} ({email.type})
								</p>
								<p>
									Name: {email.first_name} {email.last_name}
								</p>
								{email.position && <p>Position: {email.position}</p>}
								{email.seniority && <p>Seniority: {email.seniority}</p>}
								{email.department && <p>Department: {email.department}</p>}
								{email.linkedin && (
									<p>
										LinkedIn:{" "}
										<a
											href={email.linkedin}
											target='_blank'
											rel='noopener noreferrer'>
											{email.linkedin}
										</a>
									</p>
								)}
								{email.twitter && (
									<p>
										Twitter:{" "}
										<a
											href={`https://twitter.com/${email.twitter}`}
											target='_blank'
											rel='noopener noreferrer'>
											{email.twitter}
										</a>
									</p>
								)}
								{email.phone_number && (
									<p>Phone Number: {email.phone_number}</p>
								)}
							</div>
						))}
					</div>
				) : (
					<p>No emails found matching your search.</p>
				)}
				<div className='company-info-container'>
					{Object.keys(companyInfo).length > 0 && (
						<div className='company-info-card'>
							<h2>Company Info:</h2>
							<div className='company-details-card'>
								<p>Company: {companyInfo.organization || "N/A"}</p>
								<p>Headcount: {companyInfo.headcount || "N/A"}</p>
								<p>Country: {companyInfo.country || "N/A"}</p>
								<p>State: {companyInfo.state || "N/A"}</p>
								<p>City: {companyInfo.city || "N/A"}</p>
								<p>Postal Code: {companyInfo.postal_code || "N/A"}</p>
								<p>Street: {companyInfo.street || "N/A"}</p>
								<p>Email Pattern: {companyInfo.pattern || "N/A"}</p>
								<p>Industry: {companyInfo.industry || "N/A"}</p>
								<p>Description: {companyInfo.description || "N/A"}</p>
							</div>
							<h2>Socials:</h2>
							<div className='social-links-card'>
								<p>LinkedIn: {companyInfo.linkedin || "N/A"}</p>
								<p>Twitter: {companyInfo.twitter || "N/A"}</p>
								<p>Facebook: {companyInfo.facebook || "N/A"}</p>
								<p>Instagram: {companyInfo.instagram || "N/A"}</p>
								<p>Youtube: {companyInfo.youtube || "N/A"}</p>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default DomainSearch;
