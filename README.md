# Bhavna - Emotional Drift Monitoring and Visualization Web Application

## Overview
Bhavna is a comprehensive web-based system that tracks and visualizes changes in user emotions over time using AI-powered text analysis and interactive dashboards. The application helps users understand their emotional patterns and provides personalized activity suggestions based on their emotional state.

## Features

### Core Features
- **User Authentication**: Secure login and registration system with JWT tokens
- **Emotion Detection**: AI-powered text analysis that categorizes emotions into 9 categories:
  - Calm, Happy, Energetic, Irritated, Sad, Depressed, Low Energy, Anxious, Anger
- **Emotional Intensity Tracking**: Measures the intensity of each emotion (1-10 scale)
- **Activity Suggestions**: Provides personalized activity recommendations based on detected emotions
- **Dashboard & Reports**: Comprehensive dashboard with statistics and visualizations
- **Emotion Timeline**: Track emotions over days, weeks, and months
- **Trend Analysis**: Visual representation of emotional patterns over time

### Suggested Activities
Based on emotional state, users receive suggestions for:
- Meditation
- Journaling
- Breathing Exercises
- Gym
- Dancing
- Swimming
- Team Sports
- Running
- Cycling
- Walking
- Travelling

### Visualizations
- **Emotion Distribution Chart**: Pie chart showing emotion frequency
- **Intensity Trend Graph**: Line chart showing emotional intensity changes over time
- **Daily Statistics**: Cards displaying key metrics and insights
- **Emotion Frequency Bar Chart**: Visual representation of emotion occurrences

## Project Structure

```
Bhavna/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   └── emotionController.js  # Emotion tracking logic
│   ├── models/
│   │   ├── User.js              # User schema
│   │   └── EmotionEntry.js      # Emotion entry schema
│   ├── routes/
│   │   ├── authRoutes.js        # Auth endpoints
│   │   └── emotionRoutes.js     # Emotion endpoints
│   ├── services/
│   │   └── emotionAIService.js  # AI emotion detection service
│   ├── middleware/
│   │   └── authMiddleware.js    # JWT authentication middleware
│   ├── server.js                 # Express server setup
│   ├── .env                      # Environment variables
│   ├── package.json              # Backend dependencies
│   └── .gitignore
│
└── frontend/
    ├── public/                   # Static files
    ├── src/
    │   ├── components/
    │   │   ├── EmotionForm.jsx   # Form for emotion submission
    │   │   ├── EmotionChart.jsx  # Chart visualization component
    │   │   └── Dashboard.jsx     # Main dashboard component
    │   ├── pages/
    │   │   ├── Login.jsx         # Login page
    │   │   ├── Register.jsx      # Registration page
    │   │   └── Home.jsx          # Home page with dashboard
    │   ├── services/
    │   │   └── api.js            # API client service
    │   ├── styles/
    │   │   ├── index.css         # Global styles
    │   │   ├── Auth.css          # Auth page styles
    │   │   ├── Home.css          # Home page styles
    │   │   ├── EmotionForm.css   # Form component styles
    │   │   ├── EmotionChart.css  # Chart component styles
    │   │   └── Dashboard.css     # Dashboard styles
    │   ├── App.jsx               # Main App component
    │   ├── main.jsx              # React entry point
    │   └── App.css               # App styles
    ├── index.html                # HTML template
    ├── package.json              # Frontend dependencies
    ├── vite.config.js            # Vite configuration
    └── .gitignore
```

## Tech Stack

### Backend
- **Node.js & Express.js**: RESTful API server
- **MongoDB**: NoSQL database for storing user data and emotion entries
- **JWT**: Secure token-based authentication
- **Bcryptjs**: Password hashing and encryption
- **Mongoose**: MongoDB object modeling
- **CORS**: Cross-origin resource sharing

### Frontend
- **React 18**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client for API requests
- **Recharts**: Data visualization library for charts and graphs
- **Vite**: Fast build tool and dev server
- **CSS3**: Styling with modern features

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance like MongoDB Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/bhavna
   JWT_SECRET=your_secure_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Emotion Tracking
- `POST /api/emotion/submit` - Submit emotion entry
- `GET /api/emotion/history?days=30` - Get emotion history
- `GET /api/emotion/stats?days=30` - Get emotion statistics
- `GET /api/emotion/trends?days=30` - Get emotion trends

## Usage

1. **Register/Login**: Create an account or log in to access the application
2. **Submit Emotion**: Write about how you're feeling in the text area
3. **View Analysis**: See the detected emotion, intensity level, and suggested activities
4. **Track Progress**: View your emotion history, statistics, and trends on the dashboard
5. **Adjust Period**: Use the date selector to view data for 7, 30, 90 days, or 1 year

## Emotion Detection Algorithm

The emotion detection service uses keyword-based analysis:
1. Analyzes the submitted text for emotion-related keywords
2. Calculates emotion intensity based on exclamation marks and capitalization
3. Returns the detected emotion and relevant activity suggestions
4. Stores the entry with timestamp for trend analysis

### Emotion Categories
- **Calm**: Peaceful, relaxed, serene state
- **Happy**: Joyful, delighted, cheerful feelings
- **Energetic**: Excited, motivated, vibrant state
- **Irritated**: Annoyed, frustrated feelings
- **Sad**: Sorrowful, melancholy emotions
- **Depressed**: Hopeless, empty feeling state
- **Low Energy**: Tired, exhausted, fatigued state
- **Anxious**: Worried, nervous, stressed feelings
- **Anger**: Furious, enraged emotional state

## Dashboard Features

### Statistics Cards
- Total emotion entries recorded
- Most common emotion detected
- Average emotional intensity
- Time period being analyzed

### Emotion Distribution
- Bar chart showing frequency of each emotion
- Visual comparison of emotional patterns

### Intensity Trends
- Line graph showing emotion intensity changes over time
- Daily statistics with dominant emotions

### Recent Entries
- List of latest emotion submissions
- Text preview and suggested activities
- Emotion badges with intensity indicators

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API endpoints with auth middleware
- Secure token storage in localStorage
- CORS enabled for frontend communication

## Future Enhancements

- Advanced NLP/Machine Learning for better emotion detection
- Integration with external AI services (AWS Comprehend, Google Cloud NLP)
- Mood-based music or meditation recommendations
- Social features (share insights with friends)
- Mobile application
- Export reports as PDF
- Voice-based emotion input
- Integration with fitness trackers

## Troubleshooting

### Connection Issues
- Ensure MongoDB is running and accessible
- Check if backend is running on port 5000
- Verify CORS settings in backend

### Login Issues
- Clear browser localStorage and try again
- Ensure JWT_SECRET in .env is consistent

### Chart Not Displaying
- Verify emotion data exists in the database
- Check browser console for errors
- Ensure Recharts is properly installed

## Contributing

Feel free to fork, modify, and submit pull requests to improve the application.

## License

This project is open source and available under the MIT License.

## Contact & Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Created with ❤️ for emotional wellness**
