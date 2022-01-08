

import React, { useEffect, useState } from 'react'

//components
import Profile from '../../components/Profile/Profile'
import MedicalRecordItem from '../../components/MedicalRecord/component/MedicalRecordItem/MedicalRecordItem'
import Date from '../../components/Date/Date'
import Contact from '../../components/Contact/Contact'
import Surgery from '../../components/Surgery/Surgery'
import Allergy from '../../components/Allergy/Allergy'
import HereditaryDiseases from '../../components/HereditaryDiseases/HereditaryDiseases'

export default ({ userId, token , role }) => {

    const [data, setData] = useState([])
    const [contacts , setContacts ] = useState([])
    const [ surgerys , setSurgerys] = useState([])
    const [ allergies , setAllergies ] = useState([])
    const [ hereditaryDiseases , setHereditaryDiseases] = useState([])
    
    const fetchData = () => {

        fetch('http://localhost:8080/user/getUserInformation', {
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
                setContacts(resData.contacts)
                setSurgerys(resData.surgerys)
                setAllergies(resData.allergies)
                setHereditaryDiseases(resData.hereditaryDiseases)
                console.log(resData)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const addContactHandler = (contact) => {
        console.log('Hi Costumer ')
        console.log(contact)
        setContacts(prevContacts => {
            return [ contact , ...prevContacts ]
        })
    }

    const addSurgerytHandler = ( surgery) => {
        console.log('Hi Constumer from method addSurgeryHandler')
        console.log(surgery)
        setSurgerys( prevSurjerys => {
            return [ surgery , ...prevSurjerys ]
        })
    }

    const addAllergytHandler = ( allergy ) => {
        console.log('Hi Constumer from method addAllergytHandler')
        console.log(allergy)
        setAllergies( prevAllergies => {
            return [ allergy , ...prevAllergies ]
        })
    }

    const addHereditaryDiseasesHandler = ( hereditaryDiseases ) => {
        console.log('Hi Constumer from method addHereditaryDiseasesHandler')
        console.log(hereditaryDiseases)
        setHereditaryDiseases( prevHereditaryDiseases => {
            return [ hereditaryDiseases , ...prevHereditaryDiseases ]
        })
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        console.log(data.name)
    }, [data , contacts , surgerys , allergies , hereditaryDiseases ])

    return (
        <div className="container">
            <div>
                <Profile data={data} token={token} />
            </div>
            <div className="row" style={{ backgroundColor : 'white' , width : '100%' , marginBottom : 15 , marginLeft : 1 }}>
                <div className="col-3" style={{ padding : 0}} >
                    <HereditaryDiseases token={token} hereditaryDiseases={ hereditaryDiseases } addHereditaryDiseasesHandler={addHereditaryDiseasesHandler} />
                </div>
                <div className="col-3" style={{ padding : 0}}>
                    <Surgery token={token} surgerys={ surgerys } addSurgerytHandler={addSurgerytHandler} />
                </div>
                <div className="col-3" style={{ padding : 0}}>
                    < Allergy token={token} allergies={ allergies } addAllergytHandler={addAllergytHandler} />
                </div>
                <div className="col-3" style={{ padding : 0}}>
                    <Contact token={token} contacts={ contacts } addContactHandler={addContactHandler} />
                </div>
            </div>
            <div>
                <MedicalRecordItem token={token} />
            </div>
            <div>
                < Date token={token} role={role} />
            </div>
        </div>
    )
}