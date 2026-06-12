# Interview-AI

An AI-powered interview preparation and practice platform that helps users prepare for technical interviews with intelligent feedback and assessment.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **AI-Powered Interview Questions**: Generate realistic interview questions using Google GenAI
- **Real-time Feedback**: Get instant feedback on your answers
- **Resume Upload & Analysis**: Upload and analyze resumes (PDF support)
- **User Authentication**: Secure user authentication with JWT tokens
- **Interview History**: Track your interview practice sessions
- **Responsive Design**: Mobile-friendly user interface

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js (v5.2.1)
- **Database**: MongoDB with Mongoose (v9.6.3)
- **AI Integration**: Google GenAI (v2.7.0)
- **Authentication**: JWT (jsonwebtoken v9.0.3)
- **Security**: bcryptjs for password hashing
- **File Processing**: Multer, pdf-parse, Puppeteer
- **Validation**: Zod with JSON Schema conversion

### Frontend
- **Framework**: React (v19.2.6)
- **Build Tool**: Vite
- **Styling**: SCSS/CSS
- **Routing**: React Router (v7.16.0)
- **HTTP Client**: Axios
- **Development**: ESLint, Vite dev server

## 📁 Project Structure

```
Interview-AI/
├── Backend/                 # Node.js/Express backend
│   ├── package.json
│   ├── server.js           # Main server entry point
│   └── [other backend files]
├── Frontend/               # React frontend
│   ├── package.json
│   ├── src/               # React source files
│   └── vite.config.js     # Vite configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance - MongoDB Atlas)
- **Google GenAI API Key** (from Google AI Studio)
- **Environment variables** setup

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Praviiiiin/Interview-AI.git
   cd Interview-AI
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   cd ..
   ```

### Configuration

1. **Create `.env` file in the Backend directory**
   ```bash
   cd Backend
   touch .env
   ```

2. **Add the following environment variables to `Backend/.env`**
   ```
   # MongoDB Connection
   MONGODB_URI=your_mongodb_connection_string
   
   # Google GenAI API
   GOOGLE_GENAI_API_KEY=your_google_genai_api_key
   
   # JWT Secret
   JWT_SECRET=your_jwt_secret_key
   
   # Server Port
   PORT=5000
   
   # Frontend URL (for CORS)
   FRONTEND_URL=http://localhost:5173
   
   # Other configurations
   NODE_ENV=development
   ```

3. **Ensure MongoDB is running**
   - If using local MongoDB: `mongod`
   - If using MongoDB Atlas: ensure your connection string is correct

### Running the Application

1. **Start the Backend Server** (from Backend directory)
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000` (or your configured PORT)

2. **Start the Frontend Server** (from Frontend directory, in a new terminal)
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

3. **Access the Application**
   Open your browser and navigate to: `http://localhost:5173`

## 💡 Usage

### For Users

1. **Create an Account**: Sign up with email and password
2. **Upload Resume** (Optional): Upload your resume in PDF format for better question generation
3. **Start Interview**: Click "Start Interview" to begin a practice session
4. **Answer Questions**: Respond to AI-generated interview questions
5. **Get Feedback**: Receive intelligent feedback on your answers
6. **Review History**: Check your previous interview sessions and progress

### For Developers

#### Backend API Endpoints (Examples)
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/user/profile` - Get user profile
- `POST /api/upload/resume` - Upload resume
- `POST /api/interview/generate` - Generate interview questions
- `POST /api/interview/submit` - Submit answer and get feedback
- `GET /api/interview/history` - Get interview history

#### Building for Production

**Backend:**
```bash
cd Backend
npm run build  # If applicable
```

**Frontend:**
```bash
cd Frontend
npm run build
```

Production-ready files will be in `Frontend/dist/`

## 📚 API Documentation

### Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Key Dependencies

**Backend:**
- `@google/genai` - AI question generation
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `jsonwebtoken` - Authentication
- `zod` - Data validation

**Frontend:**
- `react` - UI framework
- `axios` - HTTP requests
- `react-router` - Client-side routing
- `sass` - Styling

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the LICENSE file for details.

## 🙋 Support

If you encounter any issues or have questions, please:
1. Check the [Issues](https://github.com/Praviiiiin/Interview-AI/issues) page
2. Create a new issue with a clear description
3. Include relevant error messages and screenshots

## 🌟 Acknowledgments

- Google GenAI for AI capabilities
- React and Vite communities
- Express.js and MongoDB communities

---

**Happy Interviewing! Good luck with your preparation! 🎯**
