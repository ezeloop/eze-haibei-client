import axios from 'axios';
import { editFolderServiceInterface, editTaskServiceInterface } from './interfaces';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
});

export const getFolders = () => api.get('/folders');
export const createFolder = (name: string) => api.post('/folders', { name });
export const getFolderTasks = (folderId: string) => api.get(`/tasks/folder/${folderId}`);
export const createTask = (title: string, folderId: string) => api.post('/tasks', { title, folderId });
export const deleteTask = (taskId: string) => api.delete(`/tasks/${taskId}`);
export const deleteFolder = (folderId: string) => api.delete(`/folders/${folderId}`);
export const updateTask = (taskId: string, updates: editTaskServiceInterface) => api.put(`/tasks/${taskId}`, updates); // Nueva función para actualizar tareas
export const updateFolder = (folderId: string, updates: editFolderServiceInterface) => api.put(`/folders/${folderId}`, updates); // Nueva función para actualizar carpetas
