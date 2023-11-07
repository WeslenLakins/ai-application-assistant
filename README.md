# ai-application-assistant
A web application designed to streamline routine parts of applications such as cover letters for job application and personal statements for college applications.

##Features 
- - **User Authentication**: Secure login and registration system.
- - **Profile Management**: Users can view and update their personal information.
- - **Create Cover Letter Functionality**: Users can input a job title, company name, location, copy & paste a job description, and copy & paste their resume to creat a personalized cover letter that aligns the user's educational background, skills, and professional history with the details highlighted in the job description. Each letter is crafted to be distinctive to the respective company or location and is adapted to suit the particular role applied for.
- - **View All Cover Letter Functionality**: Once a user generates a cover letter using the Create Cover Letter Functionality, the user is able to view a list of all the cover letters they have created.
  - **View Single Cover Letter Functionality**: In the list of all the cover letters the user has created, the user is able to view individual cover letters.
  - **Logout Functionality**: Users can logout using the button diplayed in the header when they are logged in.
 
## Getting Started

### Prerequisites

Before you begin, ensure you have the following:
- Node.js
- npm or yarn
- MongoDB (for local development)
- Create .env folder in root directory to add values for environmental variables and API Keys. 

### Installation

1. Clone the repository to your local machine:

```
git clone https://github.com/WeslenLakins/ai-application-assistant.git
cd ai-application-assistant
```

2. Install the necessary dependencies for the backend:

```
npm install
```

3. In a new terminal, navigate to the frontend directory and install the necessary dependencies for the frontend:

```
cd frontend
npm install
```

4. Ensure all neccesary dependencies have been installed in the root directory and frontend folder, then proceed to start the application :

```
npm run dev
```

Your application should now be running on http://localhost:3000.

## Support

If you encounter any issues or require assistance, please open an issue on the GitHub repository.
