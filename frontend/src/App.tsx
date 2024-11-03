import axios from 'axios';
import { useEffect, useState } from 'react'

import './App.css'
import { IDevice } from './types/Device.t';
import DeviceFieldLine from './components/DeviceFieldLine';

const SERVER_URI = 'http://localhost:3001/all'

function App() {
  const [deviceFields, setDeviceFields] = useState<IDevice[]>([]);
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
