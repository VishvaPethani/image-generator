import React, { useState } from 'react';
import './PromptInput.css';

const PromptInput = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prompt);
    setPrompt('');
  };

  return (
    <form className="prompt-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the image you want..."
        required
      />
      <button type="submit">Generate</button>
    </form>
  );
};

export default PromptInput;
