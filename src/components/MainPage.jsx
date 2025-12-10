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
  background: linear-gradient(135deg, #2a1f3d 0%, #1a1528 100%);
  border-radius: 10px;
  box-shadow: 
    inset 0 2px 10px rgba(0, 0, 0, 0.5),
    ${theme.shadows.dark},
    0 0 30px rgba(83, 52, 131, 0.3);
  z-index: 1;
  border: 2px solid ${theme.colors.primaryDark};
  
  /* Wood grain effect */
  background-image: 
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.1) 2px,
      rgba(0, 0, 0, 0.1) 4px
    ),
    linear-gradient(135deg, #2a1f3d 0%, #1a1528 100%);
  
  /* Metal corners */
  &::before {
    content: '';
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 25px;
    background: linear-gradient(180deg, #4a3a5a 0%, #3a2a4a 50%, #2a1a3a 100%);
    border-radius: 12px 12px 0 0;
    box-shadow: 
      inset 0 2px 5px rgba(255, 255, 255, 0.1),
      0 2px 10px rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(109, 75, 163, 0.3);
  }
  
  /* Lock plate */
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50px;
    height: 50px;
    background: radial-gradient(circle, #4a3a5a 0%, #2a1a3a 100%);
    border-radius: 50%;
    box-shadow: 
      inset 0 2px 5px rgba(0, 0, 0, 0.5),
      ${theme.shadows.glow},
      0 0 20px rgba(109, 75, 163, 0.6);
    border: 2px solid rgba(109, 75, 163, 0.5);
  }
`;

const ChestBoard = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  
  /* Vertical boards */
  &::before {
    content: '';
    position: absolute;
    left: 20%;
    top: 0;
    width: 3px;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.5);
  }
  
  &::after {
    content: '';
    position: absolute;
    right: 20%;
    top: 0;
    width: 3px;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
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
    top: 30%;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, #4a3a5a 20%, #4a3a5a 80%, transparent);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 30%;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, #4a3a5a 20%, #4a3a5a 80%, transparent);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  }
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
            <ChestHandle />
          </Chest>
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

