import { CircularProgress } from '@mui/material';

const Loader = () => (
  <div
    style={{
      backgroundColor: 'rgb(31, 31, 31)',
      opacity: 0.6,
      width: '100%',
      height: '100%',
      animationDuration: '0.1s',
      animationName: 'sliding',
      position: 'fixed',
      top: 0,
      zIndex: 20000,
      pointerEvents: 'all',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      userSelect: 'none'
    }}>
    <CircularProgress size={80} />
  </div>
);

export default Loader;
