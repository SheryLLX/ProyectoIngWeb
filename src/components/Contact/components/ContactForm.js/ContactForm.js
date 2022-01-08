
import React, { useEffect, useState } from 'react'

import './ContactForm.css'

export default ({ token , addContact }) => {

    const [status, setStatus] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [relationship, setRelationship] = useState('')

    const handleClick = () => {
        setStatus(!status)
    }

    const fetchMedicalRecord = (event) => {
        event.preventDefault();

        if (status) {

            let newContact = {
                _id : Math.random().toString(),
                name,
                phone,
                relationship
            }

            fetch('http://localhost:8080/user/createContact', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    name,
                    phone,
                    relationship
                })
            })
                .then(res => {
                    console.log(res.status)
                    addContact(newContact)
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
            setPhone('')
            setRelationship('')
        }
    }

    return (
        <div>
            <div className="container-principal-form" style={{marginTop : 3 }}>

                <div className={!status ? 'form-status active' : 'form-status'}>
                    <button onClick={handleClick} className={"btn btn-primary"}>+</button>
                </div>

                <div className={status ? 'form-status active' : 'form-status'} >
                    <form onSubmit={fetchMedicalRecord}>
                        <div>
                            <h4>New Contact</h4>
                        </div>

                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Name</label>
                            <input type="text" className="form-control" value={name} onChange={({ target: { value } }) => setName(value)} />
                        </div>

                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Phone</label>
                            <input type="text" className="form-control" value={phone} onChange={({ target: { value } }) => setPhone(value)} />
                        </div>

                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Relationship</label>
                            <input type="text" className="form-control" value={relationship} onChange={({ target: { value } }) => setRelationship(value)} />
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