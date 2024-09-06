import React , { useState }from 'react'

import ResourceAttendence from '../Components/ResourceAttendence';

import { FaSearchLocation } from 'react-icons/fa';

import './DashBoard.css';
import DataTable from '../Components/DataTable';
import TableNavigator from '../Components/TableNavigator';

const busdata = [
    { id: '13A', busNo: 'DL 99 1234', start: 'Loha Mandi', destination: 'Payal Cinema', recentStop: 'Chanakyapuri', deliveryStatus: 'Active' },
   { id: '12B', busNo: 'DL 99 1234', start: 'Naraina', destination: 'Maya puri', recentStop: 'Kiribati', deliveryStatus: 'Active' },
   { id: '3C', busNo: 'DL 99 1234', start: 'Zink Market', destination: 'Inder puri', recentStop: 'National Stadium', deliveryStatus: 'Active' },
   { id: '5D', busNo: 'DL 99 1234', start: 'AIR station', destination: 'C.G. Hospittal', recentStop: 'Moti Bagh', deliveryStatus: 'Active' },
   { id: '13B', busNo: 'DL 99 1234', start: 'JJ colony', destination: 'Laiwanti', recentStop: 'Mohamad Pur', deliveryStatus: 'Active' },
   { id: '15A', busNo: 'DL 99 1234', start: 'Barar Square', destination: 'C.G.Hospital', recentStop: 'Palam Colony', deliveryStatus: 'Active' },
   { id: '2A', busNo: 'DL 99 1234', start: 'Gurudwara', destination: 'Sagapur', recentStop: 'Raj Nagar', deliveryStatus: 'Active' },
   { id:'32D', busNo: 'DI 99 1234', start: 'Chanakyapuri', destination: 'Janakpuri', recentStop: 'Rail Museum', deliveryStatus: 'Active' },
    { id: '13A', busNo: 'DL 99 1234', start: 'Loha Mandi', destination: 'Payal Cinema', recentStop: 'Chanakyapuri', deliveryStatus: 'Active' },
   { id: '12B', busNo: 'DL 99 1234', start: 'Naraina', destination: 'Maya puri', recentStop: 'Kiribati', deliveryStatus: 'Active' },
   { id: '3C', busNo: 'DL 99 1234', start: 'Zink Market', destination: 'Inder puri', recentStop: 'National Stadium', deliveryStatus: 'Active' },
   { id: '5D', busNo: 'DL 99 1234', start: 'AIR station', destination: 'C.G. Hospittal', recentStop: 'Moti Bagh', deliveryStatus: 'Active' },
   { id: '13B', busNo: 'DL 99 1234', start: 'JJ colony', destination: 'Laiwanti', recentStop: 'Mohamad Pur', deliveryStatus: 'Active' },
   { id: '15A', busNo: 'DL 99 1234', start: 'Barar Square', destination: 'C.G.Hospital', recentStop: 'Palam Colony', deliveryStatus: 'Active' },
   { id: '2A', busNo: 'DL 99 1234', start: 'Gurudwara', destination: 'Sagapur', recentStop: 'Raj Nagar', deliveryStatus: 'Active' },
   { id:'32D', busNo: 'DI 99 1234', start: 'Chanakyapuri', destination: 'Janakpuri', recentStop: 'Rail Museum', deliveryStatus: 'Active' },
    { id: '13A', busNo: 'DL 99 1234', start: 'Loha Mandi', destination: 'Payal Cinema', recentStop: 'Chanakyapuri', deliveryStatus: 'Active' },
   { id: '12B', busNo: 'DL 99 1234', start: 'Naraina', destination: 'Maya puri', recentStop: 'Kiribati', deliveryStatus: 'Active' },
   { id: '3C', busNo: 'DL 99 1234', start: 'Zink Market', destination: 'Inder puri', recentStop: 'National Stadium', deliveryStatus: 'Active' },
   { id: '5D', busNo: 'DL 99 1234', start: 'AIR station', destination: 'C.G. Hospittal', recentStop: 'Moti Bagh', deliveryStatus: 'Active' },
   { id: '13B', busNo: 'DL 99 1234', start: 'JJ colony', destination: 'Laiwanti', recentStop: 'Mohamad Pur', deliveryStatus: 'Active' },
   { id: '15A', busNo: 'DL 99 1234', start: 'Barar Square', destination: 'C.G.Hospital', recentStop: 'Palam Colony', deliveryStatus: 'Active' },
   { id: '2A', busNo: 'DL 99 1234', start: 'Gurudwara', destination: 'Sagapur', recentStop: 'Raj Nagar', deliveryStatus: 'Active' },
   { id:'32D', busNo: 'DI 99 1234', start: 'Chanakyapuri', destination: 'Janakpuri', recentStop: 'Rail Museum', deliveryStatus: 'Active' },
 ]
const DashBoard = () => {
    const [buses, setBuses] = useState(busdata);

    const [currentPage, setCurrentPage] = useState(1);
    // const [rowsPerPage, setrowsPerPage] = useState(10);
    const rowsPerPage = 10;
  
    const indexOfLastBus = currentPage * rowsPerPage;
    const indexOfFirstBus = indexOfLastBus - rowsPerPage;
    const currentBuses = buses.slice(indexOfFirstBus, indexOfLastBus);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    return (
      <div className="container">
        
            <div className="main">
            <div className="header">
                <div className="stats">
                        <ResourceAttendence data1={busdata.length} data2={'Total Bus Running'} percentage='16' arrow={ '↑' } />
                        <ResourceAttendence data1={busdata.length * 2} data2={'Total Staffs Working'} percentage='16' arrow={ '↑' } />
                        <ResourceAttendence data1= {5} data2={'Backup Staffs'} percentage = '2' arrow={ '↓' }/>
                </div>
            </div> 
          <div className="content">
            <h2>Real Time Data</h2>
            <div className="search-bar">
              <input type="text" placeholder="Search" />
              <FaSearchLocation />
            </div>
                    <DataTable currentBuses={currentBuses} />

                    <TableNavigator paginate = {paginate} currentPage ={ currentPage } rowsPerPage = {rowsPerPage}  totalRows={buses.length} />
            <p>Showing data 1 to 8 of 50 entries</p>
          </div>
        </div>
      </div>
    );
}

export default DashBoard