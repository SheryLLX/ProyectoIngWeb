
import React, { useEffect, useState } from 'react'

import './MedicalRecordForm.css'

export default ({ users, token }) => {

    const [status, setStatus] = useState(false)
    const [bloodType, setBloodType] = useState('')
    const [ethnicOrigin, setEthnicOrigin] = useState('')
    const [name, setName] = useState('')

    const handleClick = () => {
        setStatus(!status)
    }

    const fetchMedicalRecord = (event) => {
        event.preventDefault();

        if(status){

            fetch('http://localhost:8080/medicalRecord/createMedicalReport', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    bloodType,
                    ethnicOrigin,
                    user: name
                })
            })
                .then(res => {
                    if (res.status !== 201) {
                        throw new Error('Failed to fetch user status.');
                    }
                    return res.json();
                })
                .then(resData => {
                    console.log(resData)
                })
                .catch((err) => {
                    console.log(err)
                });

            setBloodType('')
            setEthnicOrigin('')
        }
    }

    const optionsUsers = Object.values(users).map((user) => {
        return (
            <option key={user._id} value={user._id}>{user.name}</option>
        )
    })

    return (
        <div>
            <div className="container-principal-form">

                <div className={!status ? 'form-status active' : 'form-status'}>
                    <button onClick={handleClick} className={"btn btn-primary"}>+</button>
                </div>

                <div className={status ? 'form-status active' : 'form-status'} >
                    <form onSubmit={fetchMedicalRecord}>
                        <div>
                            <h2>Medical Record</h2>
                        </div>

                        <select class="form-select" aria-label="Default select example" value={name} onChange={({ target: { value } }) => setName(value)} >
                            {optionsUsers}
                        </select>

                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Tipo de Sangre</label>
                            <input type="text" className="form-control" value={bloodType} onChange={({ target: { value } }) => setBloodType(value)} />
                        </div>

                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Origen Etnico</label>
                            <input type="text" className="form-control" value={ethnicOrigin} onChange={({ target: { value } }) => setEthnicOrigin(value)} />
                        </div>

                        <div className="container-btn">
                            <button className="btn btn-secondary" onClick={handleClick} >Close</button>
                            <button type="submit" className="btn btn-primary">Send</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}