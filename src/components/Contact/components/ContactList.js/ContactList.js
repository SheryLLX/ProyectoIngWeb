
import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default ({ contacts }) => {

    console.log(contacts)

    const rederedContacts = Object.values(contacts).map(item => {
        return (

            <div className="card col-12" key={item._id} style={{ position: 'static' }}>
                <div className="card-body">
                    <ul style={{ margin: 0, padding: 0, marginTop : 12 , marginLeft : 0 , paddingBottom : 30  }}>
                        <li className="list-group-item"> <b> Name : </b>{item.name}</li>
                        <li className="list-group-item"> <b> Phone : </b>{item.phone}</li>
                        <li className="list-group-item" > <b> Relationship : </b> {item.relationship} </li>
                    </ul>
                </div>
            </div>
        )
    })

    return (
        <div className="" >
            <div className="row" style={{ maxHeight: 180 , minHeight : 180 }}>
                < Carousel style={{height: 178 }} showStatus={false}>
                    {rederedContacts}
                </Carousel>
            </div>
        </div>
    )
}
/*
<ul  >
                    <li className="list-group-item" > <b> Direccion : </b>  </li>
                    <li className="list-group-item"> <b> Email : </b> {item.user.email}</li>
                    <li className="list-group-item"> <b> Tipo de sangre : </b>{item.bloodType}</li>
                    <li className="list-group-item"> <b> Origen etnico : </b>{item.ethnicOrigin}</li>
                    <li className="list-group-item"> <Link className="btn btn-primary" to={"/medicalControl?id="+item._id} >Más informacion</Link> </li>
                </ul>*/