
import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default ({ allergies }) => {

    console.log(allergies)

    const rederedAllergies = Object.values(allergies).map(item => {
        return (

            <div className="card col-12" key={item._id} style={{ position: 'static' }}>
                <div className="card-body">
                    <ul style={{ margin: 0, padding: 0, marginTop: 12, marginLeft: 0, paddingBottom: 30 }}>
                        <li className="list-group-item"  style={{paddingTop : 50 , paddingBottom : 45 }}> <b> Name : </b>{item.name}</li>
                    </ul>
                </div>
            </div>
        )
    })

    return (
        <div className="" >
            <div className="row" style={{ maxHeight: 180, minHeight: 180 }}>
                {allergies.length > 0 ?
                    (< Carousel style={{ height: 178 }} showStatus={false}>
                        {rederedAllergies}
                    </Carousel>) :
                    (<h5>Not allergies</h5>)}
            </div>
        </div>
    )
}
