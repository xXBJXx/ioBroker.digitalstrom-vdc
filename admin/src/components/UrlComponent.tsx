/**
 * Created by alex-issi on 30.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';
import { Config } from '../lib/Config';
import { Autocomplete, TextField } from '@mui/material';

export interface UrlComponentProps {
    ip: string;
    clear: boolean;
}

export const UrlComponent: React.FC<UrlComponentProps> = ({ ip, clear }): JSX.Element => {
    const { translate: _ } = useI18n();
    const [value, setValue] = React.useState<string | null>('');
    const [inputValue, setInputValue] = React.useState('');

    const options = [`http://${ip}:8081/#tab-objects`, `https://${ip}:8081/#tab-objects`];

    const handleConfigURLChange = (value: React.SetStateAction<string>) => {
        setInputValue(value);
        if (typeof value === 'string') {
            Config.configUrl = value;
        }
        console.log('configURL', value);
    };

    React.useEffect(() => {
        setValue('');
        setInputValue('');
    }, [clear]);

    return (
        <React.Fragment>
            <Autocomplete
                id="config_url-input"
                freeSolo
                openOnFocus
                autoComplete
                options={options}
                value={value}
                sx={{ width: 400 }}
                inputValue={inputValue}
                onInputChange={(event: React.SyntheticEvent, newInputValue: string) => {
                    handleConfigURLChange(newInputValue);
                }}
                renderInput={(params) => <TextField {...params} label={_('urlComponent-configUrl')} />}
            />
        </React.Fragment>
    );
};
