import React from 'react';

const Gauge = ({ value, max }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / max) * circumference;

  return (
    <svg width="120" height="120" className="gauge">
      <circle cx="60" cy="60" r={radius} className="gauge-circle" />
      <circle
        cx="60"
        cy="60"
        r={radius}
        className="gauge-progress"
        style={{ strokeDashoffset }}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="gauge-text">
        {value}
      </text>
    </svg>
  );
};

export default Gauge;
