# Installation Instructions

## System Requirements
- Node.js v14 or higher
- npm v6 or higher
- MongoDB (local installation or MongoDB Atlas account)
- Modern web browser (Chrome, Firefox, Edge, Safari)

## Pre-Installation Checklist

- [ ] Node.js installed and accessible from terminal
- [ ] npm updated to latest version
- [ ] MongoDB running or MongoDB Atlas account created
- [ ] Port 5000 available for backend
- [ ] Port 3000 available for frontend
- [ ] Git installed (optional, for version control)

## Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd path\to\Bhavna
```

### Step 2: Backend Installation

#### 2.1 Install Dependencies
```bash
cd backend
npm install
```

Expected output:
```
npm notice
npm notice added 45 packages in 2s
```

#### 2.2 Configure Environment Variables

Create or edit `.env` file in the backend folder:

```bash
# For Windows PowerShell
New-Item -Path ".env" -Type File -Force
```

Add the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bhavna
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

#### 2.3 Verify MongoDB Connection

**Option A: Local MongoDB**
```bash
# Ensure MongoDB is running
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bhavna?retryWrites=true&w=majority
```

#### 2.4 Start Backend Server
```bash
npm run dev
```

Expected output:
```
Server running on http://localhost:5000
MongoDB connected: localhost
```

### Step 3: Frontend Installation

#### 3.1 Install Dependencies
```bash
cd ../frontend
npm install
```

#### 3.2 Start Frontend Server
```bash
npm run dev
```

Expected output:
```
VITE v4.4.5  ready in 500 ms

➜  Local:   http://localhost:3000/
➜  press h to show help
```

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Bhavna login page.

## Complete Installation Summary

### Terminal 1 (Backend)
```bash
cd backend
npm install
npm run dev
# Keep this running
```

### Terminal 2 (Frontend)
```bash
cd frontend
npm install
npm run dev
# Keep this running
```

### Terminal 3 (Optional - MongoDB)
```bash
mongod
# Only if running local MongoDB
```

### Browser
```
Navigate to: http://localhost:3000
```

## First Time Usage

### Create Account
1. Click "Register here" on the login page
2. Fill in:
   - Name: Your full name
   - Email: Your email address
   - Password: Secure password
   - Confirm Password: Same password
3. Click "Register"

### Submit Your First Emotion
1. Write about how you're feeling in the text area
2. Example: "I'm feeling excited and energetic today!"
3. Click "Submit"
4. View the detected emotion and suggestions

### View Dashboard
1. Select time period (7, 30, 90 days, or 1 year)
2. View statistics
3. Check emotion distribution
4. Track intensity trends

## Troubleshooting Installation Issues

### Issue: "npm: command not found"
**Solution:**
- Install Node.js from https://nodejs.org/
- Restart terminal after installation
- Verify: `node --version` and `npm --version`

### Issue: "Port 5000 is already in use"
**Solution:**
```bash
# Change PORT in .env to 5001
PORT=5001

# Or kill process using port 5000
# Windows PowerShell:
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process
```

### Issue: "Cannot connect to MongoDB"
**Solution:**
```bash
# Start local MongoDB (if installed)
mongod

# Or use MongoDB Atlas:
# 1. Create free cluster at https://www.mongodb.com/cloud/atlas
# 2. Update MONGODB_URI in .env with your connection string
```

### Issue: "Cannot find module 'express'"
**Solution:**
```bash
# Reinstall dependencies
rm -r node_modules
npm install
```

### Issue: "Frontend shows blank page or errors"
**Solution:**
```bash
# Clear browser cache
# Ctrl+Shift+Delete or Cmd+Shift+Delete

# Or rebuild frontend
cd frontend
npm run build
npm run preview
```

### Issue: "CORS error in console"
**Solution:**
- Ensure backend is running on port 5000
- Check that frontend API_URL is correct in `frontend/src/services/api.js`
- Update it to: `const API_URL = 'http://localhost:5000/api';`

## Verification Checklist

After installation, verify everything is working:

- [ ] Backend server running on http://localhost:5000
- [ ] Frontend server running on http://localhost:3000
- [ ] MongoDB connection successful
- [ ] Can access login page in browser
- [ ] Can register new account
- [ ] Can log in successfully
- [ ] Can submit emotion entry
- [ ] Can view dashboard
- [ ] Charts and data display correctly

## Database Setup (First Time)

MongoDB will automatically create the database when you:
1. Register a user
2. Submit an emotion entry

No manual schema creation needed - Mongoose handles this automatically.

## Production Setup (Optional)

When ready to deploy:

### Backend Production
1. Update `.env`:
```
NODE_ENV=production
JWT_SECRET=<generate-a-random-strong-key>
MONGODB_URI=<your-mongodb-atlas-uri>
```

2. Deploy to:
   - Heroku: `heroku create` and `git push heroku main`
   - Railway: Connect GitHub repo
   - DigitalOcean: Use SSH deployment

### Frontend Production
1. Build optimized version:
```bash
cd frontend
npm run build
```

2. Deploy to:
   - Vercel: Connect GitHub repo
   - Netlify: Upload `dist` folder
   - GitHub Pages: Push to `gh-pages` branch

## Package Dependencies

### Backend Dependencies
```
express: Web server framework
mongoose: MongoDB ODM
cors: Cross-origin requests
dotenv: Environment variables
bcryptjs: Password hashing
jsonwebtoken: JWT authentication
```

### Frontend Dependencies
```
react: UI library
react-dom: React DOM rendering
react-router-dom: Client routing
axios: HTTP requests
recharts: Data visualization
```

## Updating Dependencies

```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Update specific package
npm install <package>@latest
```

## Uninstalling Application

To remove the application:

```bash
# Remove backend
cd backend
rm -r node_modules
rm package-lock.json

# Remove frontend
cd ../frontend
rm -r node_modules
rm package-lock.json

# Delete entire Bhavna folder (optional)
cd ../..
rm -r Bhavna
```

## Getting Help

If you encounter issues:

1. **Check error messages**: Read terminal output carefully
2. **Check console**: Open browser DevTools (F12) and check console
3. **Check logs**: Review MongoDB logs for connection issues
4. **Restart servers**: Stop and restart both backend and frontend
5. **Clear cache**: Clear browser cache and localStorage
6. **Reinstall**: Delete node_modules and run `npm install` again

## Next Steps After Installation

1. Explore the dashboard
2. Submit several emotion entries
3. View trends and statistics
4. Try different emotions and see suggestions
5. Customize the application as needed
6. Deploy to production when ready

## Support Resources

- **Node.js**: https://nodejs.org/
- **MongoDB**: https://www.mongodb.com/
- **Express**: https://expressjs.com/
- **React**: https://react.dev/
- **Recharts**: https://recharts.org/

---

**Installation Complete! Start tracking your emotional wellness with Bhavna.**
