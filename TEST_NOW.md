# ✅ MongoDB Ready - Start Here!

## Step 1: Restart Backend with Corrections

Open your **backend terminal** and run:

```bash
cd backend
npm run dev
```

**You should see:**
```
Server running on http://localhost:5000
MongoDB connected: localhost
```

## Step 2: Check Frontend is Running

Open another terminal and run:

```bash
cd frontend
npm run dev
```

**You should see:**
```
Local: http://localhost:3000/
```

## Step 3: Test Registration

1. Open browser: `http://localhost:3000`
2. Click **"Register here"**
3. Fill in the form:
   - Name: Your Name
   - Email: test@example.com
   - Password: Test1234 (at least 6 characters)
   - Confirm Password: Test1234
4. Click **Register**

## Step 4: If Still Getting Errors

### Check Backend Terminal
Look for any error messages. They will help us debug.

### Check Browser Console
- Press `F12` in browser
- Go to **Console** tab
- Look for red error messages
- **Copy the exact error**

### Open Browser DevTools
- Press `F12`
- Go to **Network** tab
- Try to register
- Click on the request to `/api/auth/register`
- Check the **Response** tab for error details

## Step 5: Common Issues

**Issue 1: "Cannot connect to MongoDB"**
- Ensure `mongod` is still running
- Check that no other app is using port 27017

**Issue 2: "Connection refused"**
- Backend not running? Start with `npm run dev` in backend folder
- Frontend can't reach backend? Check browser DevTools Network tab

**Issue 3: "Email already in use"**
- This email was already registered
- Try a different email address

---

**What's Different Now:**
✅ Better error messages
✅ Proper CORS configuration
✅ Better validation
✅ Console logging for debugging
✅ Consistent error handling

---

**Let me know if you get any errors and I'll fix them immediately!** 👍
