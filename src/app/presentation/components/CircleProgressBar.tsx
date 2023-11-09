import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface CircleProgressBarProps {
  progress: number;
  size: number;
  strokeWidth: number;
  circleColor: string;
  progressColor: string;
  duration: number;
}

const CircleProgressBar: React.FC<CircleProgressBarProps> = ({ progress, size, strokeWidth, circleColor, progressColor, duration }) => {
  const controls = useAnimation();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = (1 - progress / 100) * circumference;

  useEffect(() => {
    controls.start({ strokeDashoffset: offset }, { duration });
  }, [progress, controls, offset, duration]);

  return (
    <div className='relative h-max w-max'>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={circleColor}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={progressColor}
          fill="none"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference, rotate: -90 }}
          animate={controls}
          style={{ transformOrigin: `${size / 2}px ${size / 2}px` }}
        />
      </svg>
      <p className='absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 text-4xl text-primaryText font-bold'><span className='text-sm'>%</span>{progress}</p>
    </div>
  );
}

export default CircleProgressBar;
