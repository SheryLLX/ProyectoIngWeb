
import React, { useEffect, useState } from 'react'
import jsPDF from 'jspdf'

export default ({ token, id, mds }) => {

    const [ search , setSearch ] = useState('')

    const generatePDF = (data) => {
        console.log(data)
    }

    const filterData= () =>{
        if( search.trim().length == 0 || search == '' ) {
            return mds
        }else{
            const newFilter = Object.values(mds).filter( md => {
                return md.reason.includes(search)
            })
            return newFilter ;
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
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <button class="btn btn-primary" onClick={() => generatePDF(item._id)} style={{ marginTop: 10 }}>Download</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="card-body" >
            <div style={{ marginBottom : 12 }}>
                <input 
                    type="text" 
                    id="inputPassword5" 
                    class="form-control" 
                    aria-describedby="passwordHelpBlock" 
                    placeholder="Search"
                    value={search} 
                    onChange={ ({ target : { value }}) => setSearch(value)}    
                />
            </div>
            <div className="row">
                {renderedMedicalControls}
            </div>
        </div>
    )
}