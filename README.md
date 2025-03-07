
# Gemini Clone Project

This project is a simple clone of Gemini, built using the following technologies:

- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Frontend**: HTML, CSS, and JavaScript

## Features

- Endpoint `/request` to handle user prompts.
- Backend server to process requests and interact with the database.
- Frontend interface to interact with the application.
- MongoDB as the database to store user data and responses.
- Speech Recognition: Integrated speech recognition functionality to capture user prompts through voice.

## Prerequisites

Ensure you have the following installed:
- Node.js (v16 or later)
- MongoDB (v5.0 or later)
- npm or yarn

## Installation

1. Clone the Repository:
   ```bash
   git clone https://github.com/ArrayOutOfBoundError/Gemini-AI2
   ```

2. Install Backend Dependencies:
   ```bash
   cd Backend
   npm install
   ```

3. Setup Environment Variables:
   Create a `.env` file in the `Backend` directory and add the following variables:
   ```env
   MONGO_URI=<your-mongodb-connection-string>
   PORT=5000
   ```

4. Start MongoDB:
   Ensure MongoDB is running on your machine or through a cloud provider.

## Running the Application

1. Start the Backend Server:
   ```bash
   cd Backend
   npm run dev
   ```

2. Open the Frontend:
   Open the `Frontend/index.html` file in your browser.

## API Endpoints

### `/request`
- **Method**: POST
- **Description**: Endpoint to process and store user prompts.
- **Request Body**:
  ```json
  {
    "request": "<user-prompt-text>"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Request received successfully.",
    "data": <processed-response>
  }
  ```

## Speech Recognition

The frontend includes speech recognition functionality to capture user input via voice.

### How it works:
1. A user can click the microphone icon to activate speech recognition.
2. The system listens for the user's speech and converts it into text.
3. The converted text is then used as a user prompt to interact with the backend.

This functionality is integrated using the `webkitSpeechRecognition` API in the frontend, enabling voice input for user requests.

## Issue Faced During Development

### Problem
When using the application through a Chrome extension, the server responds properly to prompts. However, when sending an image along with text, the server reloads and nothing happens.

### Solution
If you encounter the same issue, try the following:
1. Close the Chrome extension.
2. Open the `index.html` file directly from the directory in Microsoft Edge.
3. The functionality should work without any issues.

## Project Structure

```
Gemini-AI2
├── Backend
│   ├── node_modules        # Node.js modules for the backend
│   ├── app.js              # Main backend app configuration
│   ├── controller.js       # Controllers for handling request logic
│   ├── db.js               # Database connection setup (likely MongoDB)
│   ├── index.js            # Backend entry point
│   ├── model.js            # Mongoose models or backend data models
│   ├── package-lock.json   # Lock file for backend dependencies
│   ├── package.json        # Backend dependencies
│   ├── multer.js           # Multer configuration for file uploads
│   └── requestRouter.js    # Routes for managing requests
├── Frontend
│   ├── index.html          # HTML template for the frontend
│   ├── style.css           # CSS for frontend styling
│   ├── index.js            # JavaScript for frontend logic
│   └── assets              # Static assets (images, icons, etc.)
├── .gitignore              # Global Git ignored files
└── README.md               # Project documentation
```

## Contribution

Feel free to fork this repository and submit pull requests to contribute to the project.

## Acknowledgments

Thanks to the creators of Node.js, Express, MongoDB, and the webkitSpeechRecognition API for their amazing tools and libraries.
