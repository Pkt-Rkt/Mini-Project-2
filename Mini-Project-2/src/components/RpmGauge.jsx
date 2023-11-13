import React from 'react';
import Gauge from './Gauge';

const RpmGauge = ({ rpm }) => {
  const maxRPM = 8000;

  return (
    <div className="gauge-container">
      <h2>RPM Gauge</h2>
      <Gauge value={rpm} max={maxRPM} />
    </div>
  );
};

export default RpmGauge;
