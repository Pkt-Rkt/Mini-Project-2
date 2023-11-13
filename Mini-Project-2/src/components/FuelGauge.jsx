import React from 'react';
import Gauge from './Gauge';

const FuelGauge = ({ fuelLevel }) => {
  const maxFuel = 100;

  return (
    <div className="gauge-container">
      <h2>Fuel Gauge</h2>
      <Gauge value={fuelLevel} max={maxFuel} />
    </div>
  );
};

export default FuelGauge;
