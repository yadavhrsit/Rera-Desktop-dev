import React from 'react'
import { Button } from '@mui/material';
function MainButton(props) {
    return (
        <Button
            variant="contained"
            color="primary"
            sx={{ height: '42px', backgroundColor: '#2196f3', fontSize: '16px', borderRadius: '8px', }}
        >
            {props.text}
        </Button>
    )
}

export default MainButton