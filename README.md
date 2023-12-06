# 💻 AI Application Assistant 💻

[Live Site](https://www.aiapplicationassistant.com/)

## 🧑‍🚀 General Information 🧑‍🚀

- **Author:** Weslen T. Lakins
- **Description:** A tool to empower job seekers and recruiters. The AI Application Assistant is a web application that uses the OpenAI API to generate personalized cover letters for job seekers. The application also allows users to manage their profile and view all the cover letters they have created. The application is deployed to Vercel and can be accessed at the link above.
- [Twitter/X](https://twitter.com/WeslenLakins)

![ai-application-assistant-logo](https://github.com/WeslenLakins/ai-application-assistant/assets/90317130/82eb6549-27bd-458c-867b-04d66eef4124)

## ⭐Features ⭐

- **User Authentication**: Secure login and registration system with JWT Authentication.
- **Profile Management**: Users can view and update their personal information including their Name, Email, and Password.
- **Create Cover Letter Functionality**: Users can input a job title, company name, location, copy & paste a job description, and copy & paste their resume to creat a personalized cover letter that aligns the user's educational background, skills, and professional history with the details highlighted in the job description. Each letter is crafted to be distinctive to the respective company or location and is adapted to suit the particular role applied for.
- **View All Cover Letter Functionality**: Once a user generates a cover letter using the Create Cover Letter Functionality, the user is able to view a list of all the cover letters they have created.
- **View Single Cover Letter Functionality**: In the list of all the cover letters the user has created, the user is able to view individual cover letters.
- **Logout Functionality**: Users can logout using the button diplayed in the header when they are logged in.
- **Stripe API Integration**: Users can purchase a subscription to the application using the Stripe API. The user's subscription is managed using the Stripe API and the user's subscription status is stored in the database.
- **Deployment**: The application is deployed to Vercel.

## 👩‍💻 Running the App Locally 🧑‍💻

### ⚙️ Prerequisites ⚙️

Before you begin, ensure you have the following:

- [Node.js](https://nodejs.org/en/download)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Create A Valid MongoDB MONGO_URI](https://www.mongodb.com/)
- [Create an OpenAI_API_Key](https://openai.com/)
- [Stripe API Keys](https://stripe.com/docs/development/quickstart)

### 📂 Installation 📂

- Clone the repository to your local machine: [How to clone a GitHub Repository in Visual Studio Code](https://learn.microsoft.com/en-us/azure/developer/javascript/how-to/with-visual-studio-code/clone-github-repository#:~:text=Open%20the%20command%20palette%20with,from%20GitHub%2C%20then%20press%20Enter.)

```bash
git clone https://github.com/WeslenLakins/ai-application-assistant.git
cd ai-application-assistant
```

- Remove .example from the .env file and add values for the variables. Set the NODE_ENV to development, the PORT to 5000 or wherever your sever usually runs, and the JWT_SECRET can be set to any value you would like. Input the values you obtained earlier for the MONGO_URI & OPENAI_API_KEY values.

- Install the necessary dependencies for the backend in the root directory of the project:

```bash
npm install
```

- In a new terminal, navigate to the frontend directory and install the necessary dependencies for the frontend:

```bash
cd frontend
npm install
```

- Ensure all neccesary dependencies have been installed in the root directory and frontend folder, then proceed to start the application by opening a new command prompt and executing the following command in the root directory of the project:

```bash
npm run dev
```

- Your application should now be running on [http://localhost:3000](http://localhost:3000) 🏁

- Drown in job/scholarship offers 🏊

## ⛑️ Support ⛑️

If you encounter any issues or require assistance, please open an issue on the GitHub repository.
