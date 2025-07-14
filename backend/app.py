from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
import logging
import base64
from config import Config
from utils.image_utils import image_to_bytes
from models.image_model import ImageGenerator

app = Flask(__name__)
# Simplify CORS setup to be more permissive for development.
# This allows all origins, methods, and headers.
CORS(app)

app.config.from_object(Config)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize the image generator with Stability AI config
logger.info(f"Initializing image generator with Stability AI engine '{Config.MODEL_ENGINE}'")
generator = ImageGenerator(
    api_key=Config.STABILITY_API_KEY,
    engine=Config.MODEL_ENGINE
)

@app.route('/generate', methods=['POST'])
def generate_image():
    """Generate an image from a text prompt."""
    logger.info("Received request to /generate")
    try:
        data = request.get_json()
        if not data or 'prompt' not in data:
            logger.error("Request missing prompt.")
            return jsonify({"error": "No prompt provided"}), 400

        prompt = data.get('prompt')
        # Generate the image
        image = generator.generate(prompt)
        
        # Convert to bytes
        image_bytes = image_to_bytes(image)
        
        # Encode bytes to a base64 string for JSON transport
        image_base64 = base64.b64encode(image_bytes).decode('utf-8')
        
        logger.info("Successfully generated and sent image.")
        return jsonify({
            "image": image_base64,
            "prompt": prompt
        })
    except Exception as e:
        logger.error(f"Image generation failed: {str(e)}", exc_info=True)
        return jsonify({"error": str(e)}), 500

@app.errorhandler(HTTPException)
def handle_http_exception(e):
    """Handle HTTP exceptions and return JSON responses."""
    logger.error(f"HTTP Error: {e.description}")
    return jsonify({
        "error": e.description,
        "status_code": e.code
    }), e.code

@app.errorhandler(Exception)
def handle_exception(e):
    """Handle all other exceptions and return a 500 error."""
    logger.error(f"Internal Server Error: {str(e)}", exc_info=True)
    return jsonify({
        "error": "Internal Server Error",
        "status_code": 500
    }), 500

# Swagger UI setup (optional)
try:
    from flasgger import Swagger
    app.config['SWAGGER'] = {
        'title': 'Image Generator API',
        'description': 'API for generating images using AI models.',
        'version': '1.0'
    }
    Swagger(app)
except ImportError:
    logger.warning("Flasgger not installed. API documentation will not be available.")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
