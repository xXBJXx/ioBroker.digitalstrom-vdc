/**
 * Created by alex-issi on 13.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { useAdapter } from 'iobroker-react';
import { Button, Stack } from '@mui/material';
import { HighlightOff, RestartAlt, TaskAlt } from '@mui/icons-material';
import { useIoBrokerObject, useGlobals } from 'iobroker-react/hooks';

export const ConnectionHeader: React.FC = (): JSX.Element => {
    const { alive: adapterRunning, connected: driverReady } = useAdapter();
    const { translate: _ } = useI18n();
    const { namespace } = useGlobals();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [myObject, extendMyObject] = useIoBrokerObject(`system.adapter.${namespace}`, { subscribe: false });

    const handleRestart = async () => {
        await extendMyObject({});
        console.log('restarting');
    };

    if (!adapterRunning || !driverReady)
        return (
            <Stack spacing={2} direction="row" justifyContent="center">
                <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<RestartAlt />}
                    disabled
                    sx={{
                        borderRadius: '15px',
                        pointerEvents: 'none',
                    }}
                >
                    {_('connectionHeader-restart_vdc')}
                </Button>
                <Button
                    variant="contained"
                    color="warning"
                    endIcon={<HighlightOff />}
                    sx={{
                        borderRadius: '15px',
                        pointerEvents: 'none',
                    }}
                >
                    {_('connectionHeader-adapterNotRunning')}
                </Button>
            </Stack>
        );

    return (
        <Stack spacing={2} justifyContent="center" direction="row">
            <Button
                variant="outlined"
                color="primary"
                endIcon={<RestartAlt />}
                sx={{
                    borderRadius: '15px',
                }}
                onClick={handleRestart}
            >
                {_('connectionHeader-restart_vdc')}
            </Button>
            <Button
                variant="outlined"
                color="success"
                endIcon={<TaskAlt />}
                sx={{
                    borderRadius: '15px',
                    pointerEvents: 'none',
                }}
            >
                {_('connectionHeader-adapterRunning')}
            </Button>
        </Stack>
    );
};
