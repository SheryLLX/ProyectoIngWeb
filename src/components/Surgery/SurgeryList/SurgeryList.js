
import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default ({ surgerys }) => {

    console.log(surgerys)

    const rederedSurgerys = Object.values(surgerys).map(item => {
        return (

            <div className="card col-12" key={item._id} style={{ position: 'static' }}>
                <div className="card-body">
                    <ul style={{ margin: 0, padding: 0, marginTop: 12, marginLeft: 0, paddingBottom: 30 }}>
                        <li className="list-group-item" style={{ paddingTop: 17, paddingBottom: 17 }}> <b> Name : </b>{item.name}</li>
                        <li className="list-group-item" style={{ paddingTop: 17, paddingBottom: 17 }}> <b> Reason : </b>{item.reason}</li>
                    </ul>
                </div>
            </div>
        )
    })

    return (
        <div className="" >
            <div className="row" style={{ maxHeight: 180, minHeight: 180 }}>
                {surgerys.length > 0 ?
                    (< Carousel style={{ height: 178 }} showStatus={false}>
                        {rederedSurgerys}
                    </Carousel>) :

                    (<h5>Not surgerys</h5>)}

            </div>
        </div>
    )
}
