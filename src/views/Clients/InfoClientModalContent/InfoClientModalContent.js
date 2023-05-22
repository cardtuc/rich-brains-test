import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import { clearSelectedClient, getSelectedClient } from '@APP/redux';
import { ModalWindow, InfoClient } from '@APP/components';
import avatar from '@APP/assets/images/avatar.svg';

import DeleteClientModalContent from '../DeleteClientModalContent';
import CreateEditClientModalContent from '../CreateEditClientModalContent';

const InfoClientModalContent = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const client = useSelector(getSelectedClient);
  const [isDeleteClientModalWindowOpen, setIsDeleteClientModalWindowOpen] = useState(false);
  const [isEditClientModalWindowOpen, setIsEditClientModalWindowOpen] = useState(false);
  const isDisplayLessMd = useMediaQuery(theme.breakpoints.down('md'));

  const handleCloseWindow = () => {
    dispatch(clearSelectedClient());
    handleClose();
  };

  if (!client) return null;

  return (
    <>
      <DeleteClientModalContent
        isOpen={isDeleteClientModalWindowOpen}
        handleClose={() => setIsDeleteClientModalWindowOpen(false)}
        clientId={client.id}
      />
      <CreateEditClientModalContent
        client={client}
        title="Edit client"
        handleClose={() => setIsEditClientModalWindowOpen(false)}
        isOpen={isEditClientModalWindowOpen}
      />
      <ModalWindow isOpen={isOpen} handleClose={handleCloseWindow}>
        <Box
          p={3}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          alignItems="center"
          height="100%">
          <Box
            mb={2}
            display="flex"
            flexDirection={isDisplayLessMd ? 'column' : 'row'}
            justifyContent={isDisplayLessMd ? 'center' : 'space-between'}>
            <Button
              variant="text"
              startIcon={<EditIcon />}
              onClick={() => setIsEditClientModalWindowOpen(true)}>
              Edit profile
            </Button>
            <Button
              color="error"
              variant="text"
              startIcon={<DeleteIcon />}
              onClick={() => setIsDeleteClientModalWindowOpen(true)}>
              Delete client
            </Button>
          </Box>
          <img src={avatar} alt="avatar" style={{ marginBottom: '10px', width: '200px' }} />
          <InfoClient client={client} nameFontSize="h4" />
          <Button
            style={{ marginTop: '20px', fontSize: '16px' }}
            variant="text"
            onClick={handleCloseWindow}>
            Close
          </Button>
        </Box>
      </ModalWindow>
    </>
  );
};

export default InfoClientModalContent;
