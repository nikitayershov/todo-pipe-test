import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { Box, Container, CircularProgress, List, Typography } from '@mui/material';
import readTodosRequest from '../api/readTodosRequest';
import { TodoItem } from '../components/TodoItem';
import { CreateTodoForm } from '../components/CreateTodoForm';
import { TokenContext } from '../App';

export const TodoPage = () => {
  const [token] = useContext(TokenContext);

  const { isLoading, data: todos } = useQuery('todos', () =>
    readTodosRequest(token)
  );

  console.log(todos)

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h3" gutterBottom>
        MY TODO APP
        </Typography>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <List>
            {todos.map((todo) => (
              <TodoItem todo={todo} key={todo._id} />
            ))}
          </List>
        )}
        <CreateTodoForm />
      </Box>
    </Container>
  );
};
