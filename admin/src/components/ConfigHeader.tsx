/**
 * Created by alex-issi on 30.07.22
 */
import React from 'react';
import { NameComponent } from './NameComponent';
import { UrlComponent } from './UrlComponent';
import { Box, Grid } from '@mui/material';
import { API } from '../lib/useAPI';

export interface ConfigHeaderProps {
    api: API;
    clearInput: boolean;
}

export const ConfigHeader: React.FC<ConfigHeaderProps> = ({ api, clearInput }): JSX.Element => {
    const [ipAdresse, setIpAdresse] = React.useState('localhost');
    const refreshIp = React.useCallback(async () => {
        const ip = await api.getHostIp();
        console.log('ip Adresse', ip);
        setIpAdresse(ip);
    }, [api]);

    React.useEffect(() => {
        (async () => {
            console.log('refreshing host ip');
            await refreshIp();
        })();
    }, []);

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
                            sx={{ '& > :not(style)': { m: 1 }, display: 'flex' }}
                            noValidate
                            autoComplete="off"
                        >
                            <NameComponent clear={clearInput} />
                            <UrlComponent clear={clearInput} ip={ipAdresse} />
                        </Box>
                    </Box>
                </React.Fragment>
            </Grid>
        </React.Fragment>
    );
};
