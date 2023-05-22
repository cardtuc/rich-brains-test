import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import { setUser } from '@APP/redux';
import { loginReq } from '@APP/services/api';

import { ModalWindow, SnackbarAlert } from '../../common';

const loginValidationSchema = Yup.object().shape({
  login: Yup.string().max(255).nullable().required('Login is required'),
  password: Yup.string().max(255).nullable().required('Please enter a password')
});

const LoginModalContent = ({ isOpen, handleClose }) => {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const dispatch = useDispatch();
  const theme = useTheme();
  const isDisplayLessMd = useMediaQuery(theme.breakpoints.down('md'));

  const { errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values } =
    useFormik({
      initialValues: { login: '', password: '' },
      validationSchema: loginValidationSchema,
      onSubmit: async ({ login, password }) => {
        try {
          const response = await loginReq(login, password);

          localStorage.setItem('AUTH_TOKEN', response.token);
          dispatch(setUser(response.login));

          setSnackbarMessage(`Hello, ${response.login} :)`);

          handleClose();
        } catch (error) {
          setSnackbarMessage('Something went wrong!');
          setSnackbarSeverity('error');
        }
      }
    });

  return (
    <>
      <SnackbarAlert
        open={!!snackbarMessage}
        handleClose={() => setSnackbarMessage('')}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      <ModalWindow isOpen={isOpen} handleClose={handleClose}>
        <Box height="100%" p={3} display="flex" flexDirection="column" justifyContent="center">
          <form onSubmit={handleSubmit} noValidate>
            <Typography align="center" variant="h4" gutterBottom style={{ fontWeight: 'bold' }}>
              Sing in
            </Typography>
            <Box margin={isDisplayLessMd ? '16px 0' : 2}>
              <TextField
                fullWidth
                margin="normal"
                name="login"
                style={{ marginBottom: '10px' }}
                label="Login"
                type="text"
                value={values.login}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={isSubmitting}
                error={Boolean(touched.login && errors.login)}
                helperText={touched.login && errors.login}
              />
              <TextField
                fullWidth
                style={{ marginBottom: '10px' }}
                type="password"
                label="Password"
                name="password"
                margin="normal"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                disabled={isSubmitting}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
            </Box>
            <Box display="flex" flexDirection="column" paddingTop="10px">
              <Button variant="contained" type="submit" style={{ marginBottom: '20px' }}>
                Sign in
              </Button>
              <Button variant="text" onClick={handleClose}>
                Close
              </Button>
            </Box>
          </form>
        </Box>
      </ModalWindow>
    </>
  );
};

export default LoginModalContent;
