import React from 'react'
import { Typography, Box } from '@mui/material'
function SmallHeading(props) {
    return (
        <Box sx={{ width: '100%', backgroundColor: 'grey', color: 'white', padding: '10px', boxSizing: 'border-box' }}>
            <Typography variant='h6' letterSpacing={1}>{props.text}</Typography>
        </Box>
    )
}

export default SmallHeading