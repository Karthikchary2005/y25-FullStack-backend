import React, {
  useEffect,
  useState
} from 'react';

import {
  motion,
  useMotionValue,
  useSpring
} from 'framer-motion';


export const FloatingOrbs = () => {

  const [isMobile, setIsMobile] =
    useState(false);

  // MOUSE TRACKING
  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  // SMOOTH SPRINGS
  const springX =
    useSpring(mouseX, {

      stiffness: 50,

      damping: 18
    });

  const springY =
    useSpring(mouseY, {

      stiffness: 50,

      damping: 18
    });


  useEffect(() => {

    // MOBILE CHECK
    const media =
      window.matchMedia(
        '(max-width: 768px)'
      );

    setIsMobile(
      media.matches
    );

    const listener = (e) => {

      setIsMobile(
        e.matches
      );
    };

    media.addEventListener(
      'change',
      listener
    );

    // DISABLE MOUSE TRACKING ON MOBILE
    if (media.matches) {

      return () => {

        media.removeEventListener(
          'change',
          listener
        );
      };
    }

    // OPTIMIZED RAF MOUSE TRACKING
    let frameId = null;

    const handleMouseMove = (e) => {

      if(frameId){

        cancelAnimationFrame(
          frameId
        );
      }

      frameId =
        requestAnimationFrame(() => {

          mouseX.set(
            e.clientX - 100
          );

          mouseY.set(
            e.clientY - 100
          );
        });
    };

    window.addEventListener(

      'mousemove',

      handleMouseMove,

      { passive: true }
    );

    return () => {

      if(frameId){

        cancelAnimationFrame(
          frameId
        );
      }

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      media.removeEventListener(
        'change',
        listener
      );
    };

  }, [mouseX, mouseY]);


  return (

    <div className="fixed inset-0 w-full h-full -z-40 overflow-hidden pointer-events-none select-none">

      {/* CYAN ORB */}
      <div className="absolute top-[20%] right-[15%] w-[220px] h-[220px] bg-brand-secondary rounded-full glow-orb animate-orbit-1 opacity-60 blur-[70px]"></div>

      {/* VIOLET ORB */}
      <div className="absolute bottom-[25%] left-[10%] w-[260px] h-[260px] bg-brand-primary rounded-full glow-orb animate-orbit-2 opacity-50 blur-[80px]"></div>

      {/* ACCENT ORB */}
      <div className="absolute top-[60%] right-[40%] w-[180px] h-[180px] bg-brand-accent rounded-full glow-orb animate-orbit-3 opacity-45 blur-[65px]"></div>

      {/* MOUSE FOLLOW */}
      {!isMobile && (

        <motion.div

          className="absolute w-[180px] h-[180px] rounded-full bg-[#22d3ee] opacity-10 blur-[55px] mix-blend-screen"

          style={{
            x: springX,
            y: springY
          }}
        />
      )}

    </div>
  );
};

export default FloatingOrbs;