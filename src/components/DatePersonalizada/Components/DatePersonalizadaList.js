import React, { useEffect, useState, Fragment } from 'react'
import FullCalendar, { EventClickArg } from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!


export default ({ dates }) => {

    const [search, setSearch] = useState('')
    const [search2, setSearch2] = useState('')
    const [status, setStatus] = useState(false)

    const [info, setInfo] = useState({
        _id: '',
        createdAt: '',
        reason: '',
        updatedAt: '',
        doctor: '',
        creator: {}
    })

    const handleClick = () => {
        setStatus(!status)
    }

    const filterData = () => {
        if (search.trim().length == 0 || search == '') {
            return dates
        } else {
            const newFilter = Object.values(dates).filter(date => {
                if (search2.trim().length > 0 || search2 != '') {
                    return date.date >= search && date.date <= search2
                }
                return date.date.includes(search)
            })
            return newFilter;
        }
    }

    const renderedDates = Object.values(filterData()).map((item, index) => {
        return (
            <div class="col-sm-4" key={index} style={{ position: 'static', paddingBottom: 24 }} >
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{item._id}</h5>
                        <ul style={{ margin: 0, padding: 0 }}>
                            <li className="list-group-item"> <b> Reazon : </b>{item.reason}</li>
                            <li className="list-group-item"> <b> Date : </b>{item.date}</li>
                            {item.doctor && (
                                <li className="list-group-item" > <b> Doctor : </b> {item.doctor} </li>
                            )}
                            <li className="list-group-item" > <b> createdAt : </b> {item.createdAt} </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    })

    const handleEventClick = (clickInfo) => {
        console.log(clickInfo.event._def.extendedProps)
        const { _id, createdAt, reason, updatedAt, creator, doctor } = clickInfo.event._def.extendedProps
        setInfo({
            _id, createdAt, reason, updatedAt, creator, doctor
        })
        handleClick();
    }

    const buttonSearch = (
        <div style={{ marginBottom: 12 }} className="row">
            <div className="col-6">
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
            <div className="col-6">
                <input
                    type="text"
                    id="inputPassword5"
                    class="form-control"
                    aria-describedby="passwordHelpBlock"
                    placeholder="Search"
                    value={search2}
                    onChange={({ target: { value } }) => setSearch2(value)}
                />
            </div>
        </div>
    )

    let modalDate = ''

    if (status) {
        modalDate = (
            <div> hola mundo </div>
        )
    }

    return (
        <div>
            <div class="card text-center">
                <div class="card-header">
                    <h2>Dates</h2>
                    {modalDate}

                    <div style={{ marginBottom: 15 }}>
                        <FullCalendar
                            plugins={[dayGridPlugin]}
                            initialView="dayGridMonth"
                            weekends={false}
                            /*events={[
                                { title: 'event 1', date: '2021-06-03' },
                                { title: 'event 2', date: '2021-06-11' }
                            ]}
                            */
                            eventClick={handleEventClick}
                            events={filterData()}
                        />
                    </div>
                    {buttonSearch}
                </div>
                <div class="card-body">
                    <div class="row">
                        {renderedDates}
                    </div>
                </div>
            </div>
        </div>
    )
}