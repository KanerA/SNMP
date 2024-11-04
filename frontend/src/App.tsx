import axios from 'axios';
import { useEffect, useState } from 'react';

import useWebSocket from "react-use-websocket";

import './App.css'
import { IDevice } from './types/Device.t';
import DeviceFieldLine from './components/DeviceFieldLine';

const SERVER_URI = 'http://localhost:3001/all';
const WS_URL = "ws://127.0.0.1:8080";

function App() {
  const [deviceFields, setDeviceFields] = useState<IDevice[]>([]);

  const { sendJsonMessage } = useWebSocket(WS_URL, {
    onOpen: () => {
      console.log("WebSocket connection established.");
    },
    onMessage: (msg) => {
      const updatedData: IDevice[] = JSON.parse(msg.data);
      const updatedFields = deviceFields.map((field: IDevice) => {
        for (let i = 0; i < updatedData.length; i++) {
          return field.oid === updatedData[i].oid
            ? { ...field, value: updatedData[i].value }
            : field
        }
      });
      setDeviceFields(updatedFields as unknown as IDevice[])
    },
    share: true,
    filter: () => false,
    retryOnError: true,
    shouldReconnect: () => true,
  });


  useEffect(() => {
    const func = async () => {
      const result = await axios.get(SERVER_URI, {
        params: {
          oids: ["1.3.6.1.4.1.9999.1"]
        }
      });
      const { data } = result;
      console.log("data from server", { data, timestamp: new Date() });
      const mappedData = data.map((val: any) => {
        return val;
      });
      setDeviceFields(mappedData)
    };
    func()
  }, []);

  return (
    <div id="mainContainer">
      <div className="pageTitle">DEVICES DISPLAY</div>
      <div id="devicesGallery">
        <div className="deviceDisplayBox">
          {
            deviceFields?.map((device, index) => <DeviceFieldLine
              key={`prop-${index}`}
              title={device.oid}
              value={device.value}
            />)
          }
        </div>

      </div>
    </div>
  )
}

export default App
