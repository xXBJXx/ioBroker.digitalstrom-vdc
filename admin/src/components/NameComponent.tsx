/**
 * Created by alex-issi on 15.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { TextField } from '@mui/material';
import { Config } from '../lib/Config';

export interface NameComponentProps {
    clear: boolean;
}

export const NameComponent: React.FC<NameComponentProps> = ({ clear }): JSX.Element => {
    const { translate: _ } = useI18n();
    const [name, setName] = React.useState('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        Config.name = event.target.value;
    };

    React.useEffect(() => {
        setName('');
        Config.name = '';
    }, [clear]);

    return (
        <React.Fragment>
            <TextField id="device-name" label={_('nameComponent-name')} value={name} onChange={handleNameChange} />
        </React.Fragment>
    );
};
