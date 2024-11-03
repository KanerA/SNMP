import axios from 'axios';
import { useEffect, useState } from 'react'

import './App.css'
import { IDevice } from './types/Device.t';
import DeviceDisplayBox from './components/DeviceDisplayBox';

const SERVER_URI = 'http://localhost:3001/all'

function App() {
  const [devices, setDevices] = useState<IDevice[]>([]);
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
        // if (val.type === 4) val.value = val.value.data.toString("utf-8");
        return val;
      });
      setDevices(mappedData)
    };
    func()
  }, []);

  return (
    <div id="mainContainer">
      <div className="pageTitle">DEVICES DISPLAY</div>
      <div id="devicesGallery">
        {
          devices?.map((device, index) => <DeviceDisplayBox
            key={`device-${index}`}
            oid={device.oid}
            type={device.type}
            value={device.value}
          />)
        }

      </div>
    </div>
  )
}

export default App
