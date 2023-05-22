import { Box, IconButton, Modal, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    border: '1px solid #000',
    boxShadow: 24,
    padding: '20px 40px 30px',

    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '100%',
      overflow: 'scroll',
      display: 'flex',
      flexDirection: 'column'
    }
  }
}));

const ModalWindow = ({ children, isOpen = false, handleClose }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isDisplayLessMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Modal open={isOpen}>
      <Box className={classes.mainContainer}>
        <Box
          display="flex"
          justifyContent="flex-end"
          pt={isDisplayLessMd ? 3 : 0}
          pr={isDisplayLessMd ? 3 : 0}>
          <IconButton onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        {children}
      </Box>
    </Modal>
  );
};

export default ModalWindow;
