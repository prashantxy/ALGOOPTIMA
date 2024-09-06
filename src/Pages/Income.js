import React, { useState } from 'react'
import ResourceAttendence from '../Components/ResourceAttendence'
import RevenueTableHeader from '../Components/RevenueTable/RevenueTableHeader'
import TableNavigator from '../Components/TableNavigator'

const revenueData = [
  { id: '13A', busNo: 'DL 99 1234', ticketCost: 3567, hld: 432, expense: 4232 },
  { id: '12A', busNo: 'DL 12 4321', ticketCost: 3567, hld: 432, expense: 232 },
  { id: '45C', busNo: 'DL 40 1764', ticketCost: 3567, hld: 432, expense: 4232 },
  { id: '96', busNo: 'DL 40 7675', ticketCost: 3567, hld: 432, expense: 4232 },
  { id: '3D', busNo: 'DL 36 4325', ticketCost: 3567, hld: 432, expense: 4232 }
]
const Income = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(5);


  const indexOfLastBus = currentPage * rowsPerPage;
  const indexOfFirstBus = indexOfLastBus - rowsPerPage;
  const currentRows = revenueData.slice(indexOfFirstBus, indexOfLastBus);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='main-revenue-container'>
      <div>
      <div className='header'>
          <div className='stats'>
            <ResourceAttendence data1={4023} data2={'Ticket Sold'} percentage = '1' />
            <ResourceAttendence data1={232} data2={'Hyper Local delivery'} percentage='2' />
          </div>
        </div>
      <div className='content'>
        <RevenueTableHeader incomeData={currentRows} />
        <TableNavigator paginate = {paginate} currentPage ={ currentPage } rowsPerPage = {rowsPerPage}  totalRows = {revenueData.length} />
        </div>
        </div>
    </div>
    
  )
}

export default Income