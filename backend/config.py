import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    # Stability AI settings
    STABILITY_API_KEY = os.getenv('STABILITY_API_KEY')
    # Use a widely available, high-quality model engine
    MODEL_ENGINE = "stable-diffusion-xl-1024-v1-0" 
    
    # Application settings
    MAX_IMAGE_SIZE = (1024, 1024)
    MAX_PROMPT_LENGTH = int(os.getenv("MAX_PROMPT_LENGTH", 1000))
