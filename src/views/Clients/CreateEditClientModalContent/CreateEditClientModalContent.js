import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import countryList from 'react-select-country-list';
import ReactPhoneInput from 'react-phone-input-material-ui';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { differenceInCalendarYears, format } from 'date-fns';
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { DatePicker } from '@mui/x-date-pickers';

import { ModalWindow, SnackbarAlert } from '@APP/components';
import { dateFormatForBE } from '@APP/constants';
import { setClients, getUser } from '@APP/redux';
import { createClient, editClient, getClients } from '@APP/services/api';
import avatar from '@APP/assets/images/avatar.svg';

import DeleteClientModalContent from '../DeleteClientModalContent';

const DEFAULT_COUNTRY = 'United Kingdom';

const useStyles = makeStyles((theme) => ({
  firstNameField: {
    [theme.breakpoints.down('md')]: {
      marginBottom: '8px'
    }
  }
}));

const createOrEditClientValidationSchema = Yup.object().shape({
  name: Yup.string().max(255).nullable().required('Name is required'),
  surname: Yup.string().max(255).nullable().required('Last name is required'),
  country: Yup.string().required('Country is required'),
  phone: Yup.string().required('Phone is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required')
});

const CreateEditClientModalContent = ({ handleClose, isOpen, title, client }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [isDeleteClientModalWindowOpen, setIsDeleteClientModalWindowOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const user = useSelector(getUser);
  const theme = useTheme();
  const isDisplayLessMd = useMediaQuery(theme.breakpoints.down('md'));

  const countiesList = useMemo(() => countryList().getData(), []);

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    isSubmitting,
    touched,
    values,
    resetForm
  } = useFormik({
    initialValues: {
      name: client?.name || '',
      surname: client?.surname || '',
      country: client?.country || DEFAULT_COUNTRY,
      phone: client?.phone || '',
      age: client?.age || '0',
      dateOfBirth: client ? new Date(client?.dateOfBirth) : new Date()
    },
    validationSchema: createOrEditClientValidationSchema,
    onSubmit: async ({ name, surname, phone, age, dateOfBirth, country }) => {
      try {
        if (client) {
          await editClient(
            client.id,
            name,
            surname,
            age,
            format(dateOfBirth, dateFormatForBE),
            phone,
            country
          );

          setSnackbarMessage('Client was edited successfully');
        } else {
          await createClient(
            name,
            surname,
            age,
            format(dateOfBirth, dateFormatForBE),
            phone,
            country
          );

          setSnackbarMessage('New client was added successfully');
        }

        const updatedClients = await getClients();
        dispatch(setClients(updatedClients.clients));

        handleClose();
      } catch (error) {
        setSnackbarMessage('Something went wrong!');
        setSnackbarSeverity('error');
      } finally {
        resetForm();
      }
    }
  });

  return (
    <>
      <SnackbarAlert
        open={!!snackbarMessage}
        handleClose={() => setSnackbarMessage('')}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
      <DeleteClientModalContent
        isOpen={isDeleteClientModalWindowOpen}
        clientId={client?.id}
        handleClose={() => setIsDeleteClientModalWindowOpen(false)}
      />
      <ModalWindow isOpen={isOpen} handleClose={handleClose}>
        <Box p={3}>
          <Typography
            fontWeight="bold"
            variant="h4"
            marginBottom={2}
            textAlign={isDisplayLessMd ? 'center' : 'left'}>
            {title}
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Box display="flex" flexDirection={isDisplayLessMd ? 'column' : 'row'}>
              <img src={avatar} alt="avatar" width="200px" style={{ alignSelf: 'center' }} />
              <Box ml={isDisplayLessMd ? 0 : 4}>
                <Box display="flex" flexDirection={isDisplayLessMd ? 'column' : 'row'}>
                  <Box mr={isDisplayLessMd ? '0' : '10px'}>
                    <Typography fontWeight="bold">First Name</Typography>
                    <TextField
                      fullWidth
                      name="name"
                      value={values.name}
                      placeholder="First name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
                      className={classes.firstNameField}
                    />
                  </Box>
                  <Box>
                    <Typography fontWeight="bold">Last Name</Typography>
                    <TextField
                      fullWidth
                      name="surname"
                      value={values.surname}
                      placeholder="Last name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                      error={Boolean(touched.surname && errors.surname)}
                      helperText={touched.surname && errors.surname}
                    />
                  </Box>
                </Box>
                <Box mt={1} mb={1}>
                  <Typography fontWeight="bold">Date of birth</Typography>
                  <DatePicker
                    name="dateOfBirth"
                    sx={{ width: '100%' }}
                    id="dateOfBirth"
                    disableFuture
                    onChange={(value) => {
                      setFieldValue('dateOfBirth', Date.parse(value));
                      setFieldValue(
                        'age',
                        differenceInCalendarYears(new Date(), new Date(value)).toString()
                      );
                    }}
                    value={values.dateOfBirth}
                    format="dd.MM.yyyy"
                    onBlur={handleBlur}
                  />
                </Box>
                <Box>
                  <Typography fontWeight="bold">Country</Typography>
                  <Select
                    sx={{ width: '100%', marginBottom: '10px' }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.country}
                    name="country">
                    {countiesList.map(({ value, label }) => (
                      <MenuItem key={value} value={label}>
                        {label}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <Box>
                  <Typography fontWeight="bold">Telephone</Typography>
                  <ReactPhoneInput
                    value={values.phone}
                    name="phone"
                    label=""
                    component={TextField}
                    onChange={(value, data, event) => setFieldValue('phone', event.target.value)}
                    onBlur={handleBlur}
                  />
                </Box>
              </Box>
            </Box>
            <Box
              mt="20px"
              display="flex"
              flexDirection={isDisplayLessMd ? 'column-reverse' : 'row'}
              justifyContent={isDisplayLessMd ? 'start' : 'space-between'}>
              <Box width={isDisplayLessMd ? '100%' : 'auto'}>
                <Button sx={{ width: '50%' }} type="submit" variant="contained">
                  Save
                </Button>
                <Button sx={{ width: '50%' }} variant="text" onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
              {user && client && (
                <Button
                  sx={{ width: 'fit-content', marginBottom: '16px' }}
                  color="error"
                  variant="text"
                  startIcon={<DeleteIcon />}
                  onClick={() => setIsDeleteClientModalWindowOpen(true)}>
                  Delete client
                </Button>
              )}
            </Box>
          </form>
        </Box>
      </ModalWindow>
    </>
  );
};

export default CreateEditClientModalContent;
