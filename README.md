# RageBait Trainer

> An AI-powered sparring partner designed to help you master online arguments and develop an unshakable mental frame.

This application is a full-stack project with a React/Vite frontend and a Node.js/Express backend. It uses the Gemini API for real-time AI conversation and MongoDB for user authentication.

-----

## Prerequisites

Before you begin, ensure you have the following installed:

  * [Node.js](https://nodejs.org/) (v18 or later recommended)
  * npm (included with Node.js)
  * [Git](https://git-scm.com/)

-----

## Local Setup

Follow these steps to set up the project on your local machine.

### 1\. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2\. Backend Setup

First, let's set up the `server`.

1.  Navigate to the server directory:
    ```bash
    cd server
    ```
2.  Install the required npm packages:
    ```bash
    npm install
    ```
3.  Create an environment file named **`.env`** in the `server` directory and add your secret keys:
    ```
    # Your MongoDB connection string
    MONGODB_URI="mongodb+srv://..."

    # A secret key for signing user tokens (can be any long, random string)
    JWT_SECRET="your_jwt_secret_here"
    ```

### 3\. Frontend Setup

Now, let's set up the `rageBaited101` client application.

1.  Navigate to the frontend directory from the project root:
    ```bash
    cd rageBaited101
    ```
2.  Install the required npm packages:
    ```bash
    npm install
    ```
3.  Create an environment file named **`.env`** in the `rageBaited101` directory and add your Google Gemini API key.
    ```
    # Your Google Gemini API Key (must start with VITE_)
    VITE_GEMINI_API_KEY="your_gemini_api_key_here"
    ```

-----

## Running the Application

You will need **two separate terminals** to run both the backend and frontend servers simultaneously.

### Terminal 1: Start the Backend

```bash
# Navigate to the server directory
cd server

# Start the server
node server.js

# You should see:
# ✅ MongoDB database connection established successfully
# 🚀 Server is running on port: 5000
```

### Terminal 2: Start the Frontend

```bash
# Navigate to the frontend directory
cd rageBaited101

# Start the Vite development server
npm run dev

# You should see:
#  ➜  Local:   http://localhost:5173/
```

Open your browser and navigate to **http://localhost:5173** to use the application.
