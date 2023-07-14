import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState } from 'react';
// @mui
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box
} from '@mui/material';
// icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignCenter: true },
  { id: 'company', label: 'Company', alignCenter: true },
  { id: 'owner', label: 'Owner', alignCenter: true },
  { id: 'arc', label: 'Architect', alignCenter: true },
  { id: 'consultant', label: 'Consultant', alignCenter: true },
  { id: 'ca', label: 'CA', alignCenter: true },
  { id: 'report', label: 'Report', alignCenter: true },
  { id: 'staff', label: 'Assigned Staff', alignCenter: true },
  { id: 'download', label: 'Download', alignCenter: true },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ProjectsPage() {
  const [open, setOpen] = useState(null);
  const [openShare, setOpenShare] = useState(null); // Added state for the share menu

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);



  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title>Projects</title>
      </Helmet>

      <Container maxWidth='xl' disableGutters>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Projects
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Project
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} placeholder={"Search Project..."} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name, company, owner, ca, architect, consultant, staff, empty } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser} sx={{ verticalAlign: 'middle' }}>
                        <TableCell sx={{ width: '2px', margin: '0', padding: '0' }}>
                          <></>
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none" align="center" sx={{ verticalAlign: 'middle' }}>
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </TableCell>

                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}>{company} </TableCell>

                        <TableCell align="center">{owner}
                          <Accordion sx={{ width: 'min-content', padding: '0' }}>
                            <AccordionSummary sx={{
                              padding: '0px 18px',

                            }}
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              Share Report
                            </AccordionSummary>
                            <AccordionDetails>
                              <Button sx={{ fontSize: '12px', bgcolor: '#25D366', color: 'white', minWidth: '100px', width: '100%', mt: '6px' }} variant="contained" startIcon={<Iconify icon="ant-design:whats-app-outlined" />}>
                                Whatsapp
                              </Button>
                              <Button sx={{ fontSize: '12px', bgcolor: '#E64848', color: 'white', minWidth: '113px', width: '100%', mt: '6px' }} variant="contained" startIcon={<Iconify icon="ant-design:mail-outlined" />}>
                                Email
                              </Button>
                            </AccordionDetails>
                          </Accordion>
                        </TableCell>

                        <TableCell align="center">{architect}
                          <Accordion sx={{ width: 'min-content', padding: '0' }}>
                            <AccordionSummary sx={{
                              padding: '0px 18px',

                            }}
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              Share Report
                            </AccordionSummary>
                            <AccordionDetails>
                              <Button sx={{ fontSize: '12px', bgcolor: '#25D366', color: 'white', minWidth: '100px', width: '100%', mt: '6px' }} variant="contained" startIcon={<Iconify icon="ant-design:whats-app-outlined" />}>
                                Whatsapp
                              </Button>
                              <Button sx={{ fontSize: '12px', bgcolor: '#E64848', color: 'white', minWidth: '113px', width: '100%', mt: '6px' }} variant="contained" startIcon={<Iconify icon="ant-design:mail-outlined" />}>
                                Email
                              </Button>
                            </AccordionDetails>
                          </Accordion>

                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mt: '6px', mb: '6px' }} variant="contained" startIcon={<Iconify icon="mdi:eye-outline" />}>
                            View Report
                          </Button>
                        </TableCell>

                        <TableCell align="center">{consultant}
                          <Accordion sx={{ width: 'min-content', padding: '0' }}>
                            <AccordionSummary sx={{
                              padding: '0px 18px',

                            }}
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              Share Report
                            </AccordionSummary>
                            <AccordionDetails>
                              <Button sx={{ fontSize: '12px', bgcolor: '#25D366', color: 'white', minWidth: '100px', width: '100%', mt: '6px' }} variant="contained" startIcon={<Iconify icon="ant-design:whats-app-outlined" />}>
                                Whatsapp
                              </Button>
                              <Button sx={{ fontSize: '12px', bgcolor: '#E64848', color: 'white', minWidth: '113px', width: '100%', mt: '6px' }} variant="contained" startIcon={<Iconify icon="ant-design:mail-outlined" />}>
                                Email
                              </Button>
                            </AccordionDetails>
                          </Accordion>

                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mt: '6px', mb: '6px' }} variant="contained" startIcon={<Iconify icon="mdi:eye-outline" />}>
                            View Report
                          </Button>
                        </TableCell>

                        <TableCell align="center">{ca}
                          <Accordion sx={{ width: 'min-content', padding: '0' }}>
                            <AccordionSummary sx={{
                              padding: '0px 18px',
                            }}
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              Share Report
                            </AccordionSummary>
                            <AccordionDetails>
                              <Button sx={{ fontSize: '12px', bgcolor: '#25D366', color: 'white', minWidth: '100px', width: '100%', mt: '6px' }} variant="contained" startIcon={<Iconify icon="ant-design:whats-app-outlined" />}>
                                Whatsapp
                              </Button>
                              <Button sx={{ fontSize: '12px', bgcolor: '#E64848', color: 'white', minWidth: '113px', width: '100%', mt: '6px' }} variant="contained" startIcon={<Iconify icon="ant-design:mail-outlined" />}>
                                Email
                              </Button>
                            </AccordionDetails>
                          </Accordion>

                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mt: '6px', mb: '6px' }} variant="contained" startIcon={<Iconify icon="mdi:eye-outline" />}>
                            View Report
                          </Button>

                        </TableCell>

                        <TableCell align="center">
                          {empty}

                          <br />
                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', }} variant="contained" startIcon={<Iconify icon="mdi:file-edit" />}>
                            Edit Your
                          </Button>
                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mt: '6px', }} variant="contained" startIcon={<Iconify icon="mdi:eye-outline" />}>
                            View All
                          </Button>
                        </TableCell>

                        <TableCell align="center">{staff}
                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mt: '6px', bgcolor: '#E64848' }} variant="contained" startIcon={<Iconify icon="mdi:account-remove" />}>
                            Remove
                          </Button>
                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mt: '6px' }} variant="contained" startIcon={<Iconify icon="mdi:account-plus" />}>
                            Add
                          </Button>
                        </TableCell>

                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}>
                          <Button disabled>
                            <Iconify icon={'eva:download-fill'} width={'30px'} />
                          </Button>
                        </TableCell>
                        <TableCell sx={{ width: '2px', margin: '0', padding: '0' }}>
                          <></>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container >
    </>
  );
}
