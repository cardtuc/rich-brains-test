import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/EditOutlined';

import { getUser, setSelectedClient } from '@APP/redux';
import { InfoClient, SnackbarAlert } from '@APP/components';
import { getClient } from '@APP/services/api';
import avatar from '@APP/assets/images/avatar.svg';

import InfoClientModalContent from '../InfoClientModalContent';
import DeleteClientModalContent from '../DeleteClientModalContent';
import CreateEditClientModalContent from '../CreateEditClientModalContent';

const Client = ({ client }) => {
  const [isHover, setIsHover] = useState(false);
  const [isInfoClientModalWindowOpen, setIsInfoClientModalWindowOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const handleSelectClient = async () => {
    if (!user) return null;

    try {
      const response = await getClient(client.id);
      dispatch(setSelectedClient(response.client));

      setIsInfoClientModalWindowOpen(true);
    } catch (e) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Something went wrong!');
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
      <InfoClientModalContent
        isOpen={isInfoClientModalWindowOpen}
        handleClose={() => setIsInfoClientModalWindowOpen(false)}
      />
      <Card
        variant="outlined"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        sx={{
          '&:hover': {
            backgroundColor: '#F8F9FF'
          }
        }}
        style={{
          position: 'relative',
          padding: '30px',
          height: '270px'
        }}>
        {isHover && user && <HoveredIcons client={client} />}
        <Box
          onClick={handleSelectClient}
          display="flex"
          justifyContent="space-between"
          flexDirection="column"
          alignItems="center">
          <CardMedia
            component="img"
            alt="avatar"
            style={{ height: '129px', width: '120px' }}
            image={avatar}
          />
          <CardContent>
            <InfoClient user={user} client={client} isHover={isHover} />
          </CardContent>
        </Box>
      </Card>
    </>
  );
};

const HoveredIcons = ({ client }) => {
  const [isDeleteClientModalOpen, setIsDeleteClientModalOpen] = useState(false);
  const [isCreateEditClientModalOpen, setIsCreateEditClientModalOpen] = useState(false);

  return (
    <>
      <DeleteClientModalContent
        isOpen={isDeleteClientModalOpen}
        handleClose={() => setIsDeleteClientModalOpen(false)}
        clientId={client.id}
      />
      <CreateEditClientModalContent
        isOpen={isCreateEditClientModalOpen}
        handleClose={() => setIsCreateEditClientModalOpen(false)}
        title="Edit client"
        client={client}
      />
      <Box position="absolute" top="0" right="10px">
        <IconButton onClick={() => setIsDeleteClientModalOpen(true)}>
          <DeleteIcon fontSize="medium" />
        </IconButton>
        <IconButton onClick={() => setIsCreateEditClientModalOpen(true)}>
          <EditIcon fontSize="medium" />
        </IconButton>
      </Box>
    </>
  );
};

export default Client;
