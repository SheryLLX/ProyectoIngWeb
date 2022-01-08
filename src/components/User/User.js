
import React from 'react'

import UserList from './component/UserList/UserList'

export default ({ users }) => {
  return (
    <div className="container">
      <div>
       <h2>Users</h2> 
      </div>
      < UserList users={users} />
    </div>
  )
}