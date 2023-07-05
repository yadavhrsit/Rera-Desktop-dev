import React from 'react'
import { Typography } from '@mui/material'
function Activity(props) {
    return (
        <Typography sx={{ mt: '4px', ml: '5px' }}>{props.text}</Typography>
    )
}

export default Activity