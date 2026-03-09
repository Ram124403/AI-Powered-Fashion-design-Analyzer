@echo off
REM Fashion AI Platform - Quick Start Script for Windows

echo ================================
echo Fashion AI Recommendation Platform
echo Quick Start Script
echo ================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.7 or higher from https://www.python.org/
    pause
    exit /b 1
)

echo [1/5] Creating virtual environment...
if not exist "venv" (
    python -m venv venv
    echo Virtual environment created!
) else (
    echo Virtual environment already exists!
)
echo.

echo [2/5] Activating virtual environment...
call venv\Scripts\activate.bat
echo Virtual environment activated!
echo.

echo [3/5] Installing dependencies...
cd backend
pip install -r requirements.txt
cd ..
echo Dependencies installed!
echo.

echo [4/5] Starting backend server...
echo Starting FastAPI server on http://localhost:8000
start cmd /k "cd backend && python main.py"
echo.

echo [5/5] Starting frontend server...
echo Starting HTTP server on http://localhost:3000
start cmd /k "cd frontend && python -m http.server 3000"
echo.

echo ================================
echo Setup Complete!
echo ================================
echo.
echo Backend API: http://localhost:8000
echo Frontend UI: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to close this window...
pause >nul
