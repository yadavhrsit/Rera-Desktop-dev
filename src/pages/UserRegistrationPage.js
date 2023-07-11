import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button, } from '@mui/material';
// components
// sections
import {
  AppNewsUpdate,
  AppCurrentVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';
import AppCurrentTrends from '../sections/@dashboard/app/AppCurrentTrends';
import Iconify from '../components/iconify';
// ----------------------------------------------------------------------

export default function UserRegistrationPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Register | RERA </title>
      </Helmet>

      <Container maxWidth="xl">

      </Container >
    </>
  );
}
