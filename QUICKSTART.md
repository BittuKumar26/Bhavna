# Quick Start Guide - Bhavna Application

## Prerequisites
- Node.js (v14+) and npm installed
- MongoDB running locally or a cloud MongoDB instance
- A code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Backend Setup (Terminal 1)

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create or update .env file with:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/bhavna
# JWT_SECRET=your_secure_jwt_secret_key
# NODE_ENV=development

# Start the backend server
npm run dev
```

**Expected Output:**
```
Server running on http://localhost:5000
MongoDB connected: localhost
```

### 2. Frontend Setup (Terminal 2)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Expected Output:**
```
VITE v4.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

### 3. Access the Application

Open your browser and navigate to: **http://localhost:3000**

## Using the Application

### First Time Setup
1. **Register**: Click "Register here" and create an account
   - Enter your name, email, and password
   - Confirm password and submit

2. **Login**: Log in with your credentials
   - Email and password you just created

### Track Your Emotions
1. **Submit Emotion**: Write about how you're feeling in the text area
   - Example: "I'm feeling stressed about the deadline, my heart is racing"
   - Click "Submit" button

2. **View Analysis**:
   - Detected Emotion (e.g., "anxious")
   - Intensity Scale (1-10)
   - Suggested Activities (e.g., breathing exercises, meditation, gym)

### View Dashboard
- **Statistics Cards**: Total entries, most common emotion, average intensity
- **Emotion Distribution**: Bar chart showing emotion frequency
- **Intensity Trend**: Line graph of emotional changes
- **Recent Entries**: List of latest submissions

### Analyze Patterns
1. Select time period: 7 days, 30 days, 90 days, or 1 year
2. View statistics and trends
3. Identify patterns in your emotional state
4. Follow suggested activities for emotional wellness

## Emotion Detection Examples

### Input Examples and Expected Detections

**"I feel peaceful and calm today"** → Emotion: Calm

**"I'm so happy and excited about the weekend!"** → Emotion: Happy

**"I'm exhausted and feeling very tired"** → Emotion: Low Energy

**"I'm nervous about the upcoming exam"** → Emotion: Anxious

**"I'm really angry about the situation!!!"** → Emotion: Anger (High Intensity)

## Available Emotions & Suggested Activities

| Emotion | Activities |
|---------|-----------|
| **Calm** | Meditation, Breathing Exercises, Journaling, Walking, Swimming |
| **Happy** | Dancing, Gym, Team Sports, Cycling, Running, Travelling |
| **Energetic** | Gym, Running, Cycling, Dancing, Team Sports, Swimming |
| **Irritated** | Gym, Running, Breathing Exercises, Meditation, Journaling |
| **Sad** | Journaling, Meditation, Walking, Team Sports, Travelling |
| **Depressed** | Journaling, Meditation, Walking, Breathing Exercises |
| **Low Energy** | Meditation, Walking, Breathing Exercises, Light Swimming |
| **Anxious** | Breathing Exercises, Meditation, Walking, Gym, Journaling |
| **Anger** | Gym, Running, Cycling, Breathing Exercises, Journaling |

## Troubleshooting

### Backend Won't Start
```bash
# Check if port 5000 is in use
# Try changing PORT in .env

# Check MongoDB connection
# Ensure MongoDB is running: mongod

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend Won't Start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try a different port
npm run dev -- --port 3001
```

### Login Issues
```bash
# Clear browser storage
# In browser console: localStorage.clear()

# Restart both servers
```

### MongoDB Connection Error
```bash
# Option 1: Use local MongoDB
# Ensure mongod is running on your system

# Option 2: Use MongoDB Atlas
# Update MONGODB_URI in .env:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bhavna
```

## File Structure Overview

### Backend Files
- `server.js` - Main Express application
- `config/db.js` - Database connection
- `models/` - User and EmotionEntry schemas
- `controllers/` - Business logic for auth and emotions
- `routes/` - API endpoint definitions
- `services/emotionAIService.js` - Emotion detection logic
- `middleware/authMiddleware.js` - JWT verification

### Frontend Files
- `App.jsx` - Main React component with routing
- `pages/Login.jsx` - Authentication page
- `pages/Register.jsx` - Account creation page
- `pages/Home.jsx` - Main dashboard page
- `components/EmotionForm.jsx` - Form for emotion input
- `components/Dashboard.jsx` - Dashboard layout and stats
- `components/EmotionChart.jsx` - Data visualization
- `services/api.js` - API client configuration
- `styles/` - CSS files for all pages and components

## API Endpoints Reference

### Auth Endpoints
```
POST /api/auth/register
Body: { name, email, password, confirmPassword }
Response: { token, user: { id, name, email } }

POST /api/auth/login
Body: { email, password }
Response: { token, user: { id, name, email } }
```

### Emotion Endpoints (All require authentication)
```
POST /api/emotion/submit
Body: { text }
Response: { emotionEntry: { id, emotion, suggestions, intensity, timestamp } }

GET /api/emotion/history?days=30
Response: { entries: [...] }

GET /api/emotion/stats?days=30
Response: { stats: { totalEntries, emotionFrequency, mostCommonEmotion, ... } }

GET /api/emotion/trends?days=30
Response: { trendData: { date: { entryCount, averageIntensity, dominantEmotion }, ... } }
```

## Development Tips

1. **Use browser DevTools**:
   - Check console for errors
   - View network requests
   - Debug React components

2. **MongoDB Compass**:
   - Visualize database
   - Query and manage data

3. **API Testing**:
   - Use Postman or Thunder Client for testing endpoints
   - Copy token from login response for authenticated requests

4. **Hot Reload**:
   - Both Vite and Nodemon watch for changes
   - Changes apply automatically

## Next Steps

1. Add more emotion categories or customize existing ones
2. Integrate with professional AI services (AWS, Google Cloud)
3. Add user profile customization
4. Implement real-time notifications
5. Create mobile app version
6. Add export to PDF functionality

## Support

For issues or questions:
1. Check the main README.md for detailed documentation
2. Review error messages in console
3. Verify all dependencies are installed
4. Ensure both MongoDB and servers are running

---

**Ready to track your emotional wellness with Bhavna!**
