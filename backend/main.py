from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
# import google.generativeai as genai  # Commented out due to installation issues
from PIL import Image
import io
import os
from collections import Counter

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

def analyze_image_colors(image):
    """Analyze dominant colors in the image by sampling the center and edges."""
    # Convert to RGB if necessary
    if image.mode == 'RGBA':
        image = image.convert('RGB')
    
    # Resize image for faster analysis, focusing on the main subject
    image_small = image.resize((200, 200))
    
    # Sample pixels from center area (where clothes usually are)
    width, height = image_small.size
    center_box = (width//4, height//4, 3*width//4, 3*height//4)
    center_image = image_small.crop(center_box)
    
    pixels = list(center_image.getdata())
    
    # Get dominant colors
    color_counts = Counter(pixels)
    dominant_colors = color_counts.most_common(5)
    
    return dominant_colors

def get_color_name(rgb):
    """Convert RGB to color name with better accuracy for dark colors."""
    r, g, b = rgb[:3]
    
    # Handle white
    if r > 200 and g > 200 and b > 200:
        return "White"
    
    # Handle black and very dark colors
    if r < 70 and g < 70 and b < 70:
        return "Black/Dark"
    
    # Handle light grays
    if r > 150 and g > 150 and b > 150 and (r == g == b or abs(r-g) < 20):
        return "Gray"
    
    # Calculate brightness
    brightness = (r + g + b) / 3
    
    # For dark colors, compare relative values
    if brightness < 100:
        # Dark navy blue - b is highest
        if b > r and b > g and (b - g) > 20:
            return "Navy Blue"
        # Dark brown/tan
        elif r > b and r > g and (r - g) > 20:
            return "Brown/Tan"
        # Dark green
        elif g > r and g > b:
            return "Dark Green"
        else:
            return "Black/Dark"
    
    # For medium/bright colors, use standard detection
    max_color = max(r, g, b)
    
    if r == max_color and r > g + 40 and r > b + 40:
        return "Red/Burgundy"
    elif g == max_color and g > r + 40 and g > b + 40:
        return "Green"
    elif b == max_color and b > r + 40 and b > g + 40:
        return "Blue"
    elif r > 150 and g > 100 and b < 80:
        return "Orange/Brown"
    elif r > 150 and g < 80 and b > 150:
        return "Purple"
    elif r > 180 and g < 100 and b < 100:
        return "Pink/Red"
    else:
        return "Neutral/Gray"

def generate_recommendations(dominant_colors, image_size):
    """Generate fashion recommendations based on analyzed colors."""
    color_names = [get_color_name(color) for color, _ in dominant_colors]
    # Remove duplicates while preserving order
    seen = set()
    unique_colors = []
    for color in color_names:
        if color not in seen:
            unique_colors.append(color)
            seen.add(color)
    
    color_description = ", ".join(unique_colors[:3])
    
    # Determine style and recommendations based on dominant colors
    if "Navy Blue" in color_names or "Black/Dark" in color_names:
        if len(unique_colors) > 1 and ("Brown" in color_names or "Tan" in color_names):
            style = "Classic formal and professional"
            outfit_type = "Business meetings, formal events, professional settings"
            suggestions = "This formal suit combination is elegant and timeless. Pair with a quality dress shirt, tie, and dress shoes. Add a leather briefcase or formal watch for completing the professional look."
        else:
            style = "Classic and sophisticated"
            outfit_type = "Formal wear and professional occasions"
            suggestions = "The dark color palette is perfect for formal events. Pair with crisp white or light-colored shirts. Add metallic or black accessories for a polished look."
        trends = "Navy and black suits are timeless classics that never go out of style. Tailored fits are always in trend."
    elif "Blue" in color_names:
        style = "Professional and versatile"
        outfit_type = "Business casual or smart casual"
        suggestions = "This blue tone works great with white, gray, or neutral colors. Add simple accessories to maintain the professional appearance."
        trends = "Blue is a universally flattering color that conveys trust and professionalism."
    elif "Brown/Tan" in color_names:
        style = "Warm and sophisticated"
        outfit_type = "Business casual or smart casual"
        suggestions = "Brown pairs beautifully with cream, white, or navy. Add earthy-toned accessories for a cohesive look."
        trends = "Earth tones are having a major moment in fashion right now."
    else:
        style = "Fashion-forward and vibrant"
        outfit_type = "Casual wear or contemporary style"
        suggestions = "This color combination is bold and confident. Balance with neutral accessories. The palette shows creative fashion sense."
        trends = "Bold color choices are great for making a statement and expressing personal style."
    
    response = f"""
    {{
      "description": "Your outfit features dominant colors: {color_description}. This creates a {style.lower()} aesthetic that is perfect for {outfit_type.lower()}.",
      "style": "{style}",
      "colors": "{color_description} work beautifully together. These colors convey professionalism and timeless elegance.",
      "suggestions": "{suggestions}",
      "trends": "{trends}",
      "occasions": "{outfit_type}"
    }}
    """
    
    return response

@app.post("/analyze-outfit")
async def analyze_outfit(file: UploadFile = File(...)):
    """
    Analyze uploaded outfit image and provide fashion recommendations.
    """
    try:
        # Read the uploaded file
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        # Analyze the actual image
        dominant_colors = analyze_image_colors(image)
        recommendations = generate_recommendations(dominant_colors, image.size)

        return JSONResponse(content={"recommendations": recommendations})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@app.post("/text-recommendation")
async def text_recommendation(preferences: dict):
    """
    Provide recommendations based on text preferences and gender.
    """
    try:
        user_preferences = preferences.get("preferences", "").lower()
        user_gender = preferences.get("gender", "male")
        
        # Determine style category
        if "formal" in user_preferences or "business" in user_preferences or "professional" in user_preferences:
            if user_gender == "male":
                outfits = [
                    "Classic tailored suit with white dress shirt",
                    "Navy blazer with charcoal dress pants",
                    "Three-piece suit with pocket watch"
                ]
                colors = ["Navy blue", "Black", "Charcoal gray", "White"]
                accessories = ["Leather dress shoes", "Silk tie", "Cufflinks", "Leather briefcase", "Dress watch"]
                tips = ["Ensure proper fit and tailoring", "Match shoes with belt color", "Keep patterns subtle and professional"]
            else:
                outfits = [
                    "Tailored blazer with dress trousers",
                    "Professional sheath dress with blazer",
                    "Pencil skirt with elegant blouse"
                ]
                colors = ["Navy", "Black", "Dark gray", "Cream", "Burgundy"]
                accessories = ["Pumps or elegant flats", "Structured handbag", "Pearl necklace", "Simple earrings"]
                tips = ["Choose structured silhouettes", "Opt for quality fabrics", "Keep jewelry minimal and elegant"]
                
        elif "casual" in user_preferences or "weekend" in user_preferences or "everyday" in user_preferences:
            if user_gender == "male":
                outfits = [
                    "Dark jeans with casual button-up shirt",
                    "Chinos with t-shirt and bomber jacket",
                    "Relaxed chinos with polo shirt"
                ]
                colors = ["Denim blue", "Khaki", "Gray", "Neutral tones", "Earth tones"]
                accessories = ["Casual sneakers", "Canvas backpack", "Simple watch", "Casual cap"]
                tips = ["Prioritize comfort", "Layer with jackets", "Keep colors coordinated but relaxed"]
            else:
                outfits = [
                    "Comfortable jeans with casual blouse",
                    "Linen pants with simple t-shirt",
                    "Casual dress with sneakers"
                ]
                colors = ["Denim", "Pastels", "Neutrals", "Soft earth tones"]
                accessories = ["Comfortable sneakers", "Casual bag", "Delicate jewelry", "Sun hat"]
                tips = ["Choose breathable fabrics", "Mix and match basics", "Add personality with accessories"]
                
        elif "party" in user_preferences or "night" in user_preferences or "event" in user_preferences or "night out" in user_preferences:
            if user_gender == "male":
                outfits = [
                    "Dark slim-fit suit with dress shirt",
                    "Smart black blazer with dark jeans",
                    "Dress pants with statement shirt"
                ]
                colors = ["Black", "Navy", "Deep burgundy", "Metallic accents"]
                accessories = ["Dress shoes", "Statement watch", "Silk scarf or pocket square", "Cologne"]
                tips = ["Choose tailored silhouettes", "Add subtle metallic touches", "Invest in quality dress shoes"]
            else:
                outfits = [
                    "Elegant cocktail dress with heels",
                    "Jumpsuit with statement jewelry",
                    "Sequined top with dress pants"
                ]
                colors = ["Black", "Jewel tones", "Rose gold", "Metallics"]
                accessories = ["Heels", "Clutch", "Statement necklace", "Bracelet", "Hair accessories"]
                tips = ["Choose one statement piece", "Balance colors appropriately", "Confidence is your best accessory"]
        else:
            if user_gender == "male":
                outfits = [
                    "Smart casual: Blazer with chinos and loafers",
                    "Henley with jeans and leather jacket",
                    "Oxford shirt with tailored shorts"
                ]
                colors = ["Navy", "Gray", "Beige", "Dark patterns"]
                accessories = ["Quality sneakers or loafers", "Leather belt", "Watch", "Simple chain"]
                tips = ["Mix casual and smart pieces", "Invest in versatile basics", "Proper fit is everything"]
            else:
                outfits = [
                    "Stylish jeans with trendy blouse and cardigan",
                    "Maxi skirt with fitted top and boots",
                    "Skorts with oversized shirt"
                ]
                colors = ["Neutrals", "Pastels", "Jewel tones", "Earth tones"]
                accessories = ["Stylish boots", "Structured bag", "Delicate jewelry", "Scarf or belt"]
                tips = ["Balance proportions", "Layer for dimension", "Express your personal style"]
        
        response = {
          "outfits": outfits,
          "colors": colors,
          "accessories": accessories,
          "tips": tips
        }

        return JSONResponse(content={"recommendations": response})

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating recommendations: {str(e)}")

@app.get("/")
async def root():
    return {"message": "Fashion AI Recommendation Platform API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)