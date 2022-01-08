
import React, { useEffect, useState } from 'react'

//components
import DatePersonalizadaList from './Components/DatePersonalizadaList'
let bandera = true

export default ({ token, role, data2 }) => {

    const [data, setData] = useState([])
    const [prueba, setPrueba] = useState(data2)
    console.log(data2)

    const fetchData = () => {
        let http = 'http://localhost:8080/date/getAllDatesAdmin';
        console.log('role : ' + role)
        if (role == 3) {
            http = 'http://localhost:8080/date/getAllDates'
        }

        fetch(http, {
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
                const result= Object.values(resData).filter(date => { return date.doctor === data2.name})
                console.log(result)
                console.log(resData)
                setData(result)
            })
            .catch((err) => {
                console.log(err)
            });
    }
    useEffect(() => {
        fetchData();
        console.log("esta es una prueba 222")
        console.log(prueba)
    }, [data2])

    console.log(data2)

    if(data2 !== "[]" && bandera == true) {
        fetchData();
        console.log(data2)
        bandera=false
    }

    return (
        <div>
            <div style={{ marginTop: 15 }} >
                < DatePersonalizadaList token={token} dates={data} />
            </div>
        </div>
    )
}