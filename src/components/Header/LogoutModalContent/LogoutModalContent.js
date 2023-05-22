import { useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';

import { clearUser } from '@APP/redux';

import { ModalWindow } from '../../common';

const LogoutModalContent = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('AUTH_TOKEN');
    dispatch(clearUser());
    handleClose();
  };

  return (
    <ModalWindow isOpen={isOpen} handleClose={handleClose}>
      <Box height="100%" p={3} display="flex" flexDirection="column" justifyContent="center">
        <Typography align="center" variant="h4" style={{ fontWeight: 'bold' }}>
          Sing out
        </Typography>
        <Typography align="center" margin={3}>
          Are you sure you want to sign out?
        </Typography>
        <Box display="flex" flexDirection="column">
          <Button
            variant="contained"
            type="submit"
            onClick={handleLogout}
            style={{ marginBottom: '10px' }}>
            Yes, sign out
          </Button>
          <Button variant="text" onClick={handleClose}>
            No, close
          </Button>
        </Box>
      </Box>
    </ModalWindow>
  );
};

export default LogoutModalContent;
