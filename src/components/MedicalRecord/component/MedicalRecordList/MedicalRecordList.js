
import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'

export default ({ token }) => {

    const [data, setData] = useState({})
    const [search, setSearch] = useState('')

    const fetchData = () => {

        fetch('http://localhost:8080/medicalRecord/getAllMedicalRecord', {
            headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed to fetch user status.');
                }
                return res.json();
            })
            .then(resData => {
                setData(resData)
                console.log(resData)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    useEffect(() => {
        fetchData();
    }, [])

    /*
    const [medicalsRecords, setMedicalsRecords] = useState({});

    const fetchMedicalsRecords = async () => {
        const res = await axios.get('http://localhost:3001/medicalRecord/viewGetAllMedicalReport')
        setMedicalsRecords(res.data)
    }

    useEffect(() => {
        fetchMedicalsRecords();
    }, [])

    */

    const filterData = () => {
        if (search.trim().length == 0 || search == '') {
            return data
        } else {
            const newFilter = Object.values(data).filter(item => {
                return item.user.name.includes(search)
            })
            return newFilter;
        }
    }

    const rederedMedicalRecords = Object.values(filterData()).map((item => {
        return (
            <div className="col-sm-4" key={item.user._id} style={{ position: 'static', marginBottom: 12 }}>
                <div class="card" >
                    <div className="card-body">
                        <h5 className="card-title">{item.user.name}</h5>
                        <ul style={{ margin: 0, padding: 0 }}>
                            <li className="list-group-item" > <b> Direccion : </b>  </li>
                            <li className="list-group-item"> <b> Email : </b> {item.user.email}</li>
                            <li className="list-group-item"> <b> Tipo de sangre : </b>{item.bloodType}</li>
                            <li className="list-group-item"> <b> Origen etnico : </b>{item.ethnicOrigin}</li>
                            <li className="list-group-item" style={{ display: 'flex', justifyContent: 'center ' }}> <Link className="btn btn-primary" to={"/medicalControl?id=" + item._id} >Más informacion</Link> </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }))


    //<li className="list-group-item"> <Link className="btn btn-primary" to={"/historialRecordItem/"+ item.id_user +"/"+item.id_medicalRecord}>Más informacion</Link> </li>

    return (
        <div className="card-body" style={{ marginTop: 40 }}>
            <div>
                <h3>Users</h3>
            </div>
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

            <div className="row">
                {rederedMedicalRecords}
            </div>
        </div>
    )
}