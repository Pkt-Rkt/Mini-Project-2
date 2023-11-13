import React from 'react';
import Gauge from './Gauge';

const Speedometer = ({ speed }) => {
  const maxSpeed = 280;

  return (
    <div className="gauge-container">
      <h2>Speedometer</h2>
      <Gauge value={speed} max={maxSpeed} />
    </div>
  );
};

export default Speedometer;
