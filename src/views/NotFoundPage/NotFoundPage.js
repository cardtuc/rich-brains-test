import makeStyles from '@mui/styles/makeStyles';
import { Box, Button, Container, Typography, useMediaQuery, useTheme } from '@mui/material';
import NotListedLocationIcon from '@mui/icons-material/NotListedLocation';

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(-4)
  },
  icon: {
    fontSize: 120
  }
}));

const NotFoundPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isDisplayLessMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      display="flex"
      height="100%"
      overflow="auto"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center">
      <title>404</title>
      <Container className={classes.container} maxWidth="md">
        <NotListedLocationIcon className={classes.icon} color="primary" />
        <Box mt={2} mb={3}>
          <Typography align="center" variant={isDisplayLessMd ? 'h3' : 'h1'} gutterBottom>
            404: Page not found
          </Typography>
          <Typography align="center" gutterBottom>
            You either came here by mistake or there was some kind of error. <br /> Please try using
            the navigation to get to the correct page.
          </Typography>
        </Box>
        <Button href="/clients" variant="contained" color="primary">
          Okay
        </Button>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
