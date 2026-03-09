#!/bin/bash
# Fashion AI Platform - Quick Start Script for macOS/Linux

echo "================================"
echo "Fashion AI Recommendation Platform"
echo "Quick Start Script"
echo "================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    echo "Please install Python 3.7 or higher from https://www.python.org/"
    exit 1
fi

echo "[1/5] Creating virtual environment..."
if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo "Virtual environment created!"
else
    echo "Virtual environment already exists!"
fi
echo ""

echo "[2/5] Activating virtual environment..."
source venv/bin/activate
echo "Virtual environment activated!"
echo ""

echo "[3/5] Installing dependencies..."
cd backend
pip install -r requirements.txt
cd ..
echo "Dependencies installed!"
echo ""

echo "[4/5] Starting backend server..."
echo "Starting FastAPI server on http://localhost:8000"
cd backend
python main.py &
BACKEND_PID=$!
cd ..
echo ""

echo "[5/5] Starting frontend server..."
echo "Starting HTTP server on http://localhost:3000"
cd frontend
python -m http.server 3000 &
FRONTEND_PID=$!
cd ..
echo ""

echo "================================"
echo "Setup Complete!"
echo "================================"
echo ""
echo "Backend API: http://localhost:8000"
echo "Frontend UI: http://localhost:3000"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the servers"
echo ""

# Wait for user interrupt
wait
