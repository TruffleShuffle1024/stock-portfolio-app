# 🚀 DEPLOYMENT GUIDE - Stock Portfolio App

## Curtis, follow these steps EXACTLY and you'll have your app live in 30 minutes!

---

## ✅ What You're Deploying

1. **Frontend** (React app) → Vercel (free)
2. **Backend** (Flask API) → Railway (free)

---

## 📋 STEP 1: Get Your API Key (5 minutes)

### Get Anthropic API Key

1. Go to: https://console.anthropic.com
2. Click "Sign Up" (use your Gmail)
3. Once logged in, click "API Keys" in sidebar
4. Click "Create Key"
5. **COPY THE KEY** - you'll need it! (Looks like: `sk-ant-api03-...`)

💡 **You get $5 free credit** - enough for hundreds of AI analyses!

---

## 📋 STEP 2: Upload Code to GitHub (10 minutes)

### Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `stock-portfolio-app`
3. Make it **Public**
4. **Don't** initialize with README (we already have one)
5. Click "Create repository"

### Upload Your Code

**Option A: Using GitHub Website (Easier)**
1. Download the `stock-portfolio-app` folder I created
2. On your new GitHub repo page, click "uploading an existing file"
3. Drag the ENTIRE `stock-portfolio-app` folder
4. Scroll down, click "Commit changes"

**Option B: Using Git Command Line**
```bash
cd stock-portfolio-app
git init
git add .
git commit -m "Initial commit: Stock portfolio app"
git branch -M main
git remote add origin https://github.com/TruffleShuffle1024/stock-portfolio-app.git
git push -u origin main
```

---

## 📋 STEP 3: Deploy Backend to Railway (7 minutes)

### Setup Railway Account

1. Go to: https://railway.app
2. Click "Login" → "Login with GitHub"
3. Authorize Railway to access your GitHub

### Deploy the Backend

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose `stock-portfolio-app`
4. Railway will ask what to deploy:
   - Select "backend" folder
5. Click "Add variables"
6. Add this variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `[paste your API key from Step 1]`
7. Click "Deploy"

Railway will build and deploy automatically!

### Get Your API URL

1. Once deployed, click on your service
2. Go to "Settings" tab
3. Scroll to "Domains"
4. Click "Generate Domain"
5. **COPY THIS URL** - you'll need it! (Looks like: `https://your-app.railway.app`)

---

## 📋 STEP 4: Update Frontend with API URL (2 minutes)

### Edit the Code

1. Go to your GitHub repository
2. Navigate to: `frontend/src/App.jsx`
3. Click the pencil icon (Edit)
4. Find line 6 (near the top)
5. Add this line AFTER the imports:
   ```javascript
   const API_URL = 'https://your-app.railway.app';
   ```
   **Replace `your-app.railway.app` with YOUR Railway URL from Step 3!**

6. Find any `fetch()` calls in the code and update them to use API_URL:
   ```javascript
   // Change this:
   fetch('/api/stocks')
   
   // To this:
   fetch(`${API_URL}/api/stocks`)
   ```

7. Scroll down, click "Commit changes"

---

## 📋 STEP 5: Deploy Frontend to Vercel (5 minutes)

### Setup Vercel Account

1. Go to: https://vercel.com
2. Click "Sign Up" → "Continue with GitHub"
3. Authorize Vercel

### Deploy the Frontend

1. Click "Add New..." → "Project"
2. Find `stock-portfolio-app` repository
3. Click "Import"
4. **IMPORTANT Settings:**
   - Framework Preset: `Create React App`
   - Root Directory: Click "Edit" → Select `frontend`
   - Build Command: `npm run build`
   - Output Directory: `build`
5. Click "Deploy"

Vercel will build and deploy (takes 2-3 minutes)

### Get Your Live URL

1. Once deployed, Vercel shows your URL
2. **COPY IT** - This is your live app! (Looks like: `https://stock-portfolio-app.vercel.app`)

---

## 🎉 STEP 6: Test Your Live App!

1. Visit your Vercel URL
2. Click "Add Stock"
3. Add a test stock (e.g., AAPL, Apple Inc., 10 shares, $150)
4. Click "Get Analysis" - should get AI response!

### If it works:
✅ **CONGRATULATIONS!** Your app is LIVE and working!

### If it doesn't work:
Check Railway logs:
1. Go to Railway dashboard
2. Click your project
3. Click "Deployments" tab
4. Look for errors in red

---

## 📱 STEP 7: Share Your Work!

### Update Your GitHub Profile

1. Go to https://github.com/TruffleShuffle1024
2. Click profile picture → "Your profile"
3. Click "Edit profile"
4. Add to your bio: "Full-stack developer | Building with React & AI"
5. Add website: [your Vercel URL]
6. Save!

### Pin the Repository

1. Go to your profile
2. Click "Customize your pins"
3. Select `stock-portfolio-app`
4. Click "Save pins"

### Update LinkedIn

1. Go to LinkedIn
2. Add to "Projects" section:
   - Project name: "AI-Powered Stock Portfolio Manager"
   - Description: "Built a full-stack web app with React frontend, Flask backend, and Claude AI integration. Features real-time portfolio tracking and intelligent investment insights."
   - Link: [your Vercel URL]

---

## 🎯 What You Just Accomplished

✅ Built a modern React application  
✅ Created a Flask REST API  
✅ Integrated AI (Anthropic Claude)  
✅ Deployed to production (Vercel + Railway)  
✅ Have a LIVE URL to share with employers  

**This is a portfolio piece that will impress recruiters!**

---

## 🆘 Troubleshooting

### Backend Issues
- Check Railway logs for errors
- Verify API key is set correctly
- Make sure `requirements.txt` is in backend folder

### Frontend Issues
- Check browser console (F12) for errors
- Verify API_URL is correct
- Make sure CORS is enabled in backend

### AI Not Working
- Check you added ANTHROPIC_API_KEY to Railway
- Verify the key is valid
- Check you have credit remaining

### Can't See Updates
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Wait 1-2 minutes for deployment

---

## 💰 Cost Breakdown

| Service | Cost | What You Get |
|---------|------|--------------|
| Railway (Backend) | **FREE** | 500 hours/month |
| Vercel (Frontend) | **FREE** | Unlimited deployments |
| Anthropic API | **$5 FREE** | ~1000 analyses |
| **TOTAL** | **$0** | Fully functional app! |

---

## 🔥 Next Steps

1. Add this to your resume under "Projects"
2. Share the URL when applying to jobs
3. Continue building (see README roadmap)
4. Create more projects using this template!

---

**Questions? Email me: fawcett.curtis@gmail.com**

**YOU DID IT! 🚀**
