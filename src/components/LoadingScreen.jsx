import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';

const FullScreenLoader = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${theme.colors.background};
  background-image: ${theme.gradients.background};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: hidden;
`;

const QuestionMark = styled(motion.div)`
  font-size: 15rem;
  font-weight: bold;
  color: ${theme.colors.primaryLight};
  text-shadow: ${theme.shadows.glowStrong};
  user-select: none;
  
  @media (max-width: 768px) {
    font-size: 10rem;
  }
`;

const Spinner = styled(motion.div)`
  width: 100px;
  height: 100px;
  border: 8px solid ${theme.colors.primaryDark};
  border-top: 8px solid ${theme.colors.primaryLight};
  border-radius: 50%;
  position: relative;
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
    border-width: 6px;
  }
`;

const ExpandingOverlay = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: ${theme.colors.primaryLight};
  border-radius: 50%;
  box-shadow: ${theme.shadows.glowStrong};
  
  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const LoadingScreen = ({ onComplete }) => {
  const [stage, setStage] = useState('question'); // 'question' | 'spinner' | 'expanding' | 'complete'

  useEffect(() => {
    // Stage 1: Question mark appears and rotates (1.5s)
    const timer1 = setTimeout(() => {
      setStage('spinner');
    }, 1500);

    // Stage 2: Spinner appears and rotates (1.5s)
    const timer2 = setTimeout(() => {
      setStage('expanding');
    }, 3000);

    // Stage 3: Expanding overlay fills screen (1.5s)
    const timer3 = setTimeout(() => {
      setStage('complete');
      setTimeout(() => {
        onComplete();
      }, 300);
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const questionVariants = {
    initial: {
      opacity: 0,
      scale: 0.3,
      rotate: -180,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: [0, 360],
      transition: {
        opacity: { duration: 0.6 },
        scale: { 
          duration: 0.8, 
          type: 'spring',
          stiffness: 100,
          damping: 10,
        },
        rotate: {
          duration: 1.2,
          ease: 'easeInOut',
          repeat: Infinity,
        },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.3,
      rotate: 180,
      transition: {
        duration: 0.4,
        ease: 'easeIn',
      },
    },
  };

  const spinnerVariants = {
    initial: {
      opacity: 0,
      scale: 0.5,
      rotate: -180,
    },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 360,
      transition: {
        opacity: { duration: 0.4 },
        scale: { 
          duration: 0.5, 
          type: 'spring',
          stiffness: 150,
          damping: 12,
        },
        rotate: {
          duration: 0.8,
          ease: 'linear',
          repeat: Infinity,
        },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.3,
      },
    },
  };

  const expandingVariants = {
    initial: {
      scale: 0,
      opacity: 0.9,
    },
    animate: {
      scale: [1, 25, 35],
      opacity: [0.9, 0.7, 0],
      transition: {
        duration: 1.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const containerVariants = {
    initial: { opacity: 1 },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  return (
    <FullScreenLoader
      variants={containerVariants}
      initial="initial"
      exit="exit"
    >
      <AnimatePresence mode="wait">
        {stage === 'question' && (
          <QuestionMark
            key="question"
            variants={questionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            ?
          </QuestionMark>
        )}

        {stage === 'spinner' && (
          <Spinner
            key="spinner"
            variants={spinnerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />
        )}
      </AnimatePresence>

      {stage === 'expanding' && (
        <ExpandingOverlay
          variants={expandingVariants}
          initial="initial"
          animate="animate"
        />
      )}
    </FullScreenLoader>
  );
};

export default LoadingScreen;

