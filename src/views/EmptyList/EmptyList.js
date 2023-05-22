import { Box, Typography } from '@mui/material';

const EmptyList = () => {
  return (
    <Box
      display="flex"
      height="100%"
      overflow="auto"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center">
      <Typography variant="h6">No clients were found.</Typography>
    </Box>
  );
};

export default EmptyList;
