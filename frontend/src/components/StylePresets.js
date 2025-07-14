import React from 'react';
import './StylePresets.css';

const StylePresets = ({ styles, onSelect }) => {
  return (
    <div className="style-presets">
      <h3>Style Presets</h3>
      <div className="preset-grid">
        {styles.map((style) => (
          <button
            key={style.id}
            className="preset-button"
            onClick={() => onSelect(style)}
          >
            {style.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StylePresets;
