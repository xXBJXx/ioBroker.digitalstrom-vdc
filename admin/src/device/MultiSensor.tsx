/**
 * Created by alex-issi on 15.07.22
 */
import React from 'react';
import { useI18n } from 'iobroker-react/hooks';

export interface MultiSensorProps {
    //props
}

export const MultiSensor: React.FC<MultiSensorProps> = (): JSX.Element => {
    const { translate: _ } = useI18n();

    return <React.Fragment></React.Fragment>;
};
