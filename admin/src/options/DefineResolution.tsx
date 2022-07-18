import { Info } from '@material-ui/icons';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { Config } from '../lib/Config';

export default function DefineResolution() {
    const [name, setName] = React.useState('');
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(event.target.value);
        Config.deviceSensorResolution = Number(event.target.value);
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField id="outlined-name" label="Resolution" value={name} onChange={handleChange} />
            <Tooltip title="tooltipResolution">
                <IconButton>
                    <Info />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
