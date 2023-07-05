import React from 'react';
import { Box } from '@mui/material';
import Activity from './Activity';

function Activities() {
    return (
        <Box
            sx={{
                overflowY: 'auto',
                width: '98%',
                height: '100%',
                padding: '6px 1px 2px 8px',
                boxSizing: 'border-box',
                wordWrap: 'break-word',
                hyphens: 'auto',
            }}
        >
            <Activity
                text={"Just a random activity or a Notification"}
            />
            <Activity
                text={"Just a random activity or another Notification"}
            />
            <Activity
                text={"Just a random activity or a third Notification"}
            />
            <Activity
                text={"Just a random activity or a fourth Notification"}
            />
            <Activity
                text={"Just a random activity or a Notification"}
            />
            <Activity
                text={"Just a random activity or a Notification"}
            />
            <Activity
                text={"Just a random activity or another Notification"}
            />
            <Activity
                text={"Just a random activity or a Notification"}
            />
            <Activity
                text={"Just a random activity or a Notification"}
            />
            <Activity
                text={"Just a random activity or a Notification"}
            />
        </Box>
    );
}

export default Activities;
