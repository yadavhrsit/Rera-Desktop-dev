import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import {
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
  TextField,
  Modal,
} from '@mui/material';

import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';

import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

export default function ProjectsPage() {

  const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignCenter: true },
    { id: 'company', label: 'Company', alignCenter: true },
    { id: 'owner', label: 'Owner', alignCenter: true },
    { id: 'arc', label: 'Architect', alignCenter: true },
    { id: 'consultant', label: 'Consultant', alignCenter: true },
    { id: 'ca', label: 'CA', alignCenter: true },
    { id: 'report', label: 'Report', alignCenter: true },
    { id: 'staff', label: 'Assigned Staff', alignCenter: true },
  ];

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [numOfBuildings, setNumOfBuildings] = useState(0);
  const [buildingNames, setBuildingNames] = useState([]);
  const [numOfWings, setNumOfWings] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [designation, setDesignation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [surveyorName, setSurveyorName] = useState('');
  const [structuralConsultant, setStructuralConsultant] = useState('');
  const [mepConsultant, setMepConsultant] = useState('');
  const [siteSupervisor, setSiteSupervisor] = useState('');

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

  const handleModalOpen = () => {
    setIsModalOpen(true);
    setProjectName('');
    setNumOfBuildings(0);
    setBuildingNames([]);
    setNumOfWings([]);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleProjectNameChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleNumOfBuildingsChange = (event) => {
    const numBuildings = parseInt(event.target.value, 10);
    setNumOfBuildings(numBuildings);

    // Update building names array
    const newBuildingNames = [];
    for (let i = 0; i < numBuildings; i += 1) {
      newBuildingNames.push('');
    }
    setBuildingNames(newBuildingNames);

    // Update num of wings array
    const newNumOfWings = [];
    for (let i = 0; i < numBuildings; i += 1) {
      newNumOfWings.push(0);
    }
    setNumOfWings(newNumOfWings);
  };

  const handleBuildingNameChange = (event, index) => {
    const updatedBuildingNames = [...buildingNames];
    updatedBuildingNames[index] = event.target.value;
    setBuildingNames(updatedBuildingNames);
  };

  const handleNumOfWingsChange = (event, index) => {
    const updatedNumOfWings = [...numOfWings];
    updatedNumOfWings[index] = parseInt(event.target.value, 10);
    setNumOfWings(updatedNumOfWings);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleClientAddressChange = (event) => {
    setClientAddress(event.target.value);
  };

  const handleOwnerNameChange = (event) => {
    setOwnerName(event.target.value);
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };

  const handleSurveyorNameChange = (event) => {
    setSurveyorName(event.target.value);
  };

  const handleStructuralConsultantChange = (event) => {
    setStructuralConsultant(event.target.value);
  };

  const handleMepConsultantChange = (event) => {
    setMepConsultant(event.target.value);
  };

  const handleSiteSupervisorChange = (event) => {
    setSiteSupervisor(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform submit logic here
    console.log('Form submitted:', {
      projectName,
      numOfBuildings,
      buildingNames,
      numOfWings,
    });

    handleModalClose();
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = USERLIST.filter((_user) =>
    _user.name.toLowerCase().includes(filterName.toLowerCase())
  );

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
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleModalOpen}>
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
                    const { id, name, company, owner, ca, architect, consultant, staff } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser} sx={{ verticalAlign: 'middle' }}>
                        <TableCell sx={{ width: '2px', margin: '0', padding: '0' }}>
                          <></>
                        </TableCell>

                        <TableCell component="th" scope="row" padding="0px 0px 0px 4px" align="center" sx={{ verticalAlign: 'middle' }}>
                          <Typography variant="subtitle2" noWrap>
                            {name}
                          </Typography>
                        </TableCell>

                        <TableCell align="center" sx={{ verticalAlign: 'middle' }}>{company} </TableCell>

                        <TableCell align="center">{owner}
                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mt: '10px' }} variant="contained" startIcon={<Iconify icon="mdi:eye-outline" />}>
                            View Report
                          </Button>
                        </TableCell>

                        <TableCell align="center">{architect}
                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mt: '10px' }} variant="contained" startIcon={<Iconify icon="mdi:eye-outline" />}>
                            View Report
                          </Button>
                        </TableCell>

                        <TableCell align="center">{consultant}
                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mt: '10px' }} variant="contained" startIcon={<Iconify icon="mdi:eye-outline" />}>
                            View Report
                          </Button>
                        </TableCell>

                        <TableCell align="center">{ca}
                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mt: '10px' }} variant="contained" startIcon={<Iconify icon="mdi:eye-outline" />}>
                            View Report
                          </Button>
                        </TableCell>

                        <TableCell align="center">
                          <br />
                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mb: '6px', }} variant="contained" startIcon={<Iconify icon="mdi:eye" />}>
                            View
                          </Button>
                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mb: '6px', }} variant="contained" startIcon={<Iconify icon="mdi:file-edit" />}>
                            Edit
                          </Button>
                          <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mb: '6px', }} variant="contained" startIcon={<Iconify icon="mdi:download" />}>
                            Download
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
      </Container>

      {/* Modal */}
      <Modal open={isModalOpen} onClose={handleModalClose}>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'white',
            padding: '2rem',
            outline: 'none',
            maxHeight: '80vh',
            overflowY: 'auto',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            maxWidth: '90%',
          }}
        >
          <Typography variant="h5" gutterBottom>
            Add New Project
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              value={selectedDate}
              onChange={handleDateChange}
              margin="normal"
              fullWidth
              InputLabelProps={{
                shrink: true,
                style: { position: 'absolute', top: '-8px', color: '#888' },
              }}

              label="Select Date"
              type="date"
            />

            <TextField
              label="Client address"
              value={clientAddress}
              onChange={handleClientAddressChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Project name"
              value={projectName}
              onChange={handleProjectNameChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="No. of buildings"
              type="number"
              value={numOfBuildings}
              onChange={handleNumOfBuildingsChange}
              margin="normal"
              fullWidth
            />
            {buildingNames.map((buildingName, index) => (
              <TextField
                key={index}
                label={`Name of building no. ${index + 1}`}
                value={buildingName}
                onChange={(event) => handleBuildingNameChange(event, index)}
                margin="normal"
                fullWidth
              />
            ))}
            {numOfWings.map((numOfWing, index) => (
              <TextField
                key={index}
                label={`No. of wing in building no. ${index + 1}`}
                type="number"
                value={numOfWing}
                onChange={(event) => handleNumOfWingsChange(event, index)}
                margin="normal"
                fullWidth
              />
            ))}
            <TextField
              label="Name of Promoter / Owner / Developer"
              value={ownerName}
              onChange={handleOwnerNameChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Designation"
              value={designation}
              onChange={handleDesignationChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Company name (M/s.)"
              value={companyName}
              onChange={handleCompanyNameChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Name of Licensed surveyor / Licensed Engineer"
              value={surveyorName}
              onChange={handleSurveyorNameChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Structural consultant"
              value={structuralConsultant}
              onChange={handleStructuralConsultantChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="MEP consultant"
              value={mepConsultant}
              onChange={handleMepConsultantChange}
              margin="normal"
              fullWidth
            />
            <TextField
              label="Site supervisor"
              value={siteSupervisor}
              onChange={handleSiteSupervisorChange}
              margin="normal"
              fullWidth
            />
            <Button variant="contained" color="primary" type="submit" style={{ marginRight: '1rem' }}>
              Add
            </Button>
            <Button variant="contained" onClick={handleModalClose}>
              Cancel
            </Button>
          </form>
        </div>
      </Modal>

    </>
  );
}
