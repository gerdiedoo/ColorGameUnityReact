// src/components/VerticalSlider.tsx
import React, { useState } from 'react';
import './VerticalSlider.css';

interface VerticalSliderProps {
  min: number;
  max: number;
  step: number;
  initialValue?: number;
  onChange: (value: number) => void; // Callback prop
}

const VerticalSlider: React.FC<VerticalSliderProps> = ({
  min,
  max,
  step,
  initialValue = min,
  onChange,
}) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange(newValue); // Call the callback with the new value
  };

  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="vertical-slider"
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'left bottom' }}
      />
      {/* <div className="slider-value">{value}</div> */}
    </div>
  );
};

export default VerticalSlider;