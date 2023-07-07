import { Helmet } from 'react-helmet-async';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
// components
// sections
import {
  AppNewsUpdate,
  AppCurrentVisits,

  AppWidgetSummary,
} from '../sections/@dashboard/app';
import Iconify from '../components/iconify';
// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Dashboard | RERA </title>
      </Helmet>

      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} sm={6} md={8}>
            <Typography variant="h4" sx={{ mb: 5 }}>
              Hi, Welcome back
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
              Create Project
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Button variant="contained" startIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
              Maharashtra
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="Reports Generated" total={5} icon={'mdi:file-document-check'} />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="User Visits" total={47} color="success" icon={'ant-design:user-switch-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="Active Projects" total={7} color="info" icon={'ant-design:check-circle-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="Time Spend" total={1723315} color="warning" icon={'mdi:clock'} />
          </Grid>

          <Grid item xs={12} sm={6} md={2.4}>
            <AppWidgetSummary title="New Projects Created" total={4} color="success" icon={'ant-design:plus-circle-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8} >
            <AppNewsUpdate
              title="Activities"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.finance.transactionDescription(),
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Report By Location"
              chartData={[
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
