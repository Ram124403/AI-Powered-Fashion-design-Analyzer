# Fashion AI Recommendation Platform - Complete Setup Guide

## Project Overview

This is a Generative AI fashion recommendation platform that provides personalized outfit suggestions, image-based analysis, and trend-aware insights. The project consists of:
- **Backend**: FastAPI server (Python)
- **Frontend**: HTML5, CSS3, and JavaScript with a modern interactive UI
- **AI Integration**: Ready for Google Gemini and other AI models

---

## Prerequisites

Before getting started, ensure you have:
- **Python 3.7+** installed on your system
- **Git** (optional, for version control)
- **A text editor or IDE** (VS Code, PyCharm, etc.)
- **Browser** with JavaScript enabled

### Check Python Installation
```bash
python --version
```

---

## Project Structure

```
fashion-ai-platform/
├── venv/                          # Virtual environment (created after setup)
├── backend/
│   ├── main.py                   # FastAPI application
│   ├── requirements.txt          # Python dependencies
│   └── __pycache__/              # Python cache (auto-generated)
├── frontend/
│   ├── index.html                # Main HTML file
│   ├── styles.css                # CSS styling
│   ├── script.js                 # JavaScript functionality
│   └── assets/                   # Images and resources (optional)
├── README.md                      # Project overview
└── SETUP_GUIDE.md                # This file
```

---

## Installation Steps

### Step 1: Navigate to Project Directory

```bash
cd "c:\Users\VAAGDEVI\Documents\Titans Coder\fashion-ai-platform"
```

### Step 2: Create Virtual Environment

Create an isolated Python environment for the project:

```bash
python -m venv venv
```

This creates a `venv` folder containing:
- Python interpreter
- pip package manager
- Site-packages directory

### Step 3: Activate Virtual Environment

**On Windows (PowerShell):**
```bash
.\venv\Scripts\Activate.ps1
```

**On Windows (Command Prompt):**
```bash
venv\Scripts\activate.bat
```

**On macOS/Linux:**
```bash
source venv/bin/activate
```

After activation, you should see `(venv)` prefix in your terminal.

### Step 4: Install Backend Dependencies

Navigate to the backend folder and install required packages:

```bash
cd backend
pip install -r requirements.txt
```

**Installed Packages:**
- **FastAPI**: Modern Python web framework
- **Uvicorn**: ASGI web server
- **Python-Multipart**: File upload handling
- **Pillow**: Image processing library

### Step 5: Configure API Keys (Optional)

To use real AI models, set up your API key:

```bash
# On Windows (PowerShell)
$env:GOOGLE_API_KEY = "your_api_key_here"

# On Windows (Command Prompt)
set GOOGLE_API_KEY=your_api_key_here

# On macOS/Linux
export GOOGLE_API_KEY="your_api_key_here"
```

---

## Running the Application

### Option 1: Run Both Servers Simultaneously

**Terminal 1 - Backend Server:**
```bash
cd "c:\Users\VAAGDEVI\Documents\Titans Coder\fashion-ai-platform\backend"
python main.py
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

**Terminal 2 - Frontend Server:**
```bash
cd "c:\Users\VAAGDEVI\Documents\Titans Coder\fashion-ai-platform\frontend"
python -m http.server 3000
```

Expected output:
```
Serving HTTP on 0.0.0.0 port 3000 ...
```

### Option 2: Access Directly

1. **Backend API**: Open browser and go to:
   - http://localhost:8000
   - http://localhost:8000/docs (API documentation)
   - http://localhost:8000/redoc (Alternative API docs)

2. **Frontend UI**: Open browser and go to:
   - http://localhost:3000

---

## Using the Application

### Upload Outfit Image for Analysis

1. Go to http://localhost:3000
2. Click on the upload area or drag and drop an image
3. Select an outfit photo (PNG, JPG, JPEG)
4. Click "Analyze Outfit" button
5. Receive AI-powered recommendations

### Text-based Recommendations

1. Go to http://localhost:3000
2. In the "Describe Your Preferences" section, enter details like:
   - Style preference (casual, formal, bohemian, etc.)
   - Occasion (work, party, casual)
   - Colors you like
   - Budget or fit preferences
3. Click "Get Recommendations"
4. Receive personalized fashion suggestions

---

## API Endpoints

### Image Analysis
**Endpoint:** `POST /analyze-outfit`
**Content-Type:** multipart/form-data

**Request:**
```bash
curl -X POST "http://localhost:8000/analyze-outfit" \
  -H "accept: application/json" \
  -F "file=@/path/to/outfit.jpg"
```

**Response:**
```json
{
  "recommendations": "outfit analysis and suggestions..."
}
```

### Text Recommendations
**Endpoint:** `POST /text-recommendation`
**Content-Type:** application/json

**Request:**
```bash
curl -X POST "http://localhost:8000/text-recommendation" \
  -H "Content-Type: application/json" \
  -d '{"preferences": "casual summer outfit for beach"}'
```

**Response:**
```json
{
  "recommendations": "outfit suggestions based on preferences..."
}
```

### Health Check
**Endpoint:** `GET /`

**Response:**
```json
{
  "message": "Fashion AI Recommendation Platform API"
}
```

---

## File Descriptions

### Backend Files

#### `main.py`
Main FastAPI application with:
- CORS middleware configuration
- Image upload endpoint (`/analyze-outfit`)
- Text recommendation endpoint (`/text-recommendation`)
- Currently uses mock AI responses (easily replaceable)

#### `requirements.txt`
Lists all Python package dependencies:
```
fastapi           # Web framework
uvicorn           # ASGI server
python-multipart  # File handling
pillow            # Image processing
```

### Frontend Files

#### `index.html`
Main HTML structure with:
- Upload area with drag-and-drop
- Text input for preferences
- Results display section
- Responsive layout

#### `styles.css`
Modern styling featuring:
- Gradient backgrounds
- Smooth animations
- Responsive design (mobile-friendly)
- Interactive button states
- Professional color scheme

#### `script.js`
JavaScript functionality:
- File upload handling
- Drag-and-drop support
- API communication (fetch)
- Dynamic results rendering
- Error handling

---

## Virtual Environment Management

### What is a Virtual Environment?

A virtual environment isolates your project's dependencies from system-wide Python packages, preventing version conflicts.

### Common Commands

**Activate Virtual Environment:**
```bash
.\venv\Scripts\Activate.ps1  # Windows PowerShell
venv\Scripts\activate.bat    # Windows CMD
source venv/bin/activate     # macOS/Linux
```

**Deactivate Virtual Environment:**
```bash
deactivate
```

**Install Package:**
```bash
pip install package_name
```

**Install from Requirements:**
```bash
pip install -r requirements.txt
```

**Update Requirements File:**
```bash
pip freeze > requirements.txt
```

**Remove Virtual Environment:**
```bash
rmdir /s venv              # Windows
rm -rf venv                # macOS/Linux
```

---

## Troubleshooting

### Issue: Port Already in Use

**Error:**
```
error while attempting to bind on address ('0.0.0.0', 8000): only one usage of each socket address
```

**Solution:**
Kill the process using the port or change the port in `main.py`:

```python
# In main.py, change the port from 8000 to 8001:
uvicorn.run(app, host="0.0.0.0", port=8001)
```

### Issue: Virtual Environment Not Activating

**Problem:** `.\venv\Scripts\Activate.ps1` not working

**Solution:** Enable script execution:
```bash
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Issue: CORS Errors

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:** The backend already has CORS enabled. Check:
- Backend is running on port 8000
- Frontend is making requests to `http://localhost:8000`

### Issue: Image Upload Not Working

**Checklist:**
1. Backend server is running
2. File is a valid image (PNG, JPG, JPEG)
3. File size is reasonable (< 10MB)
4. Check browser console for errors (F12)

### Issue: No Recommendations Returned

**Note:** Currently using mock responses. To use real AI:
1. Install Google Generative AI: `pip install google-generativeai`
2. Set API key: `$env:GOOGLE_API_KEY = "your_key"`
3. Uncomment AI code in `main.py`

---

## Enabling Real AI Integration

### Step 1: Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key

### Step 2: Install Google Generative AI

```bash
pip install google-generativeai
```

### Step 3: Update Backend Code

In `main.py`, uncomment the AI configuration:

```python
import google.generativeai as genai

# Configure API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel('gemini-1.5-flash')

# Use in endpoints (replace mock responses)
response = model.generate_content([prompt, image])
```

### Step 4: Set Environment Variable

```bash
$env:GOOGLE_API_KEY = "your_api_key_here"
```

---

## Development Tips

### Running in Development Mode

For faster development with auto-reload:

```bash
uvicorn backend.main:app --reload --port 8000
```

### Testing API Endpoints

Use the built-in API documentation:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

### Debugging Frontend

Open browser DevTools (F12) to:
- View network requests
- Check console for errors
- Debug JavaScript

### Adding New Endpoints

In `main.py`:
```python
@app.post("/new-endpoint")
async def new_endpoint(request_data: dict):
    """Description of the endpoint"""
    return {"response": "data"}
```

---

## Deployment (Future)

To deploy this project:

### Backend Deployment Options
- Heroku
- AWS EC2
- Google Cloud Platform
- Azure App Service
- DigitalOcean

### Frontend Deployment Options
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### General Steps
1. Create production-grade requirements.txt
2. Set environment variables securely
3. Configure CORS for production domain
4. Use gunicorn for production server
5. Set up monitoring and logging

---

## Project Enhancement Ideas

- [ ] Add user authentication and profiles
- [ ] Implement database (SQLite, PostgreSQL)
- [ ] Add fashion trend database
- [ ] Create mobile app version
- [ ] Implement social sharing features
- [ ] Add payment integration
- [ ] Create admin dashboard
- [ ] Implement caching for recommendations
- [ ] Add multi-language support
- [ ] Create API rate limiting

---

## Support & Resources

### Useful Links
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Python Virtual Environments](https://docs.python.org/3/tutorial/venv.html)
- [Google Gemini API](https://ai.google.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

### Getting Help
- Check terminal error messages carefully
- Review browser console (DevTools)
- Verify all servers are running
- Check API endpoints in /docs

---

## Summary Checklist

Before running the project, ensure:
- [ ] Python 3.7+ installed
- [ ] Virtual environment created with `python -m venv venv`
- [ ] Virtual environment activated
- [ ] Dependencies installed with `pip install -r requirements.txt`
- [ ] No other service running on ports 8000 or 3000
- [ ] Backend server starts without errors
- [ ] Frontend loads in browser at http://localhost:3000

**Ready to go!** Open http://localhost:3000 and start getting fashion recommendations! 🎨👗