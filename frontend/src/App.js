<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Image Generator</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .main-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .generator-card {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            overflow: hidden;
            transition: all 0.3s ease;
        }

        .generator-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 30px 50px rgba(0, 0, 0, 0.15);
        }

        .card-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border: none;
        }

        .card-title {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .card-subtitle {
            opacity: 0.9;
            font-size: 1.1rem;
        }

        .style-preset {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            border: none;
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            font-weight: 600;
            transition: all 0.3s ease;
            margin: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .style-preset:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        }

        .style-preset.active {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transform: scale(1.05);
        }

        .prompt-section {
            padding: 30px;
        }

        .prompt-input {
            border: 2px solid #e9ecef;
            border-radius: 15px;
            padding: 15px 20px;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.8);
        }

        .prompt-input:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
            background: white;
        }

        .generate-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            color: white;
            padding: 15px 40px;
            border-radius: 25px;
            font-size: 1.2rem;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .generate-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
            background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
        }

        .generate-btn:disabled {
            opacity: 0.6;
            transform: none;
            cursor: not-allowed;
        }

        .image-display {
            padding: 30px;
            min-height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(248, 249, 250, 0.5);
            border-radius: 15px;
            margin: 20px;
        }

        .image-placeholder {
            text-align: center;
            color: #6c757d;
            font-size: 1.2rem;
        }

        .generated-image {
            max-width: 100%;
            max-height: 400px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
        }

        .loading-spinner {
            display: inline-block;
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        .floating-icon {
            position: absolute;
            color: rgba(255, 255, 255, 0.3);
            font-size: 2rem;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
        }

        .feature-badge {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            font-weight: 600;
            margin: 0 5px;
            display: inline-block;
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }

        .progress-bar {
            height: 6px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 3px;
            margin-top: 10px;
            animation: loading 2s linear infinite;
        }

        @keyframes loading {
            0% { width: 0%; }
            50% { width: 70%; }
            100% { width: 100%; }
        }

        .style-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }

        .interaction-hint {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            padding: 10px 15px;
            border-radius: 25px;
            font-size: 0.9rem;
            color: #667eea;
            font-weight: 600;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @media (max-width: 768px) {
            .card-title { font-size: 2rem; }
            .generator-card { margin: 10px; }
            .style-grid { grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); }
        }
    </style>
</head>
<body>
    <div class="main-container">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-xl-8">
                    <div class="generator-card">
                        <div class="card-header position-relative">
                            <i class="fas fa-palette floating-icon" style="top: 10px; left: 20px; animation-delay: 0s;"></i>
                            <i class="fas fa-magic floating-icon" style="top: 50px; right: 30px; animation-delay: 1s;"></i>
                            <i class="fas fa-brush floating-icon" style="bottom: 20px; left: 40px; animation-delay: 2s;"></i>
                            
                            <h1 class="card-title">
                                <i class="fas fa-robot me-3"></i>AI Image Generator
                            </h1>
                            <p class="card-subtitle">
                                Transform your imagination into stunning visuals
                            </p>
                            <div class="mt-3">
                                <span class="feature-badge">AI-Powered</span>
                                <span class="feature-badge">High Quality</span>
                                <span class="feature-badge">Instant Results</span>
                            </div>
                        </div>

                        <div class="card-body">
                            <div class="prompt-section">
                                <h4 class="mb-3">
                                    <i class="fas fa-paint-brush me-2 text-primary"></i>
                                    Choose Your Style
                                </h4>
                                <div class="style-grid">
                                    <button class="btn style-preset active" data-style="realistic">
                                        <i class="fas fa-camera me-2"></i>Realistic
                                    </button>
                                    <button class="btn style-preset" data-style="cartoon">
                                        <i class="fas fa-laugh me-2"></i>Cartoon
                                    </button>
                                    <button class="btn style-preset" data-style="abstract">
                                        <i class="fas fa-shapes me-2"></i>Abstract
                                    </button>
                                    <button class="btn style-preset" data-style="anime">
                                        <i class="fas fa-star me-2"></i>Anime
                                    </button>
                                    <button class="btn style-preset" data-style="oil-painting">
                                        <i class="fas fa-palette me-2"></i>Oil Painting
                                    </button>
                                    <button class="btn style-preset" data-style="cyberpunk">
                                        <i class="fas fa-robot me-2"></i>Cyberpunk
                                    </button>
                                </div>

                                <h4 class="mb-3 mt-4">
                                    <i class="fas fa-keyboard me-2 text-primary"></i>
                                    Describe Your Vision
                                </h4>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control prompt-input" 
                                           placeholder="A majestic dragon soaring through a starlit sky..."
                                           id="promptInput">
                                    <button class="btn generate-btn" type="button" id="generateBtn">
                                        <i class="fas fa-magic me-2"></i>Generate Image
                                    </button>
                                </div>

                                <div class="row mt-3">
                                    <div class="col-md-6">
                                        <small class="text-muted">
                                            <i class="fas fa-lightbulb me-1"></i>
                                            Try: "sunset over mountains", "cute robot", "fantasy castle"
                                        </small>
                                    </div>
                                    <div class="col-md-6 text-end">
                                        <small class="text-muted">
                                            <i class="fas fa-clock me-1"></i>
                                            Generation takes 5-10 seconds
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <div class="image-display" id="imageDisplay">
                                <div class="image-placeholder">
                                    <i class="fas fa-image fa-3x mb-3 text-muted"></i>
                                    <p>Your generated image will appear here</p>
                                    <small class="text-muted">Enter a prompt and click generate to get started</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="interaction-hint">
            <i class="fas fa-mouse-pointer me-2"></i>
            Click styles to change them!
        </div>
    </div>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script>
        class ImageGenerator {
            constructor() {
                this.selectedStyle = 'realistic';
                this.isLoading = false;
                this.initializeEventListeners();
            }

            initializeEventListeners() {
                // Style preset selection
                document.querySelectorAll('.style-preset').forEach(btn => {
                    btn.addEventListener('click', (e) => this.selectStyle(e.target));
                });

                // Generate button
                document.getElementById('generateBtn').addEventListener('click', () => {
                    this.generateImage();
                });

                // Enter key in prompt input
                document.getElementById('promptInput').addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        this.generateImage();
                    }
                });

                // Dynamic prompt suggestions
                this.addPromptSuggestions();
            }

            selectStyle(button) {
                // Remove active class from all buttons
                document.querySelectorAll('.style-preset').forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                button.classList.add('active');
                this.selectedStyle = button.dataset.style;
                
                // Add feedback animation
                button.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 200);
            }

            generateImage() {
                const prompt = document.getElementById('promptInput').value.trim();
                
                if (!prompt) {
                    this.showError('Please enter a description for your image');
                    return;
                }

                if (this.isLoading) return;

                this.isLoading = true;
                this.showLoading();
                
                // Simulate API call
                setTimeout(() => {
                    this.showGeneratedImage(prompt);
                    this.isLoading = false;
                }, Math.random() * 3000 + 2000); // 2-5 seconds
            }

            showLoading() {
                const displayDiv = document.getElementById('imageDisplay');
                displayDiv.innerHTML = `
                    <div class="text-center">
                        <div class="loading-spinner mb-3"></div>
                        <h5>Creating your masterpiece...</h5>
                        <p class="text-muted">Style: ${this.selectedStyle.charAt(0).toUpperCase() + this.selectedStyle.slice(1)}</p>
                        <div class="progress mt-3" style="height: 6px;">
                            <div class="progress-bar" role="progressbar"></div>
                        </div>
                    </div>
                `;

                // Update generate button
                const generateBtn = document.getElementById('generateBtn');
                generateBtn.disabled = true;
                generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Generating...';
            }

            showGeneratedImage(prompt) {
                const displayDiv = document.getElementById('imageDisplay');
                
                // Create placeholder image with dynamic content
                const imageUrl = `https://picsum.photos/400/400?random=${Date.now()}`;
                
                displayDiv.innerHTML = `
                    <div class="text-center">
                        <img src="${imageUrl}" alt="Generated image" class="generated-image mb-3">
                        <div class="mt-3">
                            <h5>✨ Image Generated Successfully!</h5>
                            <p class="text-muted">Prompt: "${prompt}"</p>
                            <p class="text-muted">Style: ${this.selectedStyle.charAt(0).toUpperCase() + this.selectedStyle.slice(1)}</p>
                            <div class="mt-3">
                                <button class="btn btn-primary me-2" onclick="this.downloadImage()">
                                    <i class="fas fa-download me-2"></i>Download
                                </button>
                                <button class="btn btn-outline-primary" onclick="this.shareImage()">
                                    <i class="fas fa-share me-2"></i>Share
                                </button>
                            </div>
                        </div>
                    </div>
                `;

                // Reset generate button
                const generateBtn = document.getElementById('generateBtn');
                generateBtn.disabled = false;
                generateBtn.innerHTML = '<i class="fas fa-magic me-2"></i>Generate Image';

                // Add success animation
                displayDiv.style.animation = 'none';
                setTimeout(() => {
                    displayDiv.style.animation = 'fadeIn 0.5s ease-in-out';
                }, 10);
            }

            showError(message) {
                const displayDiv = document.getElementById('imageDisplay');
                displayDiv.innerHTML = `
                    <div class="text-center text-danger">
                        <i class="fas fa-exclamation-triangle fa-3x mb-3"></i>
                        <h5>Oops! Something went wrong</h5>
                        <p>${message}</p>
                    </div>
                `;
                
                // Shake animation
                displayDiv.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    displayDiv.style.animation = '';
                }, 500);
            }

            addPromptSuggestions() {
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

                const input = document.getElementById('promptInput');
                let suggestionIndex = 0;

                // Add placeholder rotation
                setInterval(() => {
                    if (input.value === '') {
                        input.placeholder = suggestions[suggestionIndex];
                        suggestionIndex = (suggestionIndex + 1) % suggestions.length;
                    }
                }, 3000);
            }

            downloadImage() {
                alert('Download functionality would be implemented here!');
            }

            shareImage() {
                alert('Share functionality would be implemented here!');
            }
        }

        // Add CSS for shake animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);

        // Initialize the app
        document.addEventListener('DOMContentLoaded', () => {
            new ImageGenerator();
        });

        // Add some interactive particles
        function createParticles() {
            const particles = document.createElement('div');
            particles.style.position = 'fixed';
            particles.style.top = '0';
            particles.style.left = '0';
            particles.style.width = '100%';
            particles.style.height = '100%';
            particles.style.pointerEvents = 'none';
            particles.style.zIndex = '-1';
            
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.background = 'rgba(255, 255, 255, 0.5)';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
                particle.style.animationDelay = Math.random() * 2 + 's';
                particles.appendChild(particle);
            }
            
            document.body.appendChild(particles);
        }

        createParticles();
    </script>
</body>
</html>