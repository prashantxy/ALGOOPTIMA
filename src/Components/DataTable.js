import React from 'react'
import BusTable from './BusTable';

const DataTable = ({ currentBuses }) => {
    return (
        <table>
        <thead>
          <tr>
            <th>BUS ID</th>
            <th>Bus No</th>
            <th>Start</th>
            <th>Destination</th>
            <th>Recent Stop</th>
            <th>Hyper Local
              Delivery</th>
          </tr>
        </thead>
        <tbody>
          {currentBuses.map((bus) => (
              <BusTable key={bus.id} {...bus} />
          ))}
        </tbody>
      </table>
  );
}

export default DataTable