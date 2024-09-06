import React from 'react'

const RevenuetableRow = ({ id,busNo,ticketCost,hld,expense }) => {
  return (
    <tr className="bus-row">
    <td>{id}</td>
    <td>{busNo}</td>
    <td>{ticketCost}</td>
    <td>{hld}</td>
    <td style={{color:'red'}}>{expense}</td>
    <td>
    <span className={`status ${ticketCost+hld >= expense ? 'active' : 'inactive'}`}>
    {ticketCost+hld-expense}
    </span>
    </td>
</tr>
  )
}

export default RevenuetableRow