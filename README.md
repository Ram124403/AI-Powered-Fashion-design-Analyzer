# Fashion AI Recommendation Platform

A Generative AI platform that provides personalized fashion recommendations based on user preferences and visual inputs. It delivers intelligent outfit suggestions, styling guidance, and trend-based insights through AI-powered content generation and analysis.

## Features

- **Personalized Styling Advice**: Get tailored fashion recommendations
- **Outfit Recommendations**: AI-powered outfit suggestions
- **Image-based Analysis**: Upload photos for visual analysis
- **Trend-aware Suggestions**: Stay updated with latest fashion trends
- **Interactive UI**: User-friendly web interface

## Technologies Used

- **Backend**: FastAPI (Python)
- **Frontend**: HTML, CSS, JavaScript
- **AI Models**: Google Gemini 1.5 Flash (configured but using mock responses for demo)
- **Additional AI Tools**: Ready for integration with IBM AI, Hugging Face, Groq

## Setup Instructions

### Prerequisites

- Python 3.7+
- Google Gemini API key (for full AI functionality)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. (Optional) For full AI functionality, install Google Generative AI:
   ```bash
   pip install google-generativeai
   ```
   And set your API key:
   ```bash
   export GOOGLE_API_KEY="your_api_key_here"
   ```

4. Run the FastAPI server:
   ```bash
   python main.py
   ```

   The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Open `index.html` in your web browser, or serve it using a local server.

   For a simple HTTP server (Python):
   ```bash
   python -m http.server 3000
   ```

   Then open `http://localhost:3000` in your browser.

## Usage

1. Start the backend server
2. Open the frontend in your browser
3. Either upload an outfit image for analysis or describe your preferences in text
4. Click the appropriate button to get AI-powered recommendations

## API Endpoints

- `POST /analyze-outfit`: Analyze uploaded outfit image
- `POST /text-recommendation`: Get recommendations based on text preferences
- `GET /`: API root

## Current Implementation Notes

- The backend currently uses mock responses for demonstration purposes
- To enable full AI functionality, install `google-generativeai` and configure your API key
- The frontend includes drag-and-drop file upload and responsive design

## Troubleshooting

- **CORS Issues**: Make sure the backend allows requests from your frontend origin
- **API Key Errors**: Ensure your Google Gemini API key is set correctly
- **Image Upload Issues**: Check that the image file is valid and under size limits

## Future Enhancements

- Integration with additional AI models (IBM AI, Hugging Face, Groq)
- User authentication and profiles
- Fashion trend database
- Social features for sharing recommendations
- Mobile app development

## License

This project is for educational and demonstration purposes.