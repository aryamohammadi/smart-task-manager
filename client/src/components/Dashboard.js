// This component displays the user's profile and tasks. It allows the user to add, delete, and edit tasks.

// Import the useState and useEffect hooks
import React, { useState, useEffect } from 'react'; 

// Import the API service functions
import { getUserProfile, getTasks, addTask, deleteTask, updateTask } from '../services/apiService';

// Import the MUI components
import { Button, Container, Typography, TextField, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

// Import the MUI icons for deleting tasks
import DeleteIcon from '@mui/icons-material/Delete';

// Import the MUI icons for editing tasks
import EditIcon from '@mui/icons-material/Edit';

// Define the Dashboard component
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUser(userData);
      } catch (error) {
        setError('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    const fetchTasks = async () => {
      try {
        const taskData = await getTasks();
        setTasks(taskData);
      } catch (error) {
        setError('Failed to load tasks');
      }
    };

    fetchUserProfile();
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const addedTask = await addTask(newTask);
      setTasks([...tasks, addedTask]);
      setNewTask({ title: '', description: '' });
    } catch (error) {
      setError('Failed to add task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error.response?.data || error.message);
      setError('Failed to delete task');
    }
  };
  

  const handleOpenEditDialog = (task) => {
    setTaskToEdit(task);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setTaskToEdit(null);
  };

  const handleEditTask = async () => {
    try {
      const updatedTask = await updateTask(taskToEdit._id, taskToEdit);
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
      handleCloseEditDialog();
    } catch (error) {
      setError('Failed to update task');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Welcome, {user.username}</Typography>
      <div>
        <TextField
          label="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          margin="normal"
        />
        <TextField
          label="Task Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleAddTask}>Add Task</Button>
      </div>
      <List>
        {tasks.map((task) => (
          <ListItem key={task._id} secondaryAction={
            <>
              <IconButton edge="end" onClick={() => handleOpenEditDialog(task)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => handleDeleteTask(task._id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }>
            <ListItemText primary={task.title} secondary={task.description} />
          </ListItem>
        ))}
      </List>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onClose={handleCloseEditDialog}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            value={taskToEdit?.title || ''}
            onChange={(e) => setTaskToEdit({ ...taskToEdit, title: e.target.value })}
            margin="normal"
            fullWidth
          />
          <TextField
            label="Task Description"
            value={taskToEdit?.description || ''}
            onChange={(e) => setTaskToEdit({ ...taskToEdit, description: e.target.value })}
            margin="normal"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">Cancel</Button>
          <Button onClick={handleEditTask} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
