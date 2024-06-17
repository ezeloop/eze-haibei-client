import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFolderTasks,
  createTask,
  deleteTask,
  updateTask, // Importar updateTask
  getFolders,
} from "../services/api";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
} from "@mui/material";
import Task from "../components/task";

const FolderPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [folderName, setFolderName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
    fetchFolderName();
  }, [id]);

  const loadTasks = async () => {
    if (id) {
      const response = await getFolderTasks(id);
      setTasks(response.data);
    }
  };

  const fetchFolderName = async () => {
    const response = await getFolders();
    const folder = response.data.find((folder: any) => folder._id === id);
    if (folder) {
      setFolderName(folder.name);
    }
  };

  const handleCreateTask = async () => {
    if (newTask && id) {
      await createTask(newTask, id);
      setNewTask("");
      loadTasks();
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    await deleteTask(taskId);
    loadTasks();
  };

  const handleToggleComplete = async (taskId: string) => {
    const task: any = tasks.find((task: any) => task._id === taskId);
    if (task) {
      await updateTask(taskId, { completed: !task.completed });
      loadTasks();
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw"
      padding={2}
      boxSizing="border-box"
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          Tasks in Folder: {folderName}
        </Typography>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate("/")}
        >
          Go Back to Home
        </Button>
        <Box
          display="flex"
          justifyContent="center"
          alignContent={"center"}
          my={2}
        >
          <TextField
            label="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTask}
            sx={{ ml: 2 }}
          >
            Add Task
          </Button>
        </Box>
        {tasks.length === 0 ? (
          <Typography variant="body1" color="textSecondary" align="center">
            No tasks, go ahead and create one!
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {tasks.map((task: any) => (
              <Grid item key={task._id} xs={12} md={6}>
                <Task
                  key={task._id}
                  title={task.title}
                  id={task._id}
                  completed={task.completed}
                  onDelete={handleDeleteTask}
                  onToggleComplete={handleToggleComplete}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default FolderPage;
