import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/PermIdentityOutlined';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { getUser } from '@APP/redux';

import LoginModalContent from './LoginModalContent';
import LogoutModalContent from './LogoutModalContent';

const Header = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const user = useSelector(getUser);
  const theme = useTheme();
  const isDisplayLessMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <LoginModalContent isOpen={isLoginModalOpen} handleClose={() => setIsLoginModalOpen(false)} />
      <LogoutModalContent
        isOpen={isLogoutModalOpen}
        handleClose={() => setIsLogoutModalOpen(false)}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignContent="center"
        alignSelf="center"
        height={56}
        bgcolor="white">
        <Box display="flex" alignItems="center">
          <Typography
            fontSize="24px"
            padding="10px 20px"
            style={{ backgroundColor: '#188CFB', color: 'white', fontWeight: 'bold' }}>
            {isDisplayLessMd ? 'RB' : 'RichBrains'}
          </Typography>
          <Typography paddingLeft={isDisplayLessMd ? '20px' : '40px'} fontSize="20px">
            Clients
          </Typography>
        </Box>
        <Box pr={isDisplayLessMd ? 2 : 4} alignSelf="center">
          {user ? (
            <Button
              variant="text"
              startIcon={<PersonIcon />}
              endIcon={<ArrowDownIcon />}
              onClick={() => setIsLogoutModalOpen(true)}>
              {isDisplayLessMd ? '' : user}
            </Button>
          ) : (
            <Button
              sx={{ padding: '10px' }}
              color="primary"
              onClick={() => setIsLoginModalOpen(true)}
              variant="contained"
              startIcon={<LoginIcon />}>
              {isDisplayLessMd ? '' : 'Sing in'}
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Header;
