import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import { SECRET_CODE } from '../config';

const Container = styled(motion.div)`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

const Title = styled.h2`
  font-size: 1.8rem;
  color: ${theme.colors.text};
  text-shadow: ${theme.shadows.glow};
  margin-bottom: 1rem;
`;

const LockBody = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 2rem;
  background: ${theme.colors.backgroundSecondary};
  border-radius: 20px;
  box-shadow: ${theme.shadows.dark};
  border: 2px solid ${theme.colors.border};
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }
`;

const DialContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const DialWrapper = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  
  @media (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const Dial = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${theme.gradients.primary};
  border: 4px solid ${theme.colors.primaryDark};
  cursor: pointer;
  position: relative;
  box-shadow: ${theme.shadows.glow};
  user-select: none;
  
  &:hover {
    box-shadow: ${theme.shadows.glowStrong};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 20px;
    background: ${theme.colors.text};
    border-radius: 2px;
    z-index: 2;
  }
  
  @media (max-width: 768px) {
    &::before {
      width: 3px;
      height: 15px;
    }
  }
`;

const DialNumber = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
  color: ${theme.colors.text};
  z-index: 1;
  pointer-events: none;
  text-shadow: 0 0 10px rgba(109, 75, 163, 0.8);
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const DialLabel = styled.span`
  font-size: 0.9rem;
  color: ${theme.colors.textSecondary};
  font-weight: 600;
`;

const Instructions = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1rem;
  text-align: center;
  max-width: 500px;
`;

const CombinationLock = ({ onSuccess }) => {
  const [code, setCode] = useState([0, 0, 0, 0, 0, 0]);
  const [focusedDial, setFocusedDial] = useState(0);
  const dialRefs = useRef([]);

  // Check code whenever it changes
  useEffect(() => {
    const isCorrect = code.every((digit, index) => digit === SECRET_CODE[index]);
    if (isCorrect) {
      setTimeout(() => {
        onSuccess();
      }, 500);
    }
  }, [code, onSuccess]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setFocusedDial((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setFocusedDial((prev) => Math.min(5, prev + 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCode((prev) => {
          const newCode = [...prev];
          newCode[focusedDial] = (newCode[focusedDial] + 1) % 10;
          return newCode;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCode((prev) => {
          const newCode = [...prev];
          newCode[focusedDial] = (newCode[focusedDial] + 9) % 10;
          return newCode;
        });
      } else if (e.key >= '0' && e.key <= '9') {
        const value = parseInt(e.key);
        setCode((prev) => {
          const newCode = [...prev];
          newCode[focusedDial] = value;
          return newCode;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusedDial]);

  useEffect(() => {
    if (dialRefs.current[focusedDial]) {
      dialRefs.current[focusedDial].focus();
    }
  }, [focusedDial]);

  const updateDial = (index, direction) => {
    setCode((prev) => {
      const newCode = [...prev];
      newCode[index] = (newCode[index] + direction + 10) % 10;
      return newCode;
    });
  };

  const handleDialClick = (index, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const clickY = event.clientY;
    
    // Determine if click is on top or bottom half
    if (clickY < centerY) {
      updateDial(index, 1);
    } else {
      updateDial(index, -1);
    }
    
    setFocusedDial(index);
  };

  const handleDialWheel = (index, event) => {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -1 : 1;
    updateDial(index, delta);
    setFocusedDial(index);
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Zamek Kodowy</Title>
      <Instructions>
        Użyj myszy (kliknij na pokrętło) lub klawiatury (strzałki) aby ustawić kod 6-cyfrowy
      </Instructions>
      
      <LockBody>
        {code.map((digit, index) => (
          <DialContainer key={index}>
            <DialWrapper>
              <Dial
                ref={(el) => (dialRefs.current[index] = el)}
                tabIndex={0}
                onClick={(e) => handleDialClick(index, e)}
                onWheel={(e) => handleDialWheel(index, e)}
                onFocus={() => setFocusedDial(index)}
                animate={{
                  rotate: digit * 36,
                  scale: focusedDial === index ? 1.1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  boxShadow: focusedDial === index ? theme.shadows.glowStrong : theme.shadows.glow,
                }}
              />
              <DialNumber>{digit}</DialNumber>
            </DialWrapper>
            <DialLabel>{index + 1}</DialLabel>
          </DialContainer>
        ))}
      </LockBody>
    </Container>
  );
};

export default CombinationLock;

