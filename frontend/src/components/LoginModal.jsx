import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { signInWithGoogle } from '../lib/supabaseClient';
import { FcGoogle } from 'react-icons/fc';

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

  const handleGoogleLogin = async () => {
    const { error } = await signInWithGoogle();
    if (error) {
      alert(`Error logging in with Google: ${error.message}`);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {/* Header */}
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
              {loading
                ? 'Please wait...'
                : mode === 'signin'
                ? 'Login'
                : 'Sign Up'}
            </Button>
          </div>
        </form>

        <Divider sx={{ my: 3 }}>or</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<FcGoogle />}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>
      </Box>
    </Modal>
  );
}
