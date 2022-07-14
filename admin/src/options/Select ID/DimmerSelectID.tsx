import * as React from 'react';
import { Config } from '../../lib/Config';
import { useDialogs } from 'iobroker-react';
import { Button, Box } from '@mui/material';
import { useI18n } from 'iobroker-react/hooks';

export default function DimmerSelectID() {
    const [selectIdValue, setSelectIdValue] = React.useState<string | string[] | undefined>();
    const { translate: _ } = useI18n();
    const { showSelectId } = useDialogs();
    const writeBackSelectId = (selectId: React.SetStateAction<string | string[] | undefined>) => {
        setSelectIdValue(selectId);
        Config.DimmerSelectID = selectId;
    };

    console.log(Config.DimmerSelectID);
    const askUser = React.useCallback(async () => {
        const selected = await showSelectId({
            title: 'Select an ID',
        });
        setSelectIdValue(selected);
    }, [showSelectId]);
    return (
        <Box component="span" sx={{ p: 2, border: '1px dashed grey', textAlign: 'center' }}>
            <Button onClick={askUser} variant="outlined">
                {_('dimmerSelectID')}
            </Button>
            <br />
            <br />
            {_('selectedDimmerDP')}
            <br />
            <br />
            {JSON.stringify(selectIdValue)}
        </Box>
    );
}
