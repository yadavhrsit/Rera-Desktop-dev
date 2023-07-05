import React from 'react';
import { Button } from '@mui/material';

const PillShapedbtn = ({ bgColor, text }) => {
    const buttonStyle = {
        borderRadius: '30px',
        backgroundColor: bgColor,
        color: 'white',
        whiteSpace: 'nowrap',
        fontWeight: '500',
        fontSize: '16px',
        width: '280px',
    };

    return (
        <Button variant="contained" style={buttonStyle}>
            {text}
        </Button>
    );
};

export default PillShapedbtn;
