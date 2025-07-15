# Image Generator

This project is a full-stack application that generates images based on user prompts. The backend is built with Python and the frontend is a React application.

## Features

*   Generate images from text prompts.

## Project Structure

```
image-generator/
├── backend/
│   ├── app.py
│   ├── ... (other backend files)
│   └── venv/
└── frontend/
    ├── public/
    ├── src/
    ├── package.json
    └── ... (other frontend files)
```

## Getting Started

### Prerequisites

*   Node.js and npm
*   Python 3.x

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd image-generator
    ```

2.  **Backend Setup:**
    ```sh
    cd backend
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

3.  **Frontend Setup:**
    ```sh
    cd ../frontend
    npm install
    ```

## Usage

1.  **Start the backend server:**
    ```sh
    cd backend
    source venv/bin/activate
    python app.py
    ```

2.  **Start the frontend development server:**
    ```sh
    cd frontend
    npm start
    ```

The application will be available at [http://localhost:3000](http://localhost:3000).
