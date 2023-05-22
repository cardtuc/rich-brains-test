import { useState } from 'react';
import { Box, InputAdornment, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ImportExportIcon from '@mui/icons-material/ImportExport';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiInputBase-input': {
      padding: '10px',
      backgroundColor: 'white',
      width: '100%'
    }
  }
}));

const Dropdown = ({ value, children }) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isDisplayLessMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box position="relative">
      <Box onClick={() => setIsOpen(!isOpen)}>
        <TextField
          fullWidth={isDisplayLessMd}
          className={classes.root}
          InputProps={{
            readOnly: true,
            startAdornment: (
              <InputAdornment position="start">
                <ImportExportIcon />
                <Typography>Search by:</Typography>
              </InputAdornment>
            )
          }}
          value={value}
        />
      </Box>
      {isOpen && children}
    </Box>
  );
};

export default Dropdown;
