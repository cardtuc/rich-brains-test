import { format } from 'date-fns';
import { Box, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/PlaceOutlined';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import CalendarMonthIcon from '@mui/icons-material/CalendarTodayOutlined';

import { dateFormatForDisplaying } from '@APP/constants';

const InfoClient = ({
  client: { name, surname, phone, country, dateOfBirth, age },
  isHover,
  nameFontSize = 'h6',
  user
}) => {
  const capitalize = (str) => str[0].toUpperCase() + str.slice(1);

  return (
    <Box>
      <Typography textAlign="center" variant={nameFontSize} fontWeight="bold">
        {capitalize(name)} {capitalize(surname)}
      </Typography>
      <Box display="flex" justifyContent="center" marginTop={2}>
        <PlaceIcon />
        <Typography>{country}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" marginTop={1}>
        <PhoneIphoneIcon />
        <Typography>{phone}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" marginTop={1}>
        <CalendarMonthIcon />
        <Typography>{format(new Date(dateOfBirth), dateFormatForDisplaying)} </Typography>
        {isHover && user && <Typography color="#87898F"> ({age} years)</Typography>}
      </Box>
    </Box>
  );
};

export default InfoClient;
