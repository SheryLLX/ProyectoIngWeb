import React, { useEffect, useState } from 'react'

import './DateForm.css'

export default ({ token, addDateHandler, doctors, dates }) => {

    const [reason, setReason] = useState('')
    const [date, setDate] = useState('')
    const [doctor, setDoctor] = useState('')
    const [status, setStatus] = useState(false)

    const handleClick = () => {
        setStatus(!status)
    }

    const validDate = (date) => {
        const valid = Object.values(dates).every((item) => {
            console.log(item.date)
            let tem = new Date(item.date)
            let com = new Date(date)

            if (tem.getDay() == com.getDay() &&
                tem.getMonth() == com.getMonth()) {

                /*
                console.log(tem.getHours())
                tem.setHours( tem.getHours() + 1 )
                console.log(tem.getHours())
                console.log('Mismo dia')
                */

                if (tem.getHours() == com.getHours()) {

                    console.log('No puede agendar')
                    return false
                } else {
                    console.log('si puede agendar')
                }
            }

            return item.date != date
        })
        return valid;
    }

    const fetchMedicalRecord = (event) => {
        event.preventDefault();
        if (status) {

            /*
            const n = new Date('2021-06-19T17:51')
            const com = new Date('2021-06-19T17:50')
            if( n.getTime() >= com.getTime() ){
                console.log('Si compara fecha')
            }else{
                console.log('no compara fechas')
            }
            console.log(date)
            

            
            const nn = new Date('2021-06-19T17:51');
            console.log(nn.getHours())
            nn.setHours(nn.getHours() + 1)
            console.log(nn.getHours())
            */

            const result = validDate(date)
            console.log(result)

            if (!result) {
                alert('No se puede agendar cita')
            } else {

                fetch('http://localhost:8080/date/createDate', {
                    headers: {
                        Authorization: 'Bearer ' + token,
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        reason,
                        date,
                        doctor
                    })
                })
                    .then(res => {
                        console.log(res.status)
                        if (res.status !== 201) {
                            throw new Error('Failed to fetch user status.');
                        }
                        return res.json();
                    })
                    .then(resData => {
                        console.log(resData.date)
                        addDateHandler(resData.date);
                    })
                    .catch((err) => {
                        console.log(err)
                    });
            }
        }
        setReason('');
        setDate('');
    }

    const handleChangeSelect = (name) => {
        console.log(name.target.value)
        setDoctor(name.target.value)
    }

    const optionDoctor = Object.values(doctors).map((doctor, index) => {
        return (
            <>
                {reason === doctor.especialidad ?
                    (<option value={doctor.name} key={index}>{doctor.name}</option>) : ''}
            </>
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
                            <h2>Date2</h2>
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Reason</label>
                            <select className="form-select" value={reason} onChange={({ target: { value } }) => setReason(value)} >
                                <option value="Consulta Mensual">Consulta Mensual</option>
                                <option value="Emergencia">Emergencia</option>
                                <option value="Covid">Covid</option>
                                <option value="Examenes">Examenes</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Doctor</label>
                            <select class="form-select" aria-label="Default select example"
                                onChange={handleChangeSelect}
                                value={doctor} >
                                {optionDoctor}
                            </select>
                        </div>

                        <div className="new-expense__control">
                            <label>Date</label>
                            <input type="datetime-local" min="2019-01-01" max="2022-13-31" value={date} onChange={({ target: { value } }) => setDate(value)} />
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