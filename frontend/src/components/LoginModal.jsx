import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton, ToggleButton, ToggleButtonGroup } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

export default function LoginModal({ open, onClose, onLogin, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('signin');

  const handleModeChange = (e, value) => {
    if (value) setMode(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password, mode });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h6">Login</Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </div>

        <div className="mb-2 flex justify-center">
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            size="small"
          >
            <ToggleButton value="signin">Sign in</ToggleButton>
            <ToggleButton value="signup">Sign up</ToggleButton>
          </ToggleButtonGroup>
        </div>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />

          <div className="flex justify-end mt-4">
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
