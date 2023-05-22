import { Alert, Snackbar } from '@mui/material';

const SnackbarAlert = ({ message, open, handleClose, severity }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={handleClose}
    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
    <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarAlert;
