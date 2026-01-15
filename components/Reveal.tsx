import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  className?: string;
  delay?: number; // in seconds
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = '100%', 
  className = "",
  delay = 0 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        // Reset state saat elemen keluar viewport agar animasi bisa main lagi nanti
        setIsVisible(false);
      }
    }, { 
      threshold: 0.15, 
      rootMargin: "0px 0px -50px 0px" 
    });

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width }} className={`${className} relative`}>
       <div
         // Gunakan delay hanya saat muncul (isVisible=true). Saat hilang, set 0s agar responsif.
         style={{ transitionDelay: isVisible ? `${delay}s` : '0s' }}
         className={`transition-all duration-700 ease-out transform ${
           isVisible 
             ? 'opacity-100 translate-y-0 filter blur-0' 
             : 'opacity-0 translate-y-8 filter blur-[2px]' 
         }`}
       >
         {children}
       </div>
    </div>
  );
};

export default Reveal;