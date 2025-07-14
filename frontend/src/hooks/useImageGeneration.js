import { useState } from 'react';
import axios from 'axios';

const useImageGeneration = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateImage = async (prompt, style = null) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/generate', 
        { prompt, style },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (response.data.image) {
        // Convert the image bytes to a data URL
        const imageData = `data:image/png;base64,${response.data.image}`;
        setImageUrl(imageData);
      } else {
        setError('No image data received');
      }
    } catch (err) {
      console.error('Error generating image:', err);
      setError(err.response?.data?.error || 'Failed to generate image');
    } finally {
      setIsLoading(false);
    }
  };

  return { imageUrl, isLoading, error, generateImage };
};

export default useImageGeneration; 