import { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { theme } from './theme';
import MainPage from './components/MainPage';
import TaskList from './components/TaskList';
import CombinationLock from './components/CombinationLock';
import SuccessScreen from './components/SuccessScreen';

const AppContainer = styled.div`
  min-height: 100vh;
  width: 100%;
`;

const PuzzleContainer = styled.div`
  min-height: 100vh;
  display: flex;
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }
`;

function App() {
  const [currentView, setCurrentView] = useState('main'); // 'main' | 'puzzle' | 'success'

  const handleTermsAccepted = () => {
    setCurrentView('puzzle');
  };

  const handleCodeSuccess = () => {
    setCurrentView('success');
  };

  return (
    <AppContainer>
      <AnimatePresence mode="wait">
        {currentView === 'main' && (
          <MainPage key="main" onTermsAccepted={handleTermsAccepted} />
        )}
        
        {currentView === 'puzzle' && (
          <PuzzleContainer key="puzzle">
            <TaskList />
            <CombinationLock onSuccess={handleCodeSuccess} />
          </PuzzleContainer>
        )}
        
        {currentView === 'success' && (
          <SuccessScreen key="success" />
        )}
      </AnimatePresence>
    </AppContainer>
  );
}

export default App;
