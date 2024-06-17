import React, { useState } from "react";
import {
  IconButton,
  Paper,
  Typography,
  TextField,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";

interface TaskProps {
  title: string;
  id: string;
  completed: boolean;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onUpdateTask: (id: string, newTitle: string) => void;
}

const Task: React.FC<TaskProps> = ({
  title,
  id,
  completed,
  onDelete,
  onToggleComplete,
  onUpdateTask,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdateTask(id, newTitle);
    setIsEditing(false);
  };

  return (
    <Paper
      sx={{
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff0f5",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#F9F9E0",
        },
      }}
    >
      {isEditing ? (
        <TextField
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ marginRight: 2, flexGrow: 1 }}
        />
      ) : (
        <Typography
          variant="body1"
          sx={{
            textDecoration: completed ? "line-through" : "none",
            flexGrow: 1,
          }}
        >
          {title}
        </Typography>
      )}
      <div>
        <Tooltip title="Delete Task">
          <IconButton onClick={() => onDelete(id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle Complete">
          <IconButton color="warning" onClick={() => onToggleComplete(id)}>
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        {isEditing ? (
          <Tooltip title="Save">
            <IconButton color="primary" onClick={handleSaveClick}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Edit Task">
            <IconButton onClick={handleEditClick}>
              <EditIcon color="primary" />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Paper>
  );
};

export default Task;
