import styled from 'styled-components';
import { motion } from 'framer-motion';
import { theme } from '../theme';
import { FAMILY_MEMBERS } from '../config';

const Container = styled(motion.div)`
  flex: 1;
  padding: 2rem;
  background: ${theme.colors.backgroundSecondary};
  border-radius: 15px;
  box-shadow: ${theme.shadows.dark};
  border: 1px solid ${theme.colors.border};
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  color: ${theme.colors.text};
  text-shadow: ${theme.shadows.glow};
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InstructionNote = styled(motion.div)`
  padding: 1.5rem;
  margin-bottom: 2rem;
  background: ${theme.colors.backgroundTertiary};
  border-radius: 10px;
  border: 2px solid ${theme.colors.primary};
  color: ${theme.colors.text};
  font-size: 1.1rem;
  line-height: 1.6;
  box-shadow: ${theme.shadows.glow};
  
  &::before {
    content: '💡';
    margin-right: 0.5rem;
    font-size: 1.3rem;
  }
`;

const ListItem = styled(motion.li)`
  padding: 1rem 1.5rem;
  background: ${theme.colors.backgroundTertiary};
  border-radius: 10px;
  border-left: 4px solid ${theme.colors.primary};
  color: ${theme.colors.text};
  font-size: 1.1rem;
  box-shadow: ${theme.shadows.dark};
  
  &:hover {
    border-left-color: ${theme.colors.primaryLight};
    box-shadow: ${theme.shadows.glow};
  }
`;

const TaskList = () => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Lista zadań - zapytaj następujące osoby:</Title>
      
      <InstructionNote
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Teraz aby odblokować zamek kodowy musisz zdobyć 6 cyfr do zamka. Każda z osób z listy posiada jedną z cyfr, zapytaj je o zadanie, a w nagrodę za jego wykonanie otrzymasz informację o tym jaką cyfrę należy wpisać
      </InstructionNote>
      
      <List>
        {FAMILY_MEMBERS.map((member, index) => (
          <ListItem
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={itemVariants}
          >
            {member.name}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskList;

