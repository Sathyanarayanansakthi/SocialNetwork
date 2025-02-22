import { useState } from 'react';
import { Google as GoogleIcon, GitHub as GitHubIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Alert,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signuppage({ open, handleClose }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
      });
      toast.success('Registration successful! Redirecting...');
      setTimeout(() => {
        handleClose();
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Registration failed.');
      toast.error(err.response?.data?.error || 'Registration failed.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          p: 3,
          borderRadius: 4,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          background: 'linear-gradient(135deg, #1e1e1e, #2b2b2b)',
          color: '#fff',
        },
      }}
    >
      <DialogTitle textAlign="center" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        Create an Account
      </DialogTitle>
      <DialogContent>
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Box component="form" onSubmit={registerUser} noValidate>
          <Stack spacing={3}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
              variant="filled"
              sx={{ input: { color: 'white' } }}
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              variant="filled"
              sx={{ input: { color: 'white' } }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              variant="filled"
              sx={{ input: { color: 'white' } }}
            />
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column', gap: 2 }}>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          onClick={registerUser}
          sx={{
            background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
            color: '#fff',
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(110, 142, 251, 0.4)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5a7ce0, #9267d6)',
            },
          }}
        >
          Sign Up
        </Button>
        <Divider sx={{ color: 'gray', width: '100%' }}>OR</Divider>
        <Button
          variant="contained"
          startIcon={<GoogleIcon />}
          fullWidth
          sx={{
            bgcolor: '#DB4437',
            color: 'white',
            '&:hover': { bgcolor: '#c1351d' },
          }}
        >
          Sign Up with Google
        </Button>
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          fullWidth
          sx={{
            bgcolor: '#24292e',
            color: 'white',
            '&:hover': { bgcolor: '#1b1f23' },
          }}
        >
          Sign Up with GitHub
        </Button>
        <Typography variant="body2" textAlign="center" mt={2}>
          Already have an account?{' '}
          <Button color="secondary" onClick={handleClose} sx={{ textTransform: 'none' }}>
            Sign In
          </Button>
        </Typography>
      </DialogActions>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} theme="dark" />
    </Dialog>
  );
}

export default Signuppage;