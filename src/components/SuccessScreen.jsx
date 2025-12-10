import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';

const FullScreenContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${theme.colors.background};
  background-image: ${theme.gradients.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
`;

const AnimationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Lock = styled(motion.div)`
  width: 200px;
  height: 200px;
  background: ${theme.gradients.primary};
  border-radius: 30px;
  position: absolute;
  box-shadow: ${theme.shadows.glowStrong};
  z-index: 3;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    border: 6px solid ${theme.colors.text};
    border-radius: 50%;
    border-top-color: transparent;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    background: ${theme.colors.primaryDark};
    border-radius: 6px;
  }
`;

const Chest = styled(motion.div)`
  position: absolute;
  width: 400px;
  height: 300px;
  background: linear-gradient(135deg, #2a1f3d 0%, #1a1528 100%);
  border-radius: 15px;
  box-shadow: 
    inset 0 2px 15px rgba(0, 0, 0, 0.5),
    ${theme.shadows.dark},
    0 0 40px rgba(83, 52, 131, 0.4);
  z-index: 2;
  border: 3px solid ${theme.colors.primaryDark};
  
  /* Wood grain effect */
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.15) 3px,
      rgba(0, 0, 0, 0.15) 6px
    ),
    linear-gradient(135deg, #2a1f3d 0%, #1a1528 100%);
  
  /* Metal lid base */
  &::before {
    content: '';
    position: absolute;
    top: -18px;
    left: 50%;
    transform: translateX(-50%);
    width: 350px;
    height: 35px;
    background: linear-gradient(180deg, #4a3a5a 0%, #3a2a4a 50%, #2a1a3a 100%);
    border-radius: 15px 15px 0 0;
    box-shadow: 
      inset 0 3px 8px rgba(255, 255, 255, 0.1),
      0 3px 15px rgba(0, 0, 0, 0.6);
    border: 2px solid rgba(109, 75, 163, 0.4);
  }
  
  /* Lock plate */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70px;
    height: 70px;
    background: radial-gradient(circle, #4a3a5a 0%, #2a1a3a 100%);
    border-radius: 50%;
    box-shadow: 
      inset 0 3px 8px rgba(0, 0, 0, 0.5),
      ${theme.shadows.glowStrong},
      0 0 30px rgba(109, 75, 163, 0.7);
    border: 3px solid rgba(109, 75, 163, 0.6);
  }
`;

const ChestBoard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  overflow: hidden;
  
  /* Vertical boards */
  &::before {
    content: '';
    position: absolute;
    left: 25%;
    top: 0;
    width: 4px;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 3px 0 8px rgba(0, 0, 0, 0.6);
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 25%;
    top: 0;
    width: 4px;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: -3px 0 8px rgba(0, 0, 0, 0.6);
  }
`;

const ChestMetalBands = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  
  /* Horizontal metal bands */
  &::before {
    content: '';
    position: absolute;
    top: 25%;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, transparent, #4a3a5a 15%, #4a3a5a 85%, transparent);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.6);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 25%;
    left: 0;
    width: 100%;
    height: 6px;
    background: linear-gradient(90deg, transparent, #4a3a5a 15%, #4a3a5a 85%, transparent);
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.6);
  }
`;

const ChestHandle = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 20px;
  background: linear-gradient(180deg, #5a4a6a 0%, #3a2a4a 100%);
  border-radius: 10px 10px 0 0;
  box-shadow: 
    inset 0 3px 8px rgba(255, 255, 255, 0.1),
    0 3px 8px rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(109, 75, 163, 0.4);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 4px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 2px;
  }
`;

const ChestLid = styled(motion.div)`
  position: absolute;
  width: 350px;
  height: 35px;
  background: linear-gradient(180deg, #4a3a5a 0%, #3a2a4a 50%, #2a1a3a 100%);
  border-radius: 15px 15px 0 0;
  top: -18px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: bottom center;
  z-index: 4;
  box-shadow: 
    inset 0 3px 8px rgba(255, 255, 255, 0.1),
    0 3px 15px rgba(0, 0, 0, 0.6);
  border: 2px solid rgba(109, 75, 163, 0.4);
  border-bottom: none;
  
  /* Wood grain on lid */
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.1) 3px,
      rgba(0, 0, 0, 0.1) 6px
    ),
    linear-gradient(180deg, #4a3a5a 0%, #3a2a4a 50%, #2a1a3a 100%);
`;

const SuccessMessage = styled(motion.div)`
  position: absolute;
  bottom: 10%;
  text-align: center;
  z-index: 5;
`;

const MessageText = styled(motion.h1)`
  font-size: 3rem;
  color: ${theme.colors.text};
  text-shadow: ${theme.shadows.glowStrong};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const RewardText = styled(motion.h2)`
  font-size: 2rem;
  color: ${theme.colors.primaryLight};
  text-shadow: ${theme.shadows.glow};
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Particles = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Particle = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${theme.colors.primaryLight};
  border-radius: 50%;
  box-shadow: ${theme.shadows.glow};
`;

const SuccessScreen = () => {
  const [lockOpened, setLockOpened] = useState(false);
  const [chestOpened, setChestOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [particles] = useState(
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
  );

  useEffect(() => {
    // Sequence: lock opens -> chest opens -> message appears
    const timer1 = setTimeout(() => setLockOpened(true), 500);
    const timer2 = setTimeout(() => setChestOpened(true), 2000);
    const timer3 = setTimeout(() => setShowMessage(true), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const lockVariants = {
    closed: {
      rotateY: 0,
      scale: 1,
      opacity: 1,
    },
    opened: {
      rotateY: 180,
      scale: 0.5,
      opacity: 0,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  const chestLidVariants = {
    closed: {
      rotateX: 0,
    },
    opened: {
      rotateX: -120,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
  };

  const chestVariants = {
    initial: {
      scale: 0.8,
      opacity: 0.5,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const particleVariants = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      y: [0, -100],
      x: [
        0,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 300,
      ],
      transition: {
        duration: 2,
        delay: 3,
        repeat: Infinity,
        repeatDelay: 0.5,
      },
    },
  };

  return (
    <FullScreenContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <AnimationContainer>
        <Particles>
          {particles.map((particle) => (
            <Particle
              key={particle.id}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              variants={particleVariants}
              initial="initial"
              animate="animate"
            />
          ))}
        </Particles>

        <Chest
          variants={chestVariants}
          initial="initial"
          animate="visible"
        >
          <ChestBoard />
          <ChestMetalBands />
          <ChestHandle />
        </Chest>
        
        <ChestLid
          variants={chestLidVariants}
          initial="closed"
          animate={chestOpened ? 'opened' : 'closed'}
        />

        <Lock
          variants={lockVariants}
          initial="closed"
          animate={lockOpened ? 'opened' : 'closed'}
        />

        <AnimatePresence>
          {showMessage && (
            <SuccessMessage
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <MessageText>Sukces!</MessageText>
              <RewardText>
                Twoja nagroda to: Bilet na koncert Paliona
              </RewardText>
            </SuccessMessage>
          )}
        </AnimatePresence>
      </AnimationContainer>
    </FullScreenContainer>
  );
};

export default SuccessScreen;

