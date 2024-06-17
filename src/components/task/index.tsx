import React from "react";
import { IconButton, Paper, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface TaskProps {
  title: string;
  id: string;
  completed: boolean;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({
  title,
  id,
  completed,
  onDelete,
  onToggleComplete,
}) => {
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
          backgroundColor: "#ffebee",
        },
      }}
    >
      <Typography
        variant="body1"
        sx={{ textDecoration: completed ? "line-through" : "none" }}
      >
        {title}
      </Typography>
      <div>
        <IconButton onClick={() => onDelete(id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton color="warning" onClick={() => onToggleComplete(id)}>
          <FavoriteIcon />
        </IconButton>
      </div>
    </Paper>
  );
};

export default Task;
