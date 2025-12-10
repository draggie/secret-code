import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../theme';

const Container = styled(motion.div)`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  font-size: 1.1rem;
  color: ${theme.colors.textSecondary};
  user-select: none;
  
  &:hover {
    color: ${theme.colors.text};
  }
`;

const Checkbox = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: ${theme.colors.primary};
`;

const Button = styled(motion.button)`
  padding: 1rem 2.5rem;
  font-size: 1.2rem;
  background: ${theme.gradients.primary};
  color: ${theme.colors.text};
  border-radius: 10px;
  box-shadow: ${theme.shadows.glow};
  font-weight: 600;
  transition: ${theme.transitions.default};
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:not(:disabled):hover {
    box-shadow: ${theme.shadows.glowStrong};
    transform: translateY(-2px);
  }
`;

const TermsAcceptance = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    if (accepted) {
      onAccept();
    }
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <CheckboxContainer>
        <Checkbox
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <span>Akceptuję zasady i chcę przejść dalej</span>
      </CheckboxContainer>
      
      <Button
        onClick={handleAccept}
        disabled={!accepted}
        whileHover={accepted ? { scale: 1.05 } : {}}
        whileTap={accepted ? { scale: 0.95 } : {}}
      >
        Przejdź dalej
      </Button>
    </Container>
  );
};

export default TermsAcceptance;

