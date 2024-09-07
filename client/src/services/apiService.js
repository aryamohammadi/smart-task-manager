import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Base URL for API

// Function to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to login a user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to get user profile (protected route)
export const getUserProfile = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please login again.');
    }

    const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to get tasks
export const getTasks = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please login again.');
    }

    const response = await axios.get(`${API_BASE_URL}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to add a new task
export const addTask = async (taskData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please login again.');
    }

    const response = await axios.post(`${API_BASE_URL}/tasks`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to delete a task
export const deleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please login again.');
    }

    const response = await axios.delete(`${API_BASE_URL}/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to update a task
export const updateTask = async (taskId, taskData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please login again.');
    }

    const response = await axios.put(`${API_BASE_URL}/tasks/${taskId}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to mark a task as completed
export const completeTask = async (taskId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please login again.');
    }

    const response = await axios.patch(`${API_BASE_URL}/tasks/${taskId}/complete`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error completing task:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to mark a task as incomplete
export const incompleteTask = async (taskId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found, please login again.');
    }

    const response = await axios.patch(`${API_BASE_URL}/tasks/${taskId}/incomplete`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error marking task as incomplete:', error.response ? error.response.data : error.message);
    throw error.response ? error.response.data : error.message;
  }
};

// Function to logout the user
export const logoutUser = () => {
  localStorage.removeItem('token'); // Remove the token from localStorage
};
