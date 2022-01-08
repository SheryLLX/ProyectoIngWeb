
import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'

export default ({ token }) => {

    const [md, setMD] = useState([])
    const [data, setData] = useState([])

    const [search, setSearch] = useState('')

    const fetchMD = () => {
        fetch('http://localhost:8080/medicalRecord/medicalRecordUserById', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
            },
        })
            .then(res => {
                if (res.status === 422) {
                    throw new Error(
                        "Validation failed. Make sure the email address isn't used yet!"
                    );
                }
                if (res.status !== 200 && res.status !== 201) {
                    console.log('Error!');
                    throw new Error('Creating a user failed!');
                }
                return res.json();
            })
            .then(resData => {
                setMD(resData)
                console.log(resData);
                console.log("new")
                setData(resData)
                setMD(resData.MedicalControls)
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchMD();
    }, [])

    useEffect(() => {
        console.log(md)
    }, [md])

    useEffect(() => {
        console.log(data._id)
    }, [data])

    const generatePDF = (id) => {

        var doc = new jsPDF('p', 'pt');
        var today = new Date();

        var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
        var time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

        doc.text(20, 20,
            '\n\n\n' +
            'Medical Certificate \n\n' +
            'Date : ' + date + ' \n' +
            'San Jose clinic \n\n\n\n' +
            'This document verifies that the patient with registration number \n' + data._id +
            ' was present on the date of issue, the control \n number is ' + id + '' +
            'n case of verifying the document please \n contact the administrative ' + 'offices of the clinic.' +
            ' \n\n\n ' +
            'Application date : ' + date + ' ' + time
        );
        doc.setFont('courier')
        doc.save('generated.pdf')
    }

    const filterData = () => {
        if (search.trim().length == 0 || search == '') {
            return md
        } else {
            const newFilter = Object.values(md).filter(item => {
                return item.reason.includes(search)
            })
            return newFilter;
        }
    }

    const renderedMedicalControls = Object.values(filterData()).map((item, index) => {
        return (
            <div class="col-sm-4" key={index} style={{ position: 'static', marginBottom: 12 }} >
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{item._id}</h5>
                        <ul style={{ margin: 0, padding: 0 }}>
                            <li className="list-group-item"> <b> Razon : </b>{item.reason}</li>
                            <li className="list-group-item" > <b> Diagnosrico : </b> {item.diagnosis} </li>
                            <li className="list-group-item"> <b> Resultados : </b>{item.result}</li>
                        </ul>
                        <button class="btn btn-primary" style={{ marginTop: 10 }} onClick={() => generatePDF(item._id)}>Download</button>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div class="card text-center">
                <div class="card-header">
                    <div>
                        <h2>Medico Historial</h2>
                        <div>
                            <div>
                                N° {data._id}
                            </div>
                            <div>
                                Tipo de Sangre :  {data.bloodType}
                            </div>
                            <div>
                                Origen Etnico {data.ethnicOrigin}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div style={{ marginBottom: 12 }}>
                        <input
                            type="text"
                            id="inputPassword5"
                            class="form-control"
                            aria-describedby="passwordHelpBlock"
                            placeholder="Search"
                            value={search}
                            onChange={({ target: { value } }) => setSearch(value)}
                        />
                    </div>
                    <div class="row">
                        {renderedMedicalControls}
                    </div>
                </div>
                <div class="card-footer text-muted">
                    <div>
                        createdAt: {data.createdAt}
                    </div>
                    <div>
                        updatedAt: {data.updatedAt}
                    </div>
                </div>
            </div>
        </div>
    )
}