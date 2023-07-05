import React from 'react';
import { Select, MenuItem } from '@mui/material';

const pillSelectStyle = {
    borderRadius: '20px',
    backgroundColor: 'rgb(33, 150, 243)',
    color: 'white',
    whiteSpace: 'nowrap',
    fontWeight: 400,
    fontSize: '18px',
    width: '250px',
    paddingLeft: '12px',
    lineHeight: '0.40', // Vertically center
};

const PillShapedSelect = ({ options, value, onChange }) => {
    return (
        <Select
            value={value}
            onChange={onChange}
            style={pillSelectStyle}
            variant="filled"
            displayEmpty
            disableUnderline
        >
            <MenuItem value="" disabled>
                Select State
            </MenuItem>
            {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    );
};

export default PillShapedSelect;
