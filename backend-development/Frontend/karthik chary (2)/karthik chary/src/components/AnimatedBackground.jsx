import React, {
  useEffect
} from 'react';

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from 'framer-motion';


// CYBER LASER
const CyberLaser = ({
  x,
  y,
  delay = 0,
  duration = 6
}) => {

  return (

    <motion.div

      style={{
        left: x,
        top: y
      }}

      className="absolute w-[1.5px] h-[90px] bg-gradient-to-t from-brand-secondary via-brand-primary to-transparent rotate-[45deg] blur-[0.5px] pointer-events-none z-0"

      animate={{
        x: [0, 350],
        y: [0, 350],
        opacity: [0, 0.7, 0]
      }}

      transition={{
        duration,
        repeat: Infinity,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay
      }}
    />
  );
};


// GLASS ORB
const GlassOrb3D = ({
  size = 80,
  x,
  y,
  delay = 0,
  duration = 25,
  style
}) => {

  return (

    <motion.div

      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        ...style
      }}

      className="absolute pointer-events-none rounded-full z-0 overflow-hidden"

      animate={{
        y: [0, -40, 0],
        x: [0, 20, 0],
        scale: [1, 1.05, 1]
      }}

      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    >

      {/* SURFACE */}
      <div className="absolute inset-0 rounded-full border border-white/15 bg-white/[0.02] backdrop-blur-[2px] shadow-[inset_0_4px_12px_rgba(255,255,255,0.12),0_12px_32px_rgba(0,0,0,0.4)]"></div>

      {/* HIGHLIGHT */}
      <div className="absolute top-[8%] left-[12%] w-[35%] h-[35%] rounded-full bg-gradient-to-br from-white/20 to-transparent blur-[1px]"></div>

      {/* REFRACTION */}
      <div className="absolute bottom-[5%] right-[5%] w-[45%] h-[45%] rounded-full bg-gradient-to-tr from-brand-secondary/15 to-transparent blur-[4px]"></div>

    </motion.div>
  );
};


// NEON BUBBLE
const NeonBubble = ({
  size = 20,
  x,
  y,
  delay = 0,
  duration = 18,
  style
}) => {

  return (

    <motion.div

      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        ...style
      }}

      className="absolute pointer-events-none rounded-full bg-gradient-to-tr from-brand-secondary/10 to-brand-primary/10 border border-brand-secondary/20 shadow-[0_0_12px_rgba(6,182,212,0.15)] z-0"

      animate={{
        y: [0, -120, 0],
        opacity: [0.1, 0.45, 0.1],
        scale: [0.9, 1.1, 0.9]
      }}

      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
    />
  );
};


// HOLOGRAPHIC RING
const HolographicRing = ({
  size = 260,
  x,
  y,
  duration = 55,
  dash = "5,5",
  style
}) => {

  return (

    <motion.div

      style={{
        left: x,
        top: y,
        width: size,
        height: size,
        ...style
      }}

      className="absolute pointer-events-none opacity-20 z-0"

      animate={{
        rotate: [0, 360],
        scale: [1, 1.06, 1]
      }}

      transition={{
        rotate: {
          duration,
          repeat: Infinity,
          ease: "linear"
        },

        scale: {
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }
      }}
    >

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="w-full h-full"
      >

        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="0.8"
          strokeDasharray={dash}
        />

        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="0.3"
          strokeDasharray="2,2"
          opacity="0.5"
        />

      </svg>

    </motion.div>
  );
};


// MAIN COMPONENT
export const AnimatedBackground = () => {

  // MOTION VALUES
  const mouseX =
    useMotionValue(0);

  const mouseY =
    useMotionValue(0);

  // SPRINGS
  const springX =
    useSpring(mouseX, {

      stiffness: 45,

      damping: 18
    });

  const springY =
    useSpring(mouseY, {

      stiffness: 45,

      damping: 18
    });

  // PARALLAX
  const deepX =
    useTransform(
      springX,
      (v) => v * -0.015
    );

  const deepY =
    useTransform(
      springY,
      (v) => v * -0.015
    );

  const mediumX =
    useTransform(
      springX,
      (v) => v * -0.035
    );

  const mediumY =
    useTransform(
      springY,
      (v) => v * -0.035
    );

  const closeX =
    useTransform(
      springX,
      (v) => v * -0.06
    );

  const closeY =
    useTransform(
      springY,
      (v) => v * -0.06
    );

  // OPTIMIZED MOUSE TRACKING
  useEffect(() => {

    let frameId = null;

    const handleMouseMove = (e) => {

      if(frameId){

        cancelAnimationFrame(frameId);
      }

      frameId =
        requestAnimationFrame(() => {

          const centX =
            window.innerWidth / 2;

          const centY =
            window.innerHeight / 2;

          mouseX.set(
            e.clientX - centX
          );

          mouseY.set(
            e.clientY - centY
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

        cancelAnimationFrame(frameId);
      }

      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };

  }, [mouseX, mouseY]);

  return (

    <div

      className="fixed inset-0 w-full h-full -z-50 bg-[#02040b] overflow-hidden pointer-events-none select-none"

      style={{
        willChange: 'transform'
      }}
    >

      {/* DEEP LAYER */}
      <motion.div

        style={{
          x: deepX,
          y: deepY
        }}

        className="absolute inset-0 w-full h-full"
      >

        {/* BACKPLATE */}
        <div

          className="absolute inset-0 bg-cover bg-center opacity-[0.04] mix-blend-color-dodge"

          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80')"
          }}
        />

        {/* GLOW MESH */}
        <div className="absolute inset-0">

          <motion.div

            animate={{
              scale: [1, 1.2, 0.9, 1],
              opacity: [0.18, 0.32, 0.25, 0.18],
              rotate: [0, 90, 180, 360]
            }}

            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut"
            }}

            className="absolute top-[-15%] left-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-radial from-[#7c3aed]/20 to-transparent blur-[90px]"
          />

          <motion.div

            animate={{
              scale: [1.1, 0.9, 1.2, 1.1],
              opacity: [0.15, 0.28, 0.22, 0.15],
              rotate: [360, 270, 90, 0]
            }}

            transition={{
              duration: 34,
              repeat: Infinity,
              ease: "easeInOut"
            }}

            className="absolute bottom-[-15%] right-[-15%] w-[60%] h-[60%] rounded-full bg-gradient-radial from-[#06b6d4]/15 to-transparent blur-[90px]"
          />

          <div className="absolute top-[35%] left-[30%] w-[45%] h-[45%] rounded-full bg-gradient-radial from-[#c084fc]/8 to-transparent blur-[80px]" />

        </div>

      </motion.div>

      {/* MEDIUM LAYER */}
      <motion.div

        style={{
          x: mediumX,
          y: mediumY
        }}

        className="absolute inset-0 w-full h-full"
      >

        <div className="absolute inset-0 cyber-grid-overlay opacity-[0.22]"></div>

        {/* LASERS */}
        <CyberLaser x="15%" y="10%" delay={1} duration={6} />
        <CyberLaser x="55%" y="18%" delay={3.5} duration={7} />
        <CyberLaser x="5%" y="45%" delay={0.2} duration={5.8} />
        <CyberLaser x="48%" y="35%" delay={2.2} duration={6.2} />

        {/* RINGS */}
        <HolographicRing size={320} x="8%" y="15%" />
        <HolographicRing size={240} x="75%" y="45%" />
        <HolographicRing size={200} x="35%" y="70%" />

        {/* BUBBLES */}
        <NeonBubble size={24} x="10%" y="75%" />
        <NeonBubble size={16} x="82%" y="85%" delay={3} />
        <NeonBubble size={20} x="50%" y="90%" delay={1} />
        <NeonBubble size={28} x="28%" y="80%" delay={5} />

      </motion.div>

      {/* CLOSE LAYER */}
      <motion.div

        style={{
          x: closeX,
          y: closeY
        }}

        className="absolute inset-0 w-full h-full"
      >

        <GlassOrb3D size={85} x="5%" y="20%" />
        <GlassOrb3D size={110} x="83%" y="12%" delay={4} />
        <GlassOrb3D size={75} x="12%" y="60%" delay={2} />
        <GlassOrb3D size={95} x="78%" y="68%" delay={6} />

      </motion.div>

      {/* SVG EFFECTS */}
      <svg
        className="absolute inset-0 w-full h-full opacity-15"
        xmlns="http://www.w3.org/2000/svg"
      >

        <defs>

          <linearGradient
            id="cyan-laser"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >

            <stop
              offset="0%"
              stopColor="#06b6d4"
              stopOpacity="0.6"
            />

            <stop
              offset="100%"
              stopColor="#0891b2"
              stopOpacity="0.02"
            />

          </linearGradient>

          <linearGradient
            id="ring-grad"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >

            <stop
              offset="0%"
              stopColor="#06b6d4"
              stopOpacity="0.4"
            />

            <stop
              offset="50%"
              stopColor="#8b5cf6"
              stopOpacity="0.2"
            />

            <stop
              offset="100%"
              stopColor="#c084fc"
              stopOpacity="0.05"
            />

          </linearGradient>

        </defs>

      </svg>

    </div>
  );
};

export default AnimatedBackground;