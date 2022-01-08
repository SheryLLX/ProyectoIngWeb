
import React, { useState , useEffect } from 'react'
import './Profile.css'

export default ({ data , token }) => {

    let [name, setName] = useState(data.name)
    let [lastname, setLastname] = useState(data.lastname)
    let [identification, setIdentification] = useState(data.identification)
    let [phone, setPhone] = useState(data.phone)
    let [adress, setAdress] = useState(data.adress)

    const changeDataHandler = () => {
        /*
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
                */
    }
    return (
        <div>
            <div>
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body" style={{ height: 413 }}>
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                    <div className="mt-3">
                                        <h4>{data.name + " " + data.lastname}</h4>
                                        <p className="text-secondary mb-1">Full Stack Developer</p>
                                        <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                                        <button className="btn btn-primary">Follow</button>
                                        <button className="btn btn-outline-primary">Message</button>
                                        <div className="row">
                                            <div className="col-sm-3">
                                                <h6 className="mb-0"></h6>
                                            </div>
                                            <div className="col-sm-9 text-secondary">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Firstname</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" value={name} onChange={ ({ target : { value }}) => {
                                            setName(value)
                                            }} />
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Lastname</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input type="text" value={lastname} onChange={({ target: { value } }) => setLastname(value)} placeholder={data.lastname} />
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Email</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        { data.email}
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Identification</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input value={ identification} onChange={({ target: { value } }) => setIdentification(value)} placeholder={data.identification} />
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Phone</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input value={ phone} onChange={({ target: { value } }) => setPhone(value)} placeholder={data.phone}/>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <h6 className="mb-0">Address</h6>
                                    </div>
                                    <div className="col-sm-9 text-secondary">
                                        <input value={ adress} onChange={({ target: { value } }) => setAdress(value)} placeholder={data.adress}/>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-12 container-button" >
                                        <a className="btn btn-info button-change" onClick={changeDataHandler} >Edit</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}