import React from 'react';
import './ImageDisplay.css';

const ImageDisplay = ({ imageUrl, isLoading }) => {
  return (
    <div className="image-display">
      {isLoading ? (
        <div className="loading-spinner">Generating image...</div>
      ) : (
        imageUrl && <img src={imageUrl} alt="Generated" className="generated-image" />
      )}
    </div>
  );
};

export default ImageDisplay;
