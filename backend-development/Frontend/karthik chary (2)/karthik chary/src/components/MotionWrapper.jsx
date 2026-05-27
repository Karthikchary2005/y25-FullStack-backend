import React from 'react';

import {
  motion
} from 'framer-motion';


// PAGE VARIANTS
const pageVariants = {

  initial: {

    opacity: 0,

    y: 12
  },

  animate: {

    opacity: 1,

    y: 0,

    transition: {

      duration: 0.45,

      ease: [0.16, 1, 0.3, 1],

      staggerChildren: 0.06
    }
  },

  exit: {

    opacity: 0,

    y: -8,

    transition: {

      duration: 0.25,

      ease: "easeIn"
    }
  }
};


// WRAPPER
export const MotionWrapper = ({
  children,
  className = ""
}) => {

  return (

    <motion.div

      variants={pageVariants}

      initial="initial"

      animate="animate"

      exit="exit"

      className={className}

      style={{
        willChange: 'transform, opacity'
      }}
    >

      {children}

    </motion.div>
  );
};


// ITEM
export const MotionItem = ({
  children,
  className = "",
  delay = 0
}) => {

  const itemVariants = {

    initial: {

      opacity: 0,

      y: 12
    },

    animate: {

      opacity: 1,

      y: 0,

      transition: {

        duration: 0.45,

        ease: [0.16, 1, 0.3, 1],

        delay
      }
    }
  };

  return (

    <motion.div

      variants={itemVariants}

      className={className}

      style={{
        willChange: 'transform, opacity'
      }}
    >

      {children}

    </motion.div>
  );
};

export default MotionWrapper;