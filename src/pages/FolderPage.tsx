import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFolderTasks,
  createTask,
  deleteTask,
  updateTask,
  getFolders,
} from "../services/api";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
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

  const handleUpdateTask = async (taskId: string, newTitle: string) => {
    await updateTask(taskId, { title: newTitle });
    loadTasks();
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
        <Button variant="outlined" color="info" onClick={() => navigate("/")}>
          Go Back to Home
        </Button>
        <Box
          display="flex"
          justifyContent="center"
          alignContent={"center"}
          my={2}
          mb={6}
        >
          <TextField
            label="New Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            variant="outlined"
            color="secondary"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#FFD0D0", // color del borde por defecto
                },
                "&:hover fieldset": {
                  borderColor: "#FF9EAA", // color del borde al pasar el cursor
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#F9F9E0", // color del borde cuando el campo está enfocado
                },
                "& .MuiInputLabel-root": {
                  color: "#FF9EAA", // color del label por defecto
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#FF9EAA", // color del label cuando el campo está enfocado
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCreateTask}
            sx={{ ml: 2 }}
          >
            Add Task
          </Button>
        </Box>
        <Paper
          sx={{
            padding: 4,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFD0D0",
            borderRadius: "25px",
          }}
        >
          {tasks.length === 0 ? (
            <Typography variant="body1" color="textSecondary" align="center">
              Empty :C, go ahead and create one, babe!
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
                    onUpdateTask={handleUpdateTask}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default FolderPage;
