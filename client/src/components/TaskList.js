// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { getTasks } from '../services/apiService'; // Import API service to fetch tasks
import { List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskData = await getTasks(); // Fetch tasks from the server
        setTasks(taskData);
        setLoading(false);
      } catch (error) {
        setError('Failed to load tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <List>
      {tasks.map((task) => (
        <ListItem key={task._id} secondaryAction={
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }>
          <ListItemText primary={task.title} secondary={task.description} />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;
