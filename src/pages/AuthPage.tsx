import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Auth: React.FC<{ onAuth: () => void }> = ({ onAuth }) => {
  const [key, setKey] = useState("");

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };

  const handleAuth = () => {
    if (key === "YOUR_SECRET_KEY") {
      localStorage.setItem("authKey", key);
      onAuth();
    } else {
      alert("Invalid key");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Typography variant="h4" gutterBottom>
        Enter Access Key
      </Typography>
      <TextField
        label="Access Key"
        value={key}
        onChange={handleKeyChange}
        variant="outlined"
      />
      <Box my={2}>
        <Button variant="contained" color="primary" onClick={handleAuth}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Auth;
