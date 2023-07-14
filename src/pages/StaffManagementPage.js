import React, { useState } from 'react';
import { filter } from 'lodash';
import { Helmet } from 'react-helmet-async';
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

import STAFFLIST from '../_mock/staff';

function StaffManagementPage() {
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Validation state
    const [isFormValid, setIsFormValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = STAFFLIST.map((n) => n.name);
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
        setFullName('');
        setEmail('');
        setMobileNumber('');
        setPassword('');
        setConfirmPassword('');
        setIsFormValid(true);
        setIsEmailValid(true);
        setIsPasswordValid(true);
        setIsConfirmPasswordValid(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleFullNameChange = (event) => {
        setFullName(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleMobileNumberChange = (event) => {
        setMobileNumber(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate form fields
        let isValid = true;

        if (!fullName || !email || !mobileNumber || !password || !confirmPassword) {
            setIsFormValid(false);
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.match(emailRegex)) {
            setIsEmailValid(false);
            isValid = false;
        }

        if (password.length < 6 || password !== confirmPassword) {
            setIsPasswordValid(false);
            setIsConfirmPasswordValid(false);
            isValid = false;
        }

        if (isValid) {
            // Perform submit logic here
            console.log('Form submitted:', { fullName, email, mobileNumber, password });
            handleModalClose();
        }
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - STAFFLIST.length) : 0;

    const filteredUsers = applySortFilter(STAFFLIST, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    const TABLE_HEAD = [
        { id: 'name', label: 'Name', alignCenter: true },
        { id: 'email', label: 'Email', alignCenter: true },
        { id: 'phone', label: 'Phone', alignCenter: true },
        { id: '' },
    ];

    return (
        <>
            <Helmet>
                <title>Staff Management</title>
            </Helmet>
            <Container maxWidth='lg' disableGutters>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Staff Management
                    </Typography>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleModalOpen}>
                        Add New Staff
                    </Button>
                </Stack>
                <Card>
                    <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} placeholder={"Search Staff"} />
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={STAFFLIST.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody>
                                    {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                        const { id, name, email, phone, empty } = row;
                                        const selectedUser = selected.indexOf(name) !== -1;

                                        return (
                                            <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser} sx={{ verticalAlign: 'bottom' }}>
                                                <TableCell sx={{ width: '2px', margin: '0', padding: '0' }}>
                                                    <></>
                                                </TableCell>

                                                <TableCell component="th" scope="row" padding="none" align="center" sx={{ verticalAlign: 'middle' }}>
                                                    <Typography variant="subtitle2" noWrap>
                                                        {name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">{email} </TableCell>
                                                <TableCell align="center">{phone} </TableCell>
                                                <TableCell align="center">
                                                    <Button sx={{ fontSize: '12px', color: 'white', minWidth: '113px', mt: '6px', bgcolor: '#E64848' }} variant="contained" startIcon={<Iconify icon="mdi:account-remove" />}>
                                                        Remove
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
                        count={STAFFLIST.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container>

            {/* Add New Staff Modal */}
            <Modal open={isModalOpen} onClose={handleModalClose}>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        padding: '2rem',
                        outline: 'none',
                    }}
                >
                    <Typography variant="h5" gutterBottom>
                        Add New Staff
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Full Name"
                            value={fullName}
                            onChange={handleFullNameChange}
                            error={!isFormValid && !fullName}
                            helperText={!isFormValid && !fullName && 'Full Name is required'}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            error={!isFormValid && (!email || !isEmailValid)}
                            helperText={!isFormValid && (!email ? 'Email is required' : 'Invalid email format')}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Mobile Number"
                            value={mobileNumber}
                            onChange={handleMobileNumberChange}
                            error={!isFormValid && !mobileNumber}
                            helperText={!isFormValid && !mobileNumber && 'Mobile Number is required'}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={password}
                            onChange={handlePasswordChange}
                            error={!isFormValid && (!password || !isPasswordValid)}
                            helperText={!isFormValid && (!password ? 'Password is required' : 'Password should be at least 6 characters long')}
                            margin="normal"
                            fullWidth
                        />
                        <TextField
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            error={!isFormValid && (!confirmPassword || !isConfirmPasswordValid)}
                            helperText={
                                !isFormValid && (!confirmPassword ? 'Confirm Password is required' : "Passwords don't match")
                            }
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

export default StaffManagementPage;
