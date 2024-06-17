import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
});

export const getFolders = () => api.get('/folders');
export const createFolder = (name: string) => api.post('/folders', { name });
export const getFolderTasks = (folderId: string) => api.get(`/tasks/folder/${folderId}`);
export const createTask = (title: string, folderId: string) => api.post('/tasks', { title, folderId });
export const deleteTask = (taskId: string) => api.delete(`/tasks/${taskId}`);
export const deleteFolder = (folderId: string) => api.delete(`/folders/${folderId}`);
export const updateTask = (taskId: string, updates: any) => api.put(`/tasks/${taskId}`, updates); // Nueva función para actualizar tareas

