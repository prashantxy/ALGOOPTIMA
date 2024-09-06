import React from 'react'

const BusTable = ({ id, busNo, start, destination, recentStop, deliveryStatus }) => {
  return (
    
          <tr className="bus-row">
            <td>{id}</td>
            <td>{busNo}</td>
            <td>{start}</td>
            <td>{destination}</td>
            <td>{recentStop}</td>
            <td>
            <span className={`status ${deliveryStatus === 'Active' ? 'active' : 'inactive'}`}>
            {deliveryStatus}
            </span>
            </td>
        </tr>
    
  )
}

export default BusTable