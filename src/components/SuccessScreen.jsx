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
  background: linear-gradient(135deg, #1a0f1a 0%, #0f080f 50%, #1a0f1a 100%);
  border-radius: 12px;
  box-shadow: 
    inset 0 4px 20px rgba(0, 0, 0, 0.8),
    ${theme.shadows.dark},
    0 0 50px rgba(83, 52, 131, 0.5);
  z-index: 2;
  border: 4px solid #2a1a1a;
  
  /* Weathered wood texture */
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 4px,
      rgba(0, 0, 0, 0.25) 4px,
      rgba(0, 0, 0, 0.25) 5px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 12px,
      rgba(139, 69, 19, 0.15) 12px,
      rgba(139, 69, 19, 0.15) 13px
    ),
    linear-gradient(135deg, #2a1a1a 0%, #1a0f1a 50%, #2a1a1a 100%);
`;

const ChestBoard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  overflow: hidden;
`;

const ChestMetalBands = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ChestFeet = styled.div`
  position: absolute;
  bottom: -12px;
  left: 0;
  width: 100%;
  height: 12px;
  display: flex;
  justify-content: space-around;
  z-index: 1;
  
  &::before,
  &::after {
    content: '';
    width: 30px;
    height: 12px;
    background: linear-gradient(180deg, #1a0f1a 0%, #0f080f 100%);
    border-radius: 0 0 6px 6px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.9);
  }
  
  &::before {
    margin-left: 25px;
  }
  
  &::after {
    margin-right: 25px;
  }
`;

const MetalBand = styled.div`
  position: absolute;
  background: linear-gradient(180deg, #8b6914 0%, #5d4a1a 50%, #3d2a0a 100%);
  box-shadow: 
    inset 0 3px 8px rgba(255, 200, 100, 0.25),
    0 3px 12px rgba(0, 0, 0, 0.9);
  border-radius: 4px;
`;

const LidBand1 = styled(MetalBand)`
  top: 12px;
  left: 8%;
  width: 84%;
  height: 8px;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  z-index: 3;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    background: radial-gradient(circle, #cd853f 0%, #8b6914 100%);
    border-radius: 50%;
    box-shadow: inset 0 2px 3px rgba(255, 200, 100, 0.5);
  }
  
  &::before {
    left: 12%;
  }
  
  &::after {
    right: 12%;
  }
`;

const LidBand2 = styled(MetalBand)`
  top: 26px;
  left: 8%;
  width: 84%;
  height: 8px;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  z-index: 3;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    background: radial-gradient(circle, #cd853f 0%, #8b6914 100%);
    border-radius: 50%;
    box-shadow: inset 0 2px 3px rgba(255, 200, 100, 0.5);
  }
  
  &::before {
    left: 12%;
  }
  
  &::after {
    right: 12%;
  }
`;

const CornerStrap = styled(MetalBand)`
  width: 12px;
  height: 100%;
  z-index: 3;
  
  &::before {
    content: '';
    position: absolute;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #cd853f 0%, #8b6914 100%);
    border-radius: 50%;
    box-shadow: inset 0 2px 3px rgba(255, 200, 100, 0.5);
  }
`;

const LeftCornerStrap = styled(CornerStrap)`
  left: 0;
  border-radius: 12px 0 0 12px;
`;

const RightCornerStrap = styled(CornerStrap)`
  right: 0;
  border-radius: 0 12px 12px 0;
`;

const LockPlate = styled(motion.div)`
  position: absolute;
  top: 45%;
  left: 38.5%;
  transform: translateX(-50%);
  width: 90px;
  height: 90px;
  background: linear-gradient(180deg, #8b6914 0%, #5d4a1a 50%, #3d2a0a 100%);
  border-radius: 10px;
  box-shadow: 
    inset 0 3px 8px rgba(255, 200, 100, 0.25),
    0 4px 15px rgba(0, 0, 0, 0.9);
  z-index: 4;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 18px;
    background: #0f080f;
    border-radius: 0 0 6px 6px;
  }
`;

const PurpleOrb = styled(motion.div)`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(138, 43, 226, 0.95) 0%, rgba(75, 0, 130, 0.8) 70%, rgba(25, 25, 112, 0.6) 100%);
  box-shadow: 
    0 0 40px rgba(138, 43, 226, 0.9),
    0 0 80px rgba(138, 43, 226, 0.6),
    0 0 120px rgba(138, 43, 226, 0.3),
    inset 0 0 30px rgba(255, 255, 255, 0.25);
  z-index: 3;
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 
        0 0 40px rgba(138, 43, 226, 0.9),
        0 0 80px rgba(138, 43, 226, 0.6),
        0 0 120px rgba(138, 43, 226, 0.3),
        inset 0 0 30px rgba(255, 255, 255, 0.25);
    }
    50% {
      box-shadow: 
        0 0 50px rgba(138, 43, 226, 1),
        0 0 100px rgba(138, 43, 226, 0.8),
        0 0 150px rgba(138, 43, 226, 0.5),
        inset 0 0 35px rgba(255, 255, 255, 0.35);
    }
  }
`;

const OrbFrame = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95px;
  height: 95px;
  border: 5px solid;
  border-image: linear-gradient(180deg, #8b6914 0%, #5d4a1a 50%, #3d2a0a 100%) 1;
  border-radius: 50%;
  box-shadow: 
    inset 0 3px 8px rgba(255, 200, 100, 0.25),
    0 3px 12px rgba(0, 0, 0, 0.9);
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border-radius: 50%;
    background: linear-gradient(180deg, #cd853f 0%, #8b6914 50%, #5d4a1a 100%);
    z-index: -1;
  }
`;

const SideHandle = styled.div`
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 25px;
  height: 40px;
  background: linear-gradient(90deg, #8b6914 0%, #5d4a1a 50%, #3d2a0a 100%);
  border-radius: 12px;
  box-shadow: 
    inset 0 3px 8px rgba(255, 200, 100, 0.25),
    4px 0 12px rgba(0, 0, 0, 0.9);
  z-index: 3;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 15px;
    height: 28px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
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
  width: 400px;
  height: 50px;
  background: linear-gradient(180deg, #2a1a1a 0%, #1a0f1a 100%);
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: bottom center;
  z-index: 4;
  box-shadow: 
    inset 0 4px 12px rgba(0, 0, 0, 0.7),
    0 4px 20px rgba(0, 0, 0, 0.9);
  border: 4px solid #2a1a1a;
  border-bottom: none;
  
  /* Wood grain on lid */
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.2) 3px,
      rgba(0, 0, 0, 0.2) 4px
    ),
    linear-gradient(180deg, #2a1a1a 0%, #1a0f1a 100%);
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
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, ${theme.colors.primaryLight} 0%, rgba(138, 43, 226, 0.6) 100%);
  border-radius: 50%;
  box-shadow: 
    0 0 8px rgba(138, 43, 226, 0.6),
    0 0 16px rgba(138, 43, 226, 0.4),
    ${theme.shadows.glow};
  filter: blur(0.5px);
`;

const SuccessScreen = () => {
  const [lockOpened, setLockOpened] = useState(false);
  const [chestOpened, setChestOpened] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => {
      const randomX = Math.random();
      const randomY = Math.random();
      const randomOffsetX = (Math.random() - 0.5) * 200;
      const randomOffsetX2 = (Math.random() - 0.5) * 300;
      const randomDuration = 3 + Math.random() * 2; // 3-5 seconds
      const randomDelay = Math.random() * 2; // 0-2 seconds initial delay
      
      return {
        id: i,
        x: randomX * 100,
        y: randomY * 100,
        offsetX: randomOffsetX,
        offsetX2: randomOffsetX2,
        duration: randomDuration,
        delay: randomDelay,
      };
    })
  );

  useEffect(() => {
    // Auto-start animation on mount
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

  const lockPlateVariants = {
    initial: {
      y: 0,
    },
    moved: {
      y: '80%', // Move from 20% to 60% = 40% of parent height
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

  const getParticleVariants = (particle) => ({
    initial: {
      scale: 0.3,
      opacity: 0.2,
    },
    animate: {
      scale: [0.3, 1, 0.8, 0.3],
      opacity: [0.2, 0.9, 0.6, 0.2],
      y: [0, -80, -120, -150],
      x: [0, particle.offsetX, particle.offsetX2, particle.offsetX2 * 1.2],
      transition: {
        duration: particle.duration,
        delay: particle.delay,
        repeat: Infinity,
        repeatDelay: 0.3,
        ease: [0.4, 0, 0.2, 1], // Smooth easing curve
      },
    },
  });

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
              variants={getParticleVariants(particle)}
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
          <ChestFeet />
          <LeftCornerStrap />
          <RightCornerStrap />
          <LockPlate
            variants={lockPlateVariants}
            initial="initial"
            animate={chestOpened ? 'moved' : 'initial'}
          />
          <OrbFrame />
          <PurpleOrb />
          <SideHandle />
          <ChestLid>
            <LidBand1 />
            <LidBand2 />
          </ChestLid>
        </Chest>

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

