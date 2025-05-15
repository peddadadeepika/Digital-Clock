import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const AnalogClock = () => {
  const [isLightMode, setIsLightMode] = useState(false);
   const hourRef = useRef(null);
  const minuteRef = useRef(null);
  const secondRef = useRef(null);

   useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const minutes = now.getMinutes();
      const hours = now.getHours();

      const secondDeg = (seconds / 60) * 360;
      const minuteDeg = (minutes / 60) * 360 + (seconds / 60) * 6;
      const hourDeg = (hours % 12 / 12) * 360 + (minutes / 60) * 30;

      if (secondRef.current)
        secondRef.current.style.transform = `rotate(${secondDeg}deg)`;
      if (minuteRef.current)
        minuteRef.current.style.transform = `rotate(${minuteDeg}deg)`;
      if (hourRef.current)
        hourRef.current.style.transform = `rotate(${hourDeg}deg)`;
    };

    const intervalId = setInterval(updateClock, 1000);
    updateClock(); // Initial call

    return () => clearInterval(intervalId);
  }, []);

  const toggleMode = () => setIsLightMode(prev => !prev);

  useEffect(() => {
  document.body.classList.toggle('light-mode', isLightMode);
}, [isLightMode]);


  return (
    <div className={`container ${isLightMode ? 'light-mode' : ''}`}>
      <div className="clock">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="number" style={{ '--i': i + 1 }}>
            <span>{i + 1}</span>
          </div>
        ))}
        <div className="indicator">
          <div className="hour-hand" ref={hourRef} />
          <div className="minute-hand" ref={minuteRef}/>
          <div className="second-hand" ref={secondRef}  />
          <div className="center-point" />
        </div>
      </div>
      <div className="mode-toggle">
        <button onClick={toggleMode}>
          {isLightMode ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
      
    </div>
  );
};

export default AnalogClock;
