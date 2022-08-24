import React from 'react';
import ReactDOM from 'react-dom';
// import from iobroker-react docu page => https://github.com/AlCalzone/iobroker-react
import type { Translations } from 'iobroker-react/i18n';
import { ErrorBoundary } from 'react-error-boundary';
import { IoBrokerApp } from 'iobroker-react/app';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@iobroker/adapter-react/Theme';
import { useI18n, useIoBrokerTheme } from 'iobroker-react/hooks';
import { Box, Tab, Tabs } from '@mui/material';

// Components are imported here
import { TabPanel } from './components/TabPanel';
import { ConnectionHeader } from './components/ConnectionHeader';
import { SelectDeviceType } from './pages/DeviceTypeOptions';
import { ListDevices } from './pages/ListDevices';

// Load your translations
const translations: Translations = {
    en: require('./i18n/en.json'),
    de: require('./i18n/de.json'),
    ru: require('./i18n/ru.json'),
    pt: require('./i18n/pt.json'),
    nl: require('./i18n/nl.json'),
    fr: require('./i18n/fr.json'),
    it: require('./i18n/it.json'),
    es: require('./i18n/es.json'),
    pl: require('./i18n/pl.json'),
    'zh-cn': require('./i18n/zh-cn.json'),
};

function ErrorFallback({ error, resetErrorBoundary }: any) {
    const { translate: _ } = useI18n();
    return (
        <div role="alert">
            <p>{_('errorFallback-wrong')}</p>
            <pre>{error.stack}</pre>
            <button onClick={resetErrorBoundary}>{_('errorFallback-again')}</button>
        </div>
    );
}

function a11yProps(tabName: string, index: number) {
    return {
        id: `${tabName}-tab-${index}`,
        'aria-controls': `${tabName}-tabpanel-${index}`,
    };
}

const Root: React.FC = () => {
    const [value, setValue] = React.useState(0);
    const { translate: _ } = useI18n();
    const [themeName] = useIoBrokerTheme();

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <ThemeProvider theme={theme(themeName)}>
                <ConnectionHeader />
                <Box sx={{ marginTop: 1, width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            value={value}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            sx={{
                                '.MuiTabs-flexContainer': {
                                    justifyContent: 'space-around',
                                },
                            }}
                        >
                            <Tab label={_('tabs-tabListDevices')} {...a11yProps('tabListDevices', 0)} />
                            <Tab label={_('tabs-tabAddNewDevices')} {...a11yProps('tabAddNewDevices', 1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <ListDevices />
                        </ErrorBoundary>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <ErrorBoundary FallbackComponent={ErrorFallback}>
                            <SelectDeviceType />
                        </ErrorBoundary>
                    </TabPanel>
                </Box>
            </ThemeProvider>
        </React.Fragment>
    );
};

ReactDOM.render(
    <IoBrokerApp name={'digitalstrom-vdc'} translations={translations}>
        <Root />
    </IoBrokerApp>,
    document.getElementById('root'),
);
