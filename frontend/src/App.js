import React, { useState, useEffect } from 'react';
import './App.css';

const AIImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);

  const suggestions = [
    "A majestic dragon soaring through a starlit sky",
    "Cute robot playing with butterflies in a garden",
    "Fantasy castle on a floating island",
    "Cyberpunk city at night with neon lights",
    "Peaceful zen garden with cherry blossoms",
    "Steampunk airship flying over Victorian London",
    "Mystical forest with glowing mushrooms",
    "Space station orbiting a colorful nebula"
  ];

  // Rotate placeholder text
  useEffect(() => {
    const interval = setInterval(() => {
      if (prompt === '') {
        setCurrentPlaceholder(prev => (prev + 1) % suggestions.length);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [prompt, suggestions.length]);

  const generateImage = async () => {
    if (!prompt.trim()) {
      alert('Please enter a description for your image');
      return;
    }

    if (isLoading) return;

    setIsLoading(true);
    setGeneratedImage(null);

    // Simulate API call
    setTimeout(() => {
      const imageUrl = `https://picsum.photos/400/400?random=${Date.now()}`;
      setGeneratedImage({
        url: imageUrl,
        prompt: prompt
      });
      setIsLoading(false);
    }, Math.random() * 3000 + 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      generateImage();
    }
  };

  const downloadImage = () => {
    alert('Download functionality would be implemented here!');
  };

  const shareImage = () => {
    alert('Share functionality would be implemented here!');
  };

  const FloatingIcon = ({ icon, style }) => (
    <i className={`${icon} floating-icon`} style={style}></i>
  );

  const Particles = () => {
    const particles = Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${3 + Math.random() * 4}s`
        }}
      />
    ));

    return <div className="particles-container">{particles}</div>;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 relative">
      <Particles />

      <div className="generator-card">
        <div className="card-header">
          <FloatingIcon 
            icon="fas fa-palette" 
            style={{ top: '10px', left: '20px', animationDelay: '0s' }} 
          />
          <FloatingIcon 
            icon="fas fa-magic" 
            style={{ top: '50px', right: '30px', animationDelay: '1s' }} 
          />
          <FloatingIcon 
            icon="fas fa-brush" 
            style={{ bottom: '20px', left: '40px', animationDelay: '2s' }} 
          />
          
          <h1 className="card-title">
            <i className="fas fa-robot me-2"></i>AI Image Generator
          </h1>
          <p className="card-subtitle">
            Transform your imagination into stunning visuals
          </p>
          <div className="mt-3">
            <span className="feature-badge">AI-Powered</span>
            <span className="feature-badge">High Quality</span>
            <span className="feature-badge">Instant Results</span>
          </div>
        </div>

        <div className="card-body" style={{ padding: '30px' }}>
          <div className="prompt-section">
            <h4 className="mb-3">
              <i className="fas fa-keyboard me-2" style={{ color: '#667eea' }}></i>
              Describe Your Vision
            </h4>
            <div className="input-group mb-3">
              <input
                type="text"
                className="prompt-input"
                placeholder={suggestions[currentPlaceholder]}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button
                className="generate-btn"
                onClick={generateImage}
                disabled={isLoading}
              >
                <i className={`fas ${isLoading ? 'fa-spinner fa-spin' : 'fa-magic'} me-2`}></i>
                {isLoading ? 'Generating...' : 'Generate Image'}
              </button>
            </div>

            <div className="row mt-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <small className="text-muted">
                  <i className="fas fa-lightbulb me-1"></i>
                  Try: "sunset over mountains", "cute robot", "fantasy castle"
                </small>
              </div>
              <div>
                <small className="text-muted">
                  <i className="fas fa-clock me-1"></i>
                  Generation takes 5-10 seconds
                </small>
              </div>
            </div>
          </div>

          <div className="image-display">
            {isLoading ? (
              <div className="text-center">
                <div className="loading-spinner"></div>
                <h5>Creating your masterpiece...</h5>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
            ) : generatedImage ? (
              <div className="text-center">
                <img 
                  src={generatedImage.url} 
                  alt="Generated image" 
                  className="generated-image"
                />
                <div className="mt-3">
                  <h5>✨ Image Generated Successfully!</h5>
                  <p className="text-muted">Prompt: "{generatedImage.prompt}"</p>
                </div>
              </div>
            ) : (
              <div className="image-placeholder">
                <i className="fas fa-image fa-3x mb-3 text-muted"></i>
                <p>Your generated image will appear here</p>
                <small className="text-muted">Enter a prompt and click generate to get started</small>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="interaction-hint">
        <i className="fas fa-magic me-2"></i>
        Enter your prompt and create!
      </div>

      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet" />
    </div>
  );
};

export default AIImageGenerator;