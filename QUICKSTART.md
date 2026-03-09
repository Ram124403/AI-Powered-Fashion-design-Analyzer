# 🚀 Fashion AI Platform - Quick Reference Guide

## FASTEST WAY TO GET STARTED

### Option 1: Automated Setup (Recommended)

**For Windows Users:**
```bash
cd "c:\Users\VAAGDEVI\Documents\Titans Coder\fashion-ai-platform"
start.bat
```

This will automatically:
- Create virtual environment
- Install dependencies
- Start backend server
- Start frontend server

### Option 2: Manual Setup (Step by Step)

#### 1. Open Terminal/Command Prompt
```bash
cd "c:\Users\VAAGDEVI\Documents\Titans Coder\fashion-ai-platform"
```

#### 2. Create Virtual Environment
```bash
python -m venv venv
```

#### 3. Activate Virtual Environment
```bash
# Windows PowerShell
.\venv\Scripts\Activate.ps1

# Windows Command Prompt
venv\Scripts\activate.bat
```

#### 4. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
cd ..
```

#### 5. Start Backend Server (Terminal 1)
```bash
cd backend
python main.py
```
✅ Server runs on: **http://localhost:8001**

#### 6. Start Frontend Server (Terminal 2)
```bash
cd frontend
python -m http.server 3000
```
✅ Frontend runs on: **http://localhost:3000**

---

## 📱 Access the Application

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend UI** | http://localhost:3000 | Upload images & get recommendations |
| **Backend API** | http://localhost:8001 | API endpoints |
| **API Documentation** | http://localhost:8001/docs | Interactive API explorer (Swagger) |
| **Alternative Docs** | http://localhost:8001/redoc | ReDoc documentation |

---

## 🎯 How to Use

### Image Analysis
1. Go to http://localhost:3000
2. Click upload area or drag & drop image
3. Click "Analyze Outfit"
4. Get fashion recommendations!

### Text Recommendations
1. Go to http://localhost:3000
2. Type your style preferences
3. Click "Get Recommendations"
4. Get personalized suggestions!

---

## 📁 Project Files Overview

```
fashion-ai-platform/
├── venv/                    👈 Virtual environment (created on first run)
├── backend/
│   ├── main.py             👈 FastAPI server
│   └── requirements.txt     👈 Python packages
├── frontend/
│   ├── index.html          👈 Main page
│   ├── styles.css          👈 Styling
│   └── script.js           👈 Functionality
├── start.bat               👈 Windows auto-start
├── start.sh                👈 Linux/Mac auto-start
├── README.md               👈 Project overview
└── SETUP_GUIDE.md          👈 Detailed guide
```

---

## 🔧 Common Commands

| Task | Command |
|------|---------|
| Create venv | `python -m venv venv` |
| Activate venv (PowerShell) | `.\venv\Scripts\Activate.ps1` |
| Activate venv (CMD) | `venv\Scripts\activate.bat` |
| Install dependencies | `pip install -r backend/requirements.txt` |
| Run backend | `cd backend && python main.py` |
| Run frontend | `cd frontend && python -m http.server 3000` |
| Deactivate venv | `deactivate` |

---

## ⚠️ Troubleshooting

### Port 8001 Already in Use
```bash
# Change port in backend\main.py:
# Change: port=8001
# To:     port=8002
# Then update frontend\script.js URLs accordingly
```

### Virtual Environment Not Activating
```bash
# Enable script execution (PowerShell):
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Can't Install Packages
```bash
# Make sure virtual environment is activated (you should see (venv) prefix)
# Then try: pip install --upgrade pip
# Then: pip install -r requirements.txt
```

### Frontend Not Connecting to Backend
- Check both servers are running
- Verify port numbers match (8001 for backend, 3000 for frontend)
- Check browser console (F12) for errors
- Ensure CORS is enabled in backend

---

## 🎨 Technology Stack

- **Backend**: FastAPI (Python web framework)
- **Frontend**: HTML5 + CSS3 + JavaScript
- **Server**: Uvicorn (ASGI server)
- **Image Processing**: Pillow
- **AI Integration**: Google Gemini (optional)

---

## 📚 Learning Path

1. **Start Here**: Open frontend at http://localhost:3000
2. **Try API**: Visit http://localhost:8001/docs
3. **Explore Code**: Check backend/main.py and frontend/script.js
4. **Customize**: Modify styles in frontend/styles.css
5. **Add Features**: Extend endpoints in backend/main.py

---

## 🚀 Next Steps

### To Enable Real AI
1. Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Run: `pip install google-generativeai`
3. Set: `$env:GOOGLE_API_KEY = "your_key"`
4. Uncomment AI code in backend/main.py

### To Deploy
- Backend: Heroku, AWS, Google Cloud, Azure
- Frontend: Netlify, Vercel, GitHub Pages
- See SETUP_GUIDE.md for detailed steps

### To Extend
- Add user authentication
- Connect to database
- Add more AI features
- Create mobile app
- Implement caching

---

## 🆘 Need Help?

1. **Check terminal output**: Error messages are detailed
2. **Review browser console**: F12 → Console tab
3. **Read SETUP_GUIDE.md**: Complete troubleshooting section
4. **Check API docs**: http://localhost:8001/docs
5. **Review backend code**: backend/main.py comments

---

## ✨ Project Status

✅ Backend Server: Running on port 8001
✅ Frontend UI: Ready at port 3000
✅ API Documentation: Available at /docs
✅ Mock AI Responses: Enabled
⏳ Real AI Integration: Needs API key

---

**Happy Fashion Coding! 👗🎨**

For detailed instructions, see SETUP_GUIDE.md
For project overview, see README.md
