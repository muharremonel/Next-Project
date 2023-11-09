import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedNumber = ({ value }: { value: number }) => {
  const controls = useAnimation();
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }).then(() => {

      let start = 0;
      const interval = setInterval(() => {
        start++;
        setDisplayValue(start);
        if (start === value) {
          clearInterval(interval);
        }
      }, 1);
    });
  }, [controls, value]);

  if (!value || value <= 10) return <span>
    {value}
  </span>;

  return (
    <motion.span animate={controls}>
      {displayValue}
    </motion.span>
  );
};

export default AnimatedNumber