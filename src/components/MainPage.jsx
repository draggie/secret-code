import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { theme } from '../theme';
import TermsAcceptance from './TermsAcceptance';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const Content = styled(motion.div)`
  text-align: center;
  z-index: 2;
  max-width: 800px;
`;

const Title = styled(motion.h1)`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: ${theme.colors.text};
  text-shadow: ${theme.shadows.glow};
  line-height: 1.4;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: 3rem;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const LockContainer = styled(motion.div)`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Lock = styled(motion.div)`
  width: 120px;
  height: 120px;
  background: ${theme.gradients.primary};
  border-radius: 20px;
  position: relative;
  box-shadow: ${theme.shadows.glowStrong};
  cursor: pointer;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border: 4px solid ${theme.colors.text};
    border-radius: 50%;
    border-top-color: transparent;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    background: ${theme.colors.primaryDark};
    border-radius: 4px;
  }
`;

const Chest = styled(motion.div)`
  position: absolute;
  width: 250px;
  height: 200px;
  background: linear-gradient(135deg, #1a0f1a 0%, #0f080f 50%, #1a0f1a 100%);
  border-radius: 8px;
  box-shadow: 
    inset 0 3px 15px rgba(0, 0, 0, 0.7),
    ${theme.shadows.dark},
    0 0 40px rgba(83, 52, 131, 0.4);
  z-index: 1;
  border: 3px solid #2a1a1a;
  
  /* Weathered wood texture */
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 3px,
      rgba(0, 0, 0, 0.2) 3px,
      rgba(0, 0, 0, 0.2) 4px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 8px,
      rgba(139, 69, 19, 0.1) 8px,
      rgba(139, 69, 19, 0.1) 9px
    ),
    linear-gradient(135deg, #2a1a1a 0%, #1a0f1a 50%, #2a1a1a 100%);
`;

const ChestLid = styled(motion.div)`
  position: absolute;
  top: 25px;
  left: 26px;
  transform: translateX(-50%);
  width: 248px;
  height: 32px;
  background: linear-gradient(180deg, #2a1a1a 0%, #1a0f1a 100%);
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  box-shadow: 
    inset 0 3px 10px rgba(0, 0, 0, 0.6),
    0 3px 15px rgba(0, 0, 0, 0.8);
  z-index: 2;
  border: 3px solid #2a1a1a;
  border-bottom: none;
  
  /* Wood grain on lid */
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.15) 2px,
      rgba(0, 0, 0, 0.15) 3px
    ),
    linear-gradient(180deg, #2a1a1a 0%, #1a0f1a 100%);
`;

const ChestFeet = styled.div`
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 100%;
  height: 8px;
  display: flex;
  justify-content: space-around;
  z-index: 1;
  
  &::before,
  &::after {
    content: '';
    width: 20px;
    height: 8px;
    background: linear-gradient(180deg, #1a0f1a 0%, #0f080f 100%);
    border-radius: 0 0 4px 4px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
  }
  
  &::before {
    margin-left: 15px;
  }
  
  &::after {
    margin-right: 15px;
  }
`;

const MetalBand = styled.div`
  position: absolute;
  background: linear-gradient(180deg, #8b6914 0%, #5d4a1a 50%, #3d2a0a 100%);
  box-shadow: 
    inset 0 2px 5px rgba(255, 200, 100, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.8);
  border-radius: 3px;
`;

const LidBand1 = styled(MetalBand)`
  top: 10px;
  left: 8%;
  width: 84%;
  height: 6px;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  z-index: 3;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #cd853f 0%, #8b6914 100%);
    border-radius: 50%;
    box-shadow: inset 0 1px 2px rgba(255, 200, 100, 0.4);
  }
  
  &::before {
    left: 12%;
  }
  
  &::after {
    right: 12%;
  }
`;

const LidBand2 = styled(MetalBand)`
  top: 22px;
  left: 8%;
  width: 84%;
  height: 6px;
  border-radius: 50% 50% 0 0 / 100% 100% 0 0;
  z-index: 3;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 8px;
    height: 8px;
    background: radial-gradient(circle, #cd853f 0%, #8b6914 100%);
    border-radius: 50%;
    box-shadow: inset 0 1px 2px rgba(255, 200, 100, 0.4);
  }
  
  &::before {
    left: 12%;
  }
  
  &::after {
    right: 12%;
  }
`;

const CornerStrap = styled(MetalBand)`
  width: 8px;
  height: 100%;
  z-index: 3;
  
  &::before {
    content: '';
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    width: 6px;
    height: 6px;
    background: radial-gradient(circle, #cd853f 0%, #8b6914 100%);
    border-radius: 50%;
    box-shadow: inset 0 1px 2px rgba(255, 200, 100, 0.4);
  }
`;

const LeftCornerStrap = styled(CornerStrap)`
  left: 0;
  border-radius: 8px 0 0 8px;
`;

const RightCornerStrap = styled(CornerStrap)`
  right: 0;
  border-radius: 0 8px 8px 0;
`;

const LockPlate = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background: linear-gradient(180deg, #8b6914 0%, #5d4a1a 50%, #3d2a0a 100%);
  border-radius: 8px;
  box-shadow: 
    inset 0 2px 5px rgba(255, 200, 100, 0.2),
    0 3px 10px rgba(0, 0, 0, 0.8);
  z-index: 4;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 12px;
    background: #0f080f;
    border-radius: 0 0 4px 4px;
  }
`;

const PurpleOrb = styled(motion.div)`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(138, 43, 226, 0.9) 0%, rgba(75, 0, 130, 0.7) 70%, rgba(25, 25, 112, 0.5) 100%);
  box-shadow: 
    0 0 30px rgba(138, 43, 226, 0.8),
    0 0 60px rgba(138, 43, 226, 0.5),
    inset 0 0 20px rgba(255, 255, 255, 0.2);
  z-index: 3;
  animation: pulse 2s ease-in-out infinite;
  
  @keyframes pulse {
    0%, 100% {
      box-shadow: 
        0 0 30px rgba(138, 43, 226, 0.8),
        0 0 60px rgba(138, 43, 226, 0.5),
        inset 0 0 20px rgba(255, 255, 255, 0.2);
    }
    50% {
      box-shadow: 
        0 0 40px rgba(138, 43, 226, 1),
        0 0 80px rgba(138, 43, 226, 0.7),
        inset 0 0 25px rgba(255, 255, 255, 0.3);
    }
  }
`;

const OrbFrame = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border: 4px solid;
  border-image: linear-gradient(180deg, #8b6914 0%, #5d4a1a 50%, #3d2a0a 100%) 1;
  border-radius: 50%;
  box-shadow: 
    inset 0 2px 5px rgba(255, 200, 100, 0.2),
    0 2px 8px rgba(0, 0, 0, 0.8);
  z-index: 2;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(180deg, #cd853f 0%, #8b6914 50%, #5d4a1a 100%);
    z-index: -1;
  }
`;

const SideHandle = styled.div`
  position: absolute;
  right: -15px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 30px;
  background: linear-gradient(90deg, #8b6914 0%, #5d4a1a 50%, #3d2a0a 100%);
  border-radius: 10px;
  box-shadow: 
    inset 0 2px 5px rgba(255, 200, 100, 0.2),
    3px 0 8px rgba(0, 0, 0, 0.8);
  z-index: 3;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 12px;
    height: 20px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const ChestBoard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const ChestMetalBands = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ChestHandle = styled.div`
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 15px;
  background: linear-gradient(180deg, #5a4a6a 0%, #3a2a4a 100%);
  border-radius: 8px 8px 0 0;
  box-shadow: 
    inset 0 2px 5px rgba(255, 255, 255, 0.1),
    0 2px 5px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(109, 75, 163, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 3px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 2px;
  }
`;

const MainPage = ({ onTermsAccepted }) => {
  const [lockOpened, setLockOpened] = useState(false);

  useEffect(() => {
    // Automatycznie uruchom animację skrzyni po 3 sekundach
    const timer = setTimeout(() => {
      setLockOpened(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const lockVariants = {
    closed: {
      rotateY: 0,
      scale: 1,
      zIndex: 3,
    },
    opening: {
      rotateY: 90,
      scale: 0.8,
      zIndex: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
      },
    },
    opened: {
      rotateY: 180,
      scale: 0.6,
      opacity: 0.3,
      zIndex: 1,
    },
  };

  const chestVariants = {
    hidden: {
      scale: 0.8,
      opacity: 0.3,
      zIndex: 1,
    },
    revealed: {
      scale: 1,
      opacity: 1,
      zIndex: 2,
      transition: {
        delay: 0.5,
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const lidVariants = {
    hidden: {
      rotateX: 0,
      y: 0,
    },
    revealed: {
      rotateX: -15,
      y: -5,
      transition: {
        delay: 0.5,
        duration: 1,
        ease: 'easeOut',
      },
    },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <Container>
      <Content
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <Title variants={itemVariants}>
          A więc znalazłeś tajemniczą stronę?
        </Title>
        <Subtitle variants={itemVariants}>
          Witaj, teraz czeka Cię ostatnia zagadka, wykonaj instrukcje aby przejść dalej
        </Subtitle>

        <LockContainer>
          <Chest
            variants={chestVariants}
            initial="hidden"
            animate={lockOpened ? 'revealed' : 'hidden'}
          >
            <ChestBoard />
            <ChestMetalBands />
            <ChestFeet />
            <LeftCornerStrap />
            <RightCornerStrap />
            <LockPlate />
            <OrbFrame />
            <PurpleOrb />
            <SideHandle />
          </Chest>
          <ChestLid
            variants={lidVariants}
            initial="hidden"
            animate={lockOpened ? 'revealed' : 'hidden'}
          >
            <LidBand1 />
            <LidBand2 />
          </ChestLid>
          <Lock
            variants={lockVariants}
            initial="closed"
            animate={lockOpened ? 'opened' : 'closed'}
            onClick={() => setLockOpened(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          />
        </LockContainer>

        <TermsAcceptance onAccept={onTermsAccepted} />
      </Content>
    </Container>
  );
};

export default MainPage;

