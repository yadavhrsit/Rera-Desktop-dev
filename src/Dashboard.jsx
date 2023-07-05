import React, { useState } from 'react';
import { Grid, Box, TextField } from '@mui/material';
import MainButton from './MainButton';
import PillShapedbtn from './PillShapedBtn';
import PillShapedSelect from './PillShapedSelect';
import SmallHeading from './SmallHeading';
import Activities from './Activities';

function Dashboard() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectStateChange = (event) => {
        setSelectedOption(event.target.value);
    };
    const States = [
        { value: 'Mh', label: 'Maharashtra' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ]

    return (
        <Grid container>
            <Grid item xs={1.8} style={{ height: '100vh', backgroundColor: 'whitesmoke', borderRight: '1px solid #c9d6df', padding: '10px 16px', display: 'flex', flexDirection: 'column', gap: '15px' }}>

                <div style={{ display: 'flex', backgroundColor: 'grey', padding: '15px 10px', borderRadius: '8px', color: 'white', width: '100%', boxSizing: 'border-box' }}>
                    <Box
                        sx={{
                            width: '35%',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={'https://placehold.it/200'}
                            alt="My Logo"
                            style={{
                                width: '100%',
                                borderRadius: '50%',
                            }}
                        />
                    </Box>
                    <p style={{ marginLeft: 'auto' }}>XYZ Company</p>
                </div>
                <MainButton text={'Dashboard'} />
                <MainButton text={'Projects'} />

            </Grid>

            <Grid item xs={10.2} style={{ height: '100vh', backgroundColor: 'white' }}>
                <Box sx={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Box sx={{
                        width: '100%',
                    }}>
                        <Box
                            sx={{
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'white',
                                padding: '20px 10px',
                                boxSizing: 'border-box',
                                display: 'flex',
                                gap: '20px',
                                borderBottom: '1px solid #c9d6df'
                            }}
                        >
                            <TextField
                                label="Search Project"
                                placeholder="Search Project"
                                variant='outlined'
                                fullWidth
                            />
                            <PillShapedbtn text={'Create Project'} bgColor={'#1F8A70'} />
                            <PillShapedSelect
                                options={States}
                                value={selectedOption}
                                onChange={handleSelectStateChange}
                            />
                        </Box>
                    </Box>
                    <Box sx={{
                        height: '90%',
                        width: '100%',
                        display: 'flex'
                    }}>
                        <Box sx={{
                            height: '100%',
                            width: '80%',
                            background: 'white'
                        }}>

                        </Box>
                        <Box sx={{
                            height: '100%',
                            width: '20%',
                            background: 'whitesmoke',
                            borderLeft: '1px solid #c9d6df'
                        }}>
                            <Box sx={{ height: '50%', borderBottom: '1px solid #c9d6df', display: 'flex', flexDirection: 'column' }}>
                                <SmallHeading text={"Activities"} />
                                <Activities />
                            </Box>
                            <SmallHeading text={"Report by Location"} />
                        </Box>
                    </Box>
                </Box>
            </Grid>


        </Grid >
    );
}

export default Dashboard;
