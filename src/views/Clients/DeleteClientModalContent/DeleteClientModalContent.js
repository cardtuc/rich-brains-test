import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';

import { setClients } from '@APP/redux';
import { ModalWindow, SnackbarAlert } from '@APP/components';
import { deleteClient, getClients } from '@APP/services/api';

const DeleteClientModalContent = ({ isOpen, handleClose, clientId }) => {
  const dispatch = useDispatch();
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleDeleteAndUpdateClients = async () => {
    try {
      await deleteClient(clientId);

      const updatedClients = await getClients();
      dispatch(setClients(updatedClients.clients));

      setSnackbarMessage('Client was successful deleted');

      handleClose();
    } catch (e) {
      setSnackbarMessage('Something went wrong!');
      setSnackbarSeverity('error');
    }
  };

  return (
    <>
      <SnackbarAlert
        severity={snackbarSeverity}
        open={!!snackbarMessage}
        handleClose={() => setSnackbarMessage('')}
        message={snackbarMessage}
      />
      <ModalWindow isOpen={isOpen} handleClose={handleClose}>
        <Box
          p={3}
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          textAlign="center">
          <Typography variant="h4" marginBottom={2}>
            Delete
          </Typography>
          <Typography marginBottom={2}>Are you sure you want to delete client?</Typography>
          <Box display="flex" flexDirection="column">
            <Button
              style={{ marginBottom: '10px' }}
              variant="contained"
              color="error"
              onClick={handleDeleteAndUpdateClients}>
              Yes, delete
            </Button>
            <Button onClick={handleClose}>No, close</Button>
          </Box>
        </Box>
      </ModalWindow>
    </>
  );
};

export default DeleteClientModalContent;
