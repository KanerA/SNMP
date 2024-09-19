import React from 'react';
import { IDevice } from '../types/Device.t';

const DeviceDisplayBox = (props: IDevice) => {
    return (
        <div className="deviceDisplayBox">
            <div className="deviceOID">
                OID: {props.oid}
            </div>
            <div className="deviceType">
                type: {props.type}
            </div>
            <div className="deviceValue">
                value: {props.value}
            </div>
        </div>
    );
};

export default DeviceDisplayBox;