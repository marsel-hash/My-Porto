import React, { useEffect, useState } from 'react';

const ScrollProgress: React.FC = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      // Prevent division by zero
      const progress = totalHeight > 0 ? (scrollPosition / totalHeight) * 100 : 0;
      setScrollWidth(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[60] bg-transparent pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-500 shadow-[0_0_10px_rgba(217,70,239,0.7)] transition-all duration-150 ease-out"
        style={{ width: `${scrollWidth}%` }}
      />
    </div>
  );
};

export default ScrollProgress;