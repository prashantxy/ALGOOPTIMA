import React from 'react'

const ResourceAttendence = ({data1,data2,percentage,arrow}) => {
  return (
            <div className="stat">
              <p>{ data2 }</p>
              <h3>{ data1 }</h3>
          <span>{ arrow } { percentage }%</span>
            </div>
       
  )
}

export default ResourceAttendence