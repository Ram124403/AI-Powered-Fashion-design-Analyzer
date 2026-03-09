from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
# import google.generativeai as genai  # Commented out due to installation issues
from PIL import Image
import io
import os

app = FastAPI(title="Fashion AI Recommendation Platform")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Gemini AI
# genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))  # Set your API key in environment variable
# model = genai.GenerativeModel('gemini-1.5-flash')

@app.post("/analyze-outfit")
async def analyze_outfit(file: UploadFile = File(...)):
    """
    Analyze uploaded outfit image and provide fashion recommendations.
    """
    try:
        # Read the uploaded file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))

        # Mock response since AI library not available
        mock_response = """
        {
          "description": "A casual outfit consisting of a blue denim jacket over a white t-shirt, paired with dark jeans and sneakers.",
          "style": "Casual streetwear",
          "colors": "Blue, white, and black dominate the outfit with good contrast.",
          "suggestions": "Consider adding a belt to define the waist. The sneakers are a great choice for comfort.",
          "trends": "Denim jackets are trending this season. Layering is popular for transitional weather.",
          "occasions": "Perfect for casual outings, coffee dates, or weekend errands."
        }
        """

        return JSONResponse(content={"recommendations": mock_response})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/text-recommendation")
async def text_recommendation(preferences: dict):
    """
    Provide recommendations based on text preferences.
    """
    try:
        # Mock response
        mock_response = """
        {
          "outfits": ["Smart casual: Blazer with chinos", "Bohemian: Flowy dress with sandals", "Professional: Tailored suit"],
          "colors": ["Earth tones for fall", "Pastels for spring", "Neutrals for versatility"],
          "accessories": ["Minimalist watch", "Layered necklaces", "Crossbody bag"],
          "tips": ["Mix patterns carefully", "Invest in quality basics", "Accessorize to elevate any outfit"]
        }
        """

        return JSONResponse(content={"recommendations": mock_response})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Fashion AI Recommendation Platform API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)