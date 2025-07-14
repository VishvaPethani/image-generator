from PIL import Image
import io
import numpy as np

def image_to_bytes(image: Image.Image) -> bytes:
    """Convert PIL Image to bytes."""
    img_byte_arr = io.BytesIO()
    image.save(img_byte_arr, format='PNG')
    return img_byte_arr.getvalue()

def validate_image_size(image, max_size=(1024, 1024)):
    if image.size > max_size:
        image.thumbnail(max_size)
    return image

def resize_image(image: Image.Image, width: int, height: int) -> Image.Image:
    """Resize image while maintaining aspect ratio."""
    return image.resize((width, height), Image.LANCZOS)

def convert_to_grayscale(image: Image.Image) -> Image.Image:
    """Convert image to grayscale."""
    return image.convert('L')
