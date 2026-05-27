import React from 'react';

import {
  motion
} from 'framer-motion';


export const TechCube3D = () => {

  // FACE STYLE
  const faceStyle =

    "absolute w-20 h-20 bg-brand-secondary/5 border border-brand-secondary/30 rounded-lg flex flex-col items-center justify-center font-mono text-[9px] font-bold text-brand-secondary shadow-[0_0_10px_rgba(6,182,212,0.12)] backface-hidden select-none";


  return (

    <div

      className="w-28 h-28 flex items-center justify-center shrink-0"

      style={{
        perspective: "500px"
      }}
    >

      <motion.div

        animate={{

          rotateX: [0, 360],

          rotateY: [0, 360]
        }}

        transition={{

          duration: 18,

          repeat: Infinity,

          ease: "linear"
        }}

        style={{

          transformStyle: "preserve-3d",

          willChange: "transform"
        }}

        className="w-20 h-20 relative"
      >

        {/* FRONT */}
        <div

          className={faceStyle}

          style={{
            transform:
              "translateZ(40px)"
          }}
        >

          <span>

            RESOLVE

          </span>

          <span className="text-[7px] opacity-60">

            CORE

          </span>

        </div>


        {/* BACK */}
        <div

          className={faceStyle}

          style={{
            transform:
              "rotateY(180deg) translateZ(40px)"
          }}
        >

          <span>

            SECURE

          </span>

          <span className="text-[7px] text-brand-primary">

            AUTH

          </span>

        </div>


        {/* LEFT */}
        <div

          className={faceStyle}

          style={{
            transform:
              "rotateY(-90deg) translateZ(40px)"
          }}
        >

          <span>

            SQL

          </span>

          <span className="text-[7px] text-yellow-400">

            DATABASE

          </span>

        </div>


        {/* RIGHT */}
        <div

          className={faceStyle}

          style={{
            transform:
              "rotateY(90deg) translateZ(40px)"
          }}
        >

          <span>

            JSON

          </span>

          <span className="text-[7px] text-emerald-400">

            REST.API

          </span>

        </div>


        {/* TOP */}
        <div

          className={faceStyle}

          style={{
            transform:
              "rotateX(90deg) translateZ(40px)"
          }}
        >

          <span>

            SYSTEM

          </span>

          <span className="text-[7px] opacity-60">

            OPTIMAL

          </span>

        </div>


        {/* BOTTOM */}
        <div

          className={faceStyle}

          style={{
            transform:
              "rotateX(-90deg) translateZ(40px)"
          }}
        >

          <span>

            AI.SWEEP

          </span>

          <span className="text-[7px] text-red-400">

            ANOMALY

          </span>

        </div>

      </motion.div>

    </div>
  );
};

export default TechCube3D;