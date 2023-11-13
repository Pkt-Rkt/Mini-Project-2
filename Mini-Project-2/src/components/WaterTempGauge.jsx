import React from 'react';
import Gauge from './Gauge';

const WaterTempGauge = ({ temperature }) => {
  const maxTemp = 93;
  const limitedTemperature = Math.min(temperature, maxTemp); // Ensure temperature does not exceed maxTemp

  return (
    <div className="gauge-container">
      <h2>Water Temperature</h2>
      <Gauge value={limitedTemperature} max={maxTemp} />
    </div>
  );
};

export default WaterTempGauge;
