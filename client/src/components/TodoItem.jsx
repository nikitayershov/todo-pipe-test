import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { debounce } from 'lodash';
import { Checkbox, IconButton, ListItem, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import updateTodoRequest from '../api/updateTodoRequest';
import deleteTodoRequest from '../api/deleteTodoRequest';
import { TokenContext } from '../App';

export const TodoItem = ({ todo }) => {
  const [text, setText] = useState(todo.text);
  const [token] = useContext(TokenContext);

  const queryClient = useQueryClient();

  const { mutate: updateTodo } = useMutation(
    (updatedTodo) => updateTodoRequest(updatedTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  const { mutate: deleteTodo } = useMutation(
    (updatedTodo) => deleteTodoRequest(updatedTodo, token),
    {
      onSettled: () => {
        queryClient.invalidateQueries('todos');
      },
    }
  );

  const debouncedUpdateTodo = useCallback(
    debounce(updateTodo, 600),
    [updateTodo]
  );

  useEffect(() => {
    if (text !== todo.text) {
      debouncedUpdateTodo({
        ...todo,
        text,
      });
    }
  }, [text]);

  return (
    <ListItem
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        margin: '8px 0',  // Added margin for better spacing between items
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() =>
          updateTodo({
            ...todo,
            completed: !todo.completed,
          })
        }
      />
      <TextField
        value={text}
        onChange={(e) => setText(e.target.value)}
        variant="outlined"
        fullWidth
        style={{
          margin: '0 10px',
          textDecoration: todo.completed ? 'line-through' : 'none',
          color: todo.completed ? 'grey' : 'black',
        }}
        inputProps={{
          style: {
            textDecoration: todo.completed ? 'line-through' : 'none',
            color: todo.completed ? 'grey' : 'black',
          },
        }}
      />
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => deleteTodo(todo)}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
