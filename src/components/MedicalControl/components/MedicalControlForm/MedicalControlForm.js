
import React, { useEffect, useState } from 'react'

import './MedicalControlForm.css'

export default ({ id , token , userId , addMDs }) => {

    const [idMedicalRecord , setIdMedicalRecord] = useState('')
    const [status, setStatus] = useState(false)
    const [reason, setReason] = useState('')
    const [diagnosis, setDiagnosis] = useState('')
    const [result, setResult] = useState('')

    const handleClick = () => {
        setStatus(!status)
    }

    useEffect(() => {
        console.log(id , token )
        console.log('heeeee')
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var anuncioParam = urlParams.get('id');
        console.log(anuncioParam)
        setIdMedicalRecord(anuncioParam);
    },[])

    const fetchMedicalRecord = (event) => {
        event.preventDefault();

        if(status){

            fetch('http://localhost:8080/medicalRecord/createMedicalControl', {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    id : idMedicalRecord,
                    reason,
                    diagnosis,
                    result
                })
            })
                .then(res => {
                    console.log(res.status)
                    if (res.status !== 200) {
                        throw new Error('Failed to fetch user status.');
                    }
                    return res.json();
                })
                .then(resData => {
                    console.log(resData)

                    addMDs(resData.md)
                })
                .catch((err) => {
                    console.log(err)
                });

            setDiagnosis('')
            setReason('')
            setResult('')
        }
    }

    return (
        <div>
            <div className="container-principal-form">

                <div className={!status ? 'form-status active' : 'form-status'}>
                    <button onClick={handleClick} className={"btn btn-primary"}>+</button>
                </div>

                <div className={status ? 'form-status active' : 'form-status'} >
                    <form onSubmit={fetchMedicalRecord}>
                        <div>
                            <h2>Medical Control</h2>
                        </div>

                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Reason</label>
                            <input type="text" className="form-control" value={reason} onChange={({ target: { value } }) => setReason(value)} />
                        </div>

                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Diagnosis</label>
                            <input type="text" className="form-control" value={diagnosis} onChange={({ target: { value } }) => setDiagnosis(value)} />
                        </div>

                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Result</label>
                            <input type="text" className="form-control" value={result} onChange={({ target: { value } }) => setResult(value)} />
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