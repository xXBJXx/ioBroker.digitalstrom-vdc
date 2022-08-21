/**
 * Created by alex-issi on 16.07.22
 */
import React from 'react';
import { SelectID } from '../components/SelectID';
import { FormControl, Grid } from '@mui/material';
import { handleSelectId } from '../lib/handleSelectID';
import { SensorFunction } from '../components/SensorFunction';
import { InputUsage } from '../components/InputUsage';

export const BinarySensorComponent = (): JSX.Element => {
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
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <SensorFunction />
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputUsage />
                    </FormControl>
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
                        title={'binarySensorComponent-SelectID'}
                        type={'binarySensor'}
                        buttonTitle={'binarySensorComponent-SelectButton'}
                        onSelect={(selectId, type) => {
                            handleSelectId(selectId, type);
                        }}
                    />
                </React.Fragment>
            </Grid>
        </React.Fragment>
    );
};
