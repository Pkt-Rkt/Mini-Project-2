import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import RpmGauge from './components/RpmGauge';
import Speedometer from './components/Speedometer';
import WaterTempGauge from './components/WaterTempGauge';
import FuelGauge from './components/FuelGauge';

const MAX_RPM = 8500;
const MAX_SPEED = 230;
const MAX_WATER_TEMP = 93;
const FUEL_DECREMENT = 0.5;
const START_INTERVAL = 200;
const ACCELERATOR_RPM_INCREMENT = 150;
const BRAKE_RPM_DECREMENT = 50;
const SPEED_INCREMENT_ACCELERATOR = 1;
const SPEED_INCREMENT_BRAKE = 2;
const STOP_INTERVAL = 100;
const DECREMENT_STEP = 2;

function App() {
  const [rpm, setRPM] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [waterTemp, setWaterTemp] = useState(0);
  const [fuelLevel, setFuelLevel] = useState(100);
  const [isAcceleratorPressed, setIsAcceleratorPressed] = useState(false);
  const [isBrakePressed, setIsBrakePressed] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  const intervalRef = useRef(null); // Ref to hold the interval ID

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  const updateRPM = (increment) => {
    setRPM((prevRPM) => {
      let newRPM = prevRPM + increment;
      if (newRPM < 0) newRPM = 0;
      if (newRPM > MAX_RPM) newRPM = MAX_RPM;
      return newRPM;
    });
  };

  const updateSpeed = () => {
    setSpeed((prevSpeed) => {
      if (isAcceleratorPressed) {
        let newSpeed = prevSpeed + rpm / 1000;
        if (newSpeed > MAX_SPEED) newSpeed = MAX_SPEED;
        return newSpeed;
      } else if (isBrakePressed) {
        let newSpeed = prevSpeed - rpm / 2000;
        if (newSpeed < 0) newSpeed = 0;
        return newSpeed;
      }
      return prevSpeed;
    });
  };

  const startCar = () => {
    console.log("Starting car...");
    setIsStarting(true);
    setIsStopping(false);
  
    const initialTemp = 0;
    let temp = initialTemp;
    let fuel = 100;
  
    const rpmIncrement = (MAX_RPM - 0) / (MAX_WATER_TEMP - initialTemp);
    const fuelDecrement = 100 / (MAX_WATER_TEMP - initialTemp);
  
    clearInterval(intervalRef.current); // Clear existing interval
  
    intervalRef.current = setInterval(() => {
      setRPM((prevRPM) => {
        let newRPM = prevRPM + rpmIncrement;
        return newRPM <= MAX_RPM ? newRPM : MAX_RPM;
      });
  
      setWaterTemp((prevTemp) => {
        let newTemp = prevTemp + 1;
        return newTemp <= MAX_WATER_TEMP ? newTemp : MAX_WATER_TEMP;
      });
  
      setFuelLevel((prevFuel) => {
        let newFuel = prevFuel - fuelDecrement;
        return newFuel >= 0 ? newFuel : 0;
      });
  
      if (temp >= MAX_WATER_TEMP && rpm >= MAX_RPM && fuel <= 0) {
        console.log("Car reached maximum conditions. Stopping car...");
        setIsStarting(false);
        clearInterval(intervalRef.current);
      }
    }, START_INTERVAL);
  };
  

  const stopCar = () => {
    console.log("Stopping car...");
    setIsStopping(true);
    setIsStarting(false);

    const finalRPM = 0;
    const finalWaterTemp = 0;
    const finalSpeed = 0;

    const interval = setInterval(() => {
      if (isStopping) {
        setRPM((prevRPM) => {
          const newRPM = prevRPM - DECREMENT_STEP;
          return newRPM >= finalRPM ? newRPM : finalRPM;
        });

        setWaterTemp((prevTemp) => {
          const newTemp = prevTemp - DECREMENT_STEP;
          return newTemp >= finalWaterTemp ? newTemp : finalWaterTemp;
        });

        if (speed > finalSpeed) {
          setSpeed((prevSpeed) => {
            const newSpeed = prevSpeed - DECREMENT_STEP;
            return newSpeed >= finalSpeed ? newSpeed : finalSpeed;
          });
        }

        if (rpm <= 0) {
          console.log("Car stopped.");
          clearInterval(interval);
          setIsStopping(false);
        }
      }
    }, STOP_INTERVAL);
  };

  useEffect(() => {
    if (isAcceleratorPressed && isStarting) {
      const interval = setInterval(() => {
        updateRPM(ACCELERATOR_RPM_INCREMENT);
        updateSpeed(SPEED_INCREMENT_ACCELERATOR);
      }, 100);
      return () => clearInterval(interval);
    } else if (isBrakePressed && isStarting) {
      const interval = setInterval(() => {
        updateRPM(-BRAKE_RPM_DECREMENT);
        updateSpeed(SPEED_INCREMENT_BRAKE);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isAcceleratorPressed, isBrakePressed, isStarting]);

  return (
    <div className="App">
      <h1>Car Dashboard</h1>
      <div className="gauge-section">
        <RpmGauge rpm={rpm} />
        <Speedometer speed={speed} />
        <WaterTempGauge temperature={waterTemp} />
        <FuelGauge fuelLevel={fuelLevel} />
      </div>

      <div className="controls">
        <button onClick={isStarting ? stopCar : startCar}>
          {isStarting ? 'Stop' : 'Start'}
        </button>

        <button
          onMouseDown={() => setIsBrakePressed(true)}
          onMouseUp={() => setIsBrakePressed(false)}
        >
          Brake
        </button>

        <button
          onMouseDown={() => setIsAcceleratorPressed(true)}
          onMouseUp={() => setIsAcceleratorPressed(false)}
        >
          Accelerator
        </button>
      </div>
    </div>
  );
}

export default App;
