import React, { useContext, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Box, Button, TextField } from '@mui/material';
import createTodoRequest from '../api/createTodoRequest';
import { TokenContext } from '../App';

export const CreateTodoForm = () => {
  const [text, setText] = useState('');
  const [token] = useContext(TokenContext);
  const queryClient = useQueryClient();

  const { mutate: createTodo } = useMutation(
    (newTodo) => createTodoRequest(newTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  return (
    <Box 
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!text) return;
        createTodo({ text });
        setText('');
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      marginTop="20px"
    >
      <TextField
        variant="outlined"
        placeholder="New Todo"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button 
        type="submit"
        variant="contained"
        color="primary"
      >
        Create
      </Button>
    </Box>
  );
};
