import React from 'react';

const DeviceFieldLine = (props: { title: string, value: string | number }) => {
    return (
        <div className="deviceValue">
            {props.title}: {props.value}
        </div>
    );
};

export default DeviceFieldLine;