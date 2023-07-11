import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, AppBar, IconButton } from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Iconify from '../../../components/iconify';
//

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;


const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));



// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav }) {
  return (
    <StyledRoot>
      <IconButton
        onClick={onOpenNav}
        sx={{
          mr: 1,
          color: 'text.primary',
          display: { lg: 'none' },
        }}
      >
        <Iconify icon="eva:menu-2-fill" />
      </IconButton>
      <Box sx={{ flexGrow: 1 }} />
    </StyledRoot>
  );
}
