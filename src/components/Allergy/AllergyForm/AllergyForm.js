
import React, { useEffect, useState } from 'react'

import './AllergyForm.css'
import ModalForm from '../../ModalForm/ModalForm'

export default ({ token, addAllergy }) => {

    const [status, setStatus] = useState(false)
    const [name, setName] = useState('')

    const handleClick = () => {
        setStatus(!status)
    }

    const fetchSurgery = (event) => {
        event.preventDefault();

        if (status) {

            let newAllergy = {
                _id: Math.random().toString(),
                name
            }

            fetch('http://localhost:8080/user/createAllergy', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    name                })
            })
                .then(res => {
                    console.log(res.status)
                    addAllergy(newAllergy)
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
            setName('')
        }
    }

    return (
        <div>
            <div className="container-principal-form" style={{marginTop : 3 }}>

                <div className={!status ? 'form-status active' : 'form-status'}>
                    <button onClick={handleClick} className={"btn btn-primary"}>+</button>
                </div>
                 { status && <ModalForm title="New Surgery" onClose={handleClick} >
                    <div className={status ? 'form-status active' : 'form-status'} >
                        <form onSubmit={fetchSurgery}>

                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label">Name</label>
                                <input type="text" className="form-control" value={name} onChange={({ target: { value } }) => setName(value)} />
                            </div>

                            <div className="container-btn">
                                <button className="btn btn-secondary" onClick={handleClick} >Close</button>
                                <button type="submit" className="btn btn-primary">Send</button>
                            </div>
                        </form>
                    </div>
                </ModalForm>}
            </div>
        </div>
    )
}