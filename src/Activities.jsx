import React from 'react';
import { Box } from '@mui/material';
import Activity from './Activity';

function Activities() {
    return (
        <Box sx={{
            overflowY: 'scroll',
            boxSizing: 'border-box',
            height: '100%',
            flex: 1,
        }}>
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
