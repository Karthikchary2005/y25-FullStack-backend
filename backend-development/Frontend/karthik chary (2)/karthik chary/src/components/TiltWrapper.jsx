import React, {
  useRef
} from 'react';

import {
  motion,
  useSpring
} from 'framer-motion';


export const TiltWrapper = ({

  children,

  className = "",

  maxTilt = 15

}) => {

  // RAF
  const frameRef =
    useRef(null);

  // SPRINGS
  const springX =
    useSpring(0, {

      stiffness: 110,

      damping: 16
    });

  const springY =
    useSpring(0, {

      stiffness: 110,

      damping: 16
    });


  // MOUSE MOVE
  const handleMouseMove = (e) => {

    const el =
      e.currentTarget;

    const rect =
      el.getBoundingClientRect();

    const width =
      rect.width;

    const height =
      rect.height;

    const mouseX =

      e.clientX -
      rect.left -
      width / 2;

    const mouseY =

      e.clientY -
      rect.top -
      height / 2;

    // NORMALIZED ROTATION
    const rX =

      -(mouseY / (height / 2)) *
      maxTilt;

    const rY =

      (mouseX / (width / 2)) *
      maxTilt;

    // OPTIMIZED RAF
    if(frameRef.current){

      cancelAnimationFrame(
        frameRef.current
      );
    }

    frameRef.current =
      requestAnimationFrame(() => {

        springX.set(rX);

        springY.set(rY);
      });
  };


  // RESET
  const handleMouseLeave = () => {

    springX.set(0);

    springY.set(0);
  };


  return (

    <motion.div

      onMouseMove={handleMouseMove}

      onMouseLeave={handleMouseLeave}

      style={{

        rotateX: springX,

        rotateY: springY,

        transformStyle: "preserve-3d",

        perspective: 1000,

        willChange: "transform"
      }}

      className={className}
    >

      {/* 3D LAYER */}
      <div

        style={{

          transform: "translateZ(30px)",

          transformStyle: "preserve-3d"
        }}

        className="h-full"
      >

        {children}

      </div>

    </motion.div>
  );
};

export default TiltWrapper;