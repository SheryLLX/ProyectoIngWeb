import React from 'react'

import MedicalRecordList from './component/MedicalRecordList/MedicalRecordList'
import MedicalRecordForm from './component/MedicalRecordForm/MedicalRecordForm'

export default ({ users, token }) => {

    return (
        <div className='card text-center' style={{ margin : 0 }}>
            < MedicalRecordList token={token} />
            <div>
                < MedicalRecordForm users={users} token={token}  />
            </div>
        </div>
    )
}