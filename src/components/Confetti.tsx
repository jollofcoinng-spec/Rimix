import React from 'react';

// A simple component to render confetti particles
const Confetti: React.FC = () => {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800'];
  
  const particles = Array.from({ length: 150 }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}vw`,
      backgroundColor: colors[Math.floor(Math.random() * colors.length)],
      animationDelay: `${Math.random() * 3}s`,
      transform: `rotate(${Math.random() * 360}deg)`,
    };
    return <div key={i} className="confetti-piece" style={style}></div>;
  });

  return <>{particles}</>;
};

export default Confetti;
