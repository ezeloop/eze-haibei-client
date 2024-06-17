import React, { useState, useEffect } from "react";
import { getFolders, createFolder, deleteFolder } from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Home: React.FC = () => {
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const [open, setOpen] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadFolders();
  }, []);

  const loadFolders = async () => {
    const response = await getFolders();
    setFolders(response.data);
  };

  const handleCreateFolder = async () => {
    if (newFolder) {
      await createFolder(newFolder);
      setNewFolder("");
      loadFolders();
    }
  };

  const handleOpenDialog = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFolderToDelete(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setFolderToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (folderToDelete) {
      await deleteFolder(folderToDelete);
      loadFolders();
      handleCloseDialog();
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
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" mb={4}>
          <Typography variant="h2" gutterBottom>
            Haibei and Eze's To-Do List
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" mb={2}>
          <TextField
            label="New Folder Name"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateFolder}
            sx={{ ml: 2 }}
          >
            Create Folder
          </Button>
        </Box>
        <Box
          sx={{
            maxHeight: "60vh",
            overflowY: "auto",
            width: "100%",
          }}
        >
          <Grid container spacing={3} marginTop={4}>
            {folders.map((folder: any) => (
              <Grid item key={folder._id} xs={12} sm={6} md={4}>
                <Paper
                  sx={{
                    padding: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#E8C5E5",
                  }}
                  onClick={() => navigate(`/folders/${folder._id}`)}
                >
                  <Typography variant="h6">{folder.name}</Typography>
                  <IconButton
                    onClick={(event) => handleOpenDialog(folder._id, event)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this folder? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="warning" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
