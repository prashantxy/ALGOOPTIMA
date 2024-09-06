import React, { useState } from 'react'
import SearchBar from '../../Components/SearchBar/SearchBar';

const locationData = [
    { id:"ukd", name: 'ukkadam', latitude: 10.985936, longitude: 76.965408 },
    { id :"kun",name: 'kuniyamuthur', latitude: 10.96324600, longitude: 76.94702200 },
    { id:"kvp",name: 'kovaipudur perivu', latitude: 10.93676, longitude: 76.951173 }
  ];
  
  const busdata = [
    { id: '13A', busNo: 'DL 99 1234', start: 'Loha Mandi', destination: 'Payal Cinema', recentStop: 'Chanakyapuri', deliveryStatus: 'Active' },
    { id: '12B', busNo: 'DL 99 1234', start: 'Naraina', destination: 'Maya puri', recentStop: 'Kiribati', deliveryStatus: 'Active' },
    { id: '3C', busNo: 'DL 99 1234', start: 'Zink Market', destination: 'Inder puri', recentStop: 'National Stadium', deliveryStatus: 'Active' },
    { id: '5D', busNo: 'DL 99 1234', start: 'AIR station', destination: 'C.G. Hospittal', recentStop: 'Moti Bagh', deliveryStatus: 'Active' },
    { id: '13B', busNo: 'DL 99 1234', start: 'JJ colony', destination: 'Laiwanti', recentStop: 'Mohamad Pur', deliveryStatus: 'Active' },
    { id: '15A', busNo: 'DL 99 1234', start: 'Barar Square', destination: 'C.G.Hospital', recentStop: 'Palam Colony', deliveryStatus: 'Active' },
    { id: '2A', busNo: 'DL 99 1234', start: 'Gurudwara', destination: 'Sagapur', recentStop: 'Raj Nagar', deliveryStatus: 'Active' },
    { id:'32D', busNo: 'DI 99 1234', start: 'Chanakyapuri', destination: 'Janakpuri', recentStop: 'Rail Museum', deliveryStatus: 'Active' }
  ];
  const driverData = [
    { id:'1A', name: "ragu" },
    { id:'2A', name: "balu" },
    { id:'3A', name: "guna" },
    { id:'1B', name: "Raguvaran" },
    { id:'5A', name: "PonnuSamy" },
    { id:'2C', name: "ragu" },
  ]
  const conductorData = [
    { id:'1A', name: "ragu" },
    { id:'2A', name: "balu" },
    { id:'3A', name: "guna" },
    { id:'1B', name: "Raguvaran" },
    { id:'5A', name: "PonnuSamy" },
    { id:'2C', name: "ragu" },
  ]

const AddBus = () => {
    const [startValue, setStartValue] = useState('');
  const [destValue, setDestValue] = useState('');
  const [bus, setBus] = useState('');
  const [driver, setDriverValue] = useState('');
  const [conductor, setConductorValue] = useState('');

  const handleSubmit = () => {
    console.log('response Submited');
  }
  return (
      <div className='er-container'>
          <h1>Add Bus</h1>
      <form className='emergencyrouting-form' onSubmit={handleSubmit}>
        <div className="search-bar-container">
          <SearchBar
            inputValue={bus}
            setInputValue={setBus}
            allSuggestions={busdata}
            attribute='id'
            label='Bus'
          />
        </div>
        <div className="search-bar-container">
          <SearchBar
            inputValue={startValue}
            setInputValue={setStartValue}
            allSuggestions={locationData}
            attribute='name'
            label='Start Location'
          />
        </div>
        <div className="search-bar-container">
          <SearchBar
            inputValue={destValue}
            setInputValue={setDestValue}
            allSuggestions={locationData}
            attribute='name'
            label='Destination Location'
          />
        </div>
        <div className="search-bar-container">
          <SearchBar
            inputValue={driver}
            setInputValue={setDriverValue}
            allSuggestions={driverData}
            attribute='name'
            label='Driver'
          />
        </div>
        <div className="search-bar-container">
          <SearchBar
            inputValue={conductor}
            setInputValue={setConductorValue}
            allSuggestions={conductorData}
            attribute='name'
            label='Conductor'
          />
        </div>
        <button className='emergencyrouting-form-btn'>Submit</button>
      </form>
    </div>
  )
}

export default AddBus