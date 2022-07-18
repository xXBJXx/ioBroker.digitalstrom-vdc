/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { SelectID } from '../components/SelectID';
import { Grid, SelectChangeEvent } from '@mui/material';
import { handleSelectId } from '../lib/handleSelectID';
import { SensorUsageComponent } from '../components/SensorUsageComponent';

export interface PresenceSensorComponentProps {
    //props
}

export const PresenceSensorComponent: React.FC<PresenceSensorComponentProps> = (): JSX.Element => {
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
                    <SensorUsageComponent />
                </React.Fragment>
            </Grid>
            <Grid
                container
                spacing={1}
                sx={{
                    paddingBottom: '15px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                }}
            >
                <React.Fragment>
                    <SelectID
                        title={'presenceSensorSelectID'}
                        type={'presenceSensor'}
                        buttonTitle={'presenceSelectIDButton'}
                        onSelect={(selectId, type) => {
                            handleSelectId(selectId, type);
                        }}
                    />
                </React.Fragment>
            </Grid>
        </React.Fragment>
    );
};
