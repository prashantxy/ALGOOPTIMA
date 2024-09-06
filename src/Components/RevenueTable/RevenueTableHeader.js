import React from 'react';
import RevenuetableRow from './RevenuetableRow';

const RevenueTableHeader = ({ incomeData }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>BUS ID</th>
            <th>Bus No</th>
            <th>Ticket Cost</th>
            <th>HLD</th>
            <th>Expense</th>
            <th>P&L</th>
          </tr>
        </thead>
        <tbody>
          {incomeData.map((bus) => (
            <RevenuetableRow key={bus.id} {...bus} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RevenueTableHeader;
