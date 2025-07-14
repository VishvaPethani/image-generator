import { useState } from 'react';

const useStylePresets = (initialStyles) => {
  const [styles] = useState(initialStyles);
  const [selectedStyle, setSelectedStyle] = useState(null);

  const selectStyle = (style) => {
    setSelectedStyle(style);
  };

  return { styles, selectedStyle, selectStyle };
};

export default useStylePresets;
