import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';

import { clients, getUser, setClients } from '@APP/redux';
import { Loader, Dropdown, ToggleButton, SnackbarAlert } from '@APP/components';
import { getClients } from '@APP/services/api';

import Client from './Client';
import CreateEditClientModalContent from './CreateEditClientModalContent';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiInputBase-input': {
      padding: '10px',
      backgroundColor: 'white'
    },
    [theme.breakpoints.down('md')]: {
      marginBottom: '10px'
    }
  }
}));

const filterBy = [
  { fieldName: 'name', label: 'Name' },
  { fieldName: 'dateOfBirth', label: 'Date of Birth' },
  { fieldName: 'country', label: 'Country' }
];

const Clients = () => {
  const dispatch = useDispatch();
  const clientsList = useSelector(clients);
  const user = useSelector(getUser);
  const classes = useStyles();
  const [sortedCustomers, setSortedCustomers] = useState(null);
  const [sortType, setSortType] = useState('asc');
  const [sortedBy, setSortedBy] = useState('name');
  const [searchedValue, setSearchedValue] = useState('');
  const [isModalWindowOpen, setIsModalWindowOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const theme = useTheme();
  const isDisplayLessMd = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    (async () => {
      try {
        const { clients } = await getClients();
        setSortedCustomers(clients);

        dispatch(setClients(clients));
      } catch (e) {
        setSnackbarMessage('Something went wrong!');
        setSnackbarSeverity('error');
      }
    })();
  }, []);

  useEffect(() => {
    setSortedCustomers(clientsList);
    setSearchedValue('');
  }, [clientsList]);

  useEffect(() => {
    filterClients();
  }, [sortedBy, sortType]);

  useEffect(() => {
    handleChangeSearchedCustomers();
  }, [searchedValue]);

  const handleChange = (event) => {
    setSortedBy(event.target.value);
  };

  const getLabelByFieldName = (fieldName) =>
    filterBy.find((value) => value.fieldName === fieldName).label;

  const filterClients = () => {
    const filteredCustomers = sortedCustomers
      ?.map((customer) => ({ ...customer }))
      .sort((a, b) =>
        a[sortedBy].toLowerCase() > b[sortedBy].toLowerCase()
          ? 1
          : b[sortedBy].toLowerCase() > a[sortedBy].toLowerCase()
          ? -1
          : 0
      );

    if (sortType === 'desc') setSortedCustomers(filteredCustomers.reverse());

    setSortedCustomers(filteredCustomers);
  };

  const filterCustomersBySearchValue = useCallback(({ customers, value }) => {
    const filterIn = ['name', 'surname'];

    return customers.filter((customer) => {
      for (let i = 0; i < filterIn.length; i++) {
        if (customer[filterIn[i]]?.toLowerCase().includes(value)) {
          return { ...customer };
        }
      }
    });
  }, []);

  const handleChangeSearchedCustomers = useCallback(() => {
    if (!sortedCustomers) return;

    if (!searchedValue) {
      setSortedCustomers(clientsList);

      return;
    }

    const filteredList = filterCustomersBySearchValue({
      value: searchedValue,
      customers: clientsList
    });

    setSortedCustomers(filteredList);
  }, [sortedCustomers, searchedValue]);

  if (!clientsList) return <Loader />;

  return (
    <>
      <SnackbarAlert
        severity={snackbarSeverity}
        open={!!snackbarMessage}
        handleClose={() => setSnackbarMessage('')}
        message={snackbarMessage}
      />
      <CreateEditClientModalContent
        handleClose={() => setIsModalWindowOpen(false)}
        isOpen={isModalWindowOpen}
        title="New client"
      />
      <Box>
        <Container maxWidth="md" sx={{ position: 'relative' }}>
          {user && (
            <Box
              zIndex={2}
              position={isDisplayLessMd ? 'fixed' : 'absolute'}
              right={isDisplayLessMd ? '20px' : '-20px'}
              bottom={isDisplayLessMd ? '20px' : ''}>
              <Tooltip title="Add new client">
                <IconButton
                  size={isDisplayLessMd ? 'large' : 'medium'}
                  style={{ backgroundColor: '#90caf9' }}
                  onClick={() => setIsModalWindowOpen(true)}>
                  <AddIcon color="primary" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          <Box>
            <Box
              display="flex"
              justifyContent="space-between"
              margin={0}
              mt={4}
              flexDirection={isDisplayLessMd ? 'column' : 'row'}>
              <TextField
                className={classes.root}
                placeholder="Type to search"
                onChange={(e) => setSearchedValue(e.target.value)}
                type="text"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              <Dropdown value={getLabelByFieldName(sortedBy)}>
                <Box
                  position="absolute"
                  bgcolor="white"
                  zIndex="10"
                  width="100%"
                  paddingBottom="10px">
                  <FormControl fullWidth>
                    <RadioGroup value={sortedBy} onChange={handleChange}>
                      {filterBy.map(({ fieldName, label }) => (
                        <FormControlLabel
                          sx={{ margin: 0 }}
                          key={fieldName}
                          value={fieldName}
                          control={<Radio />}
                          label={label}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <ToggleButton setSortType={setSortType} sortType={sortType} />
                </Box>
              </Dropdown>
            </Box>
          </Box>
          <Grid container spacing={3} mt={2}>
            {sortedCustomers?.map((client) => (
              <Grid item key={client.id} md={4} sm={6} xs={12}>
                <Client client={{ ...client }} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Clients;
