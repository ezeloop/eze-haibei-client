import React, { useState, useEffect } from "react";
import {
  getFolders,
  createFolder,
  deleteFolder,
  updateFolder,
} from "../services/api";
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
import EditIcon from "@mui/icons-material/Edit";

const Home: React.FC = () => {
  const [folders, setFolders] = useState([]);
  const [newFolder, setNewFolder] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState<string | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<string | null>(null);
  const [editFolderName, setEditFolderName] = useState("");
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

  const handleOpenDeleteDialog = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setFolderToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setFolderToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (folderToDelete) {
      await deleteFolder(folderToDelete);
      loadFolders();
      handleCloseDeleteDialog();
    }
  };

  const handleOpenEditDialog = (
    id: string,
    name: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    setFolderToEdit(id);
    setEditFolderName(name);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setFolderToEdit(null);
    setEditFolderName("");
  };

  const handleConfirmEdit = async () => {
    if (folderToEdit && editFolderName) {
      await updateFolder(folderToEdit, { name: editFolderName });
      loadFolders();
      handleCloseEditDialog();
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
      boxSizing="border-box"
    >
      <Container maxWidth="md">
        <Box display="flex" justifyContent="center" mb={4}>
          <Typography variant="h3">Haibei and Eze's To-Do List</Typography>
        </Box>
        <Box display="flex" justifyContent="center" mb={6}>
          <TextField
            label="New Folder Name"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            variant="outlined"
            color="secondary"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#FFD0D0",
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
          <Paper
            sx={{
              paddingRight: 4,
              paddingLeft: 4,
              paddingBottom: 6,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFD0D0",
              borderRadius: "25px",
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
                      backgroundColor: "#fff0f5",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "#3AA6B9",
                      },
                    }}
                    onClick={() => navigate(`/folders/${folder._id}`)}
                  >
                    <Typography variant="h6">{folder.name}</Typography>
                    <div>
                      <IconButton
                        onClick={(event) =>
                          handleOpenEditDialog(folder._id, folder.name, event)
                        }
                      >
                        <EditIcon color="warning" />
                      </IconButton>
                      <IconButton
                        onClick={(event) =>
                          handleOpenDeleteDialog(folder._id, event)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>
      </Container>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this folder? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="warning" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>{"Edit Folder Name"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Folder Name"
            type="text"
            fullWidth
            value={editFolderName}
            onChange={(e) => setEditFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmEdit} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
