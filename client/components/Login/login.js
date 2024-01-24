import * as React from 'react';
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { login } from '../../redux/isLoggedIn';
import { UserInfoReducer } from '../../redux/UserInfo';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login({ handleRegister }) {
  const isLogged = useSelector((state) => state.login.isLoggedIn);

  const handleSubmit = async (event) => {
    console.log('---------in fetch-----------');
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userINFO = {
      username: data.get('username'),
      password: data.get('password'),
    };
    console.log(userINFO);
    const body = JSON.stringify(userINFO);
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
      }
      const user = response.json();
      store.dispatch(login(true));
      store.dispatch(UserInfoReducer(userINFO));
    } catch (error) {
      alert('User not found');
      console.error('Error during fetch:', error);
      console.log('error user not found');
      // store.dispatch(login(true));
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            paddingTop: '5rem',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              color: 'white',
            }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              sx={{
                backgroundColor: 'white',
              }}
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{
                backgroundColor: 'white',
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: '#2d3956' }}
            >
              Sign In
            </Button>
            <Button
              type=""
              fullWidth
              // variant="contained"
              sx={{ mt: 3, mb: 2, color: 'white' }}
              onClick={handleRegister}
            >
              Don't have an account? Sign up
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>

        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
