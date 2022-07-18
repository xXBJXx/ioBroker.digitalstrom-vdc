/**
 * Created by alex-issi on 15.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Box, Grid, TextField } from '@mui/material';
import { Config } from '../lib/Config';

export interface NameComponentProps {
    //props
}

export const NameComponent: React.FC<NameComponentProps> = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [name, setName] = React.useState('');
    const [configURL, setConfigURL] = React.useState('http://localhost:8081');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        Config.name = event.target.value;
    };
    const handleConfigURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfigURL(event.target.value);
        Config.configUrl = event.target.value;
    };

    return (
        <React.Fragment>
            <Grid
                container
                spacing={1}
                sx={{
                    marginTop: '10px',
                    paddingBottom: '15px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
            >
                <React.Fragment>
                    <Box
                        sx={{
                            marginTop: '10px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            flexWrap: 'wrap',
                            flexDirection: 'row',
                        }}
                    >
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="outlined-name" label={_('name')} value={name} onChange={handleNameChange} />
                            <TextField
                                id="outlined-Url"
                                label={_('config_url')}
                                placeholder={'http://localhost:8081'}
                                value={configURL}
                                onChange={handleConfigURLChange}
                            />
                        </Box>
                    </Box>
                </React.Fragment>
            </Grid>
        </React.Fragment>
    );
};
