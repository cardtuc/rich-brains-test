import { Box, Button } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SortType = {
  asc: 'asc',
  desc: 'desc'
};

const ToggleButton = ({ setSortType, sortType }) => (
  <Box display="flex" margin="0 7px">
    <Box width="100%" className="mask-box" bgcolor="rgba(199,199,199,0.38)" padding="3px">
      <Box
        className="mask"
        style={{
          transform: `translateX(${sortType === SortType.asc ? 0 : '100px'})`
        }}
      />
      <Button
        startIcon={<ArrowUpwardIcon />}
        disableRipple
        variant="text"
        sx={{
          color: sortType === SortType.asc ? '#188CFB' : '#000000',
          backgroundColor: sortType === SortType.asc && 'white',
          borderRadius: 0,
          width: '50%'
        }}
        onClick={() => setSortType(SortType.asc)}>
        Asc.
      </Button>
      <Button
        startIcon={<ArrowDownwardIcon />}
        disableRipple
        variant="text"
        sx={{
          color: sortType === SortType.desc ? '#188CFB' : '#000000',
          backgroundColor: sortType === SortType.desc && 'white',
          borderRadius: 0,
          width: '50%'
        }}
        onClick={() => setSortType(SortType.desc)}>
        Desc.
      </Button>
    </Box>
  </Box>
);

export default ToggleButton;
