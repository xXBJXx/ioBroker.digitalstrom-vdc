/**
 * Created by alex-issi on 15.07.22
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { useIoBrokerTheme } from 'iobroker-react/hooks';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { MultiSelectID, SelectID } from './SelectID';

export interface MultiSelectTableProps {
    // ids: string[] | undefined;
    //props
}

export const MultiSelectTable: React.FC<MultiSelectTableProps> = (): JSX.Element => {
    const { translate: _ } = useI18n();
    const [ids, setIds] = React.useState<string[] | undefined>([]);

    return (
        <React.Fragment>
            <Box
                sx={{
                    p: 2,
                    border: '1px dashed grey',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxWidth: '100%',
                    // width: '500px',
                }}
            >
                <MultiSelectID title={'test'} buttonTitle={'test'} onSelect={(selectId) => setIds(selectId)} />
                <TableContainer component={Paper} elevation={2}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell align={'center'}>{_('Selected ID')}</TableCell>
                                <TableCell align={'right'}>{_('config')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ids
                                ? ids.map((row: any) => (
                                      <TableRow key={row}>
                                          <TableCell align={'center'} component="th" scope="row">
                                              {row}
                                          </TableCell>
                                          <TableCell align={'right'}>
                                              <Button onClick={() => setIds(ids.filter((id) => id !== row))}>
                                                  {_('remove')}
                                              </Button>
                                          </TableCell>
                                      </TableRow>
                                  ))
                                : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </React.Fragment>
    );
};
