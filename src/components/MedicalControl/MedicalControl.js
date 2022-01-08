import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

//components
import MedicalControlList from './components/MedicalControlList/MedicalControlList'
import MedicalControlForm from './components/MedicalControlForm/MedicalControlForm'

export default ({ token, userId }) => {

    const [id, setId] = useState('')

    const [mds, setMD] = useState([])
    const [data, setData] = useState([])

    const fetchMD = () => {

        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var anuncioParam = urlParams.get('id');

        fetch('http://localhost:8080/medicalRecord/medicalRecordUserById?id=' + anuncioParam, {
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

    const addMDs = (md) => {
        const tam = md.length
        setMD(prevMDs => {
            return [md[tam - 1], ...prevMDs]
        })
    }

    return (
        <div className="container" style={{ marginTop: 20 }}>
            <div>
                <h3>Controles Medicos</h3>
                    <MedicalControlList token={token} userId={userId} id={id} mds={mds} />

                    < MedicalControlForm token={token} userId={userId} id={id} addMDs={addMDs} />
                </div>
            </div>
    )
}
