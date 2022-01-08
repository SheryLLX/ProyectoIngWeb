
import React, { useEffect, useState } from 'react'

//Components
import User from '../../components/User/User'
import MedicalRecord from '../../components/MedicalRecord/MedicalRecord'
import Date from '../../components/Date/Date'

export default ({ userId, token }) => {

    const [data, setData] = useState({})

    const fetchInfo = () => {
        fetch('http://localhost:8080/user/getAllUsers', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
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
                console.log(res)
                return res.json();
            })
            .then(resData => {
                console.log(resData);
                setData(resData)
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    return (
        <div className="container">
            Hello Admin
            <User users={data} />
            <div>
                <MedicalRecord users={data} token={token} />
                <Date users={data} token={token} />
            </div>
        </div>
    )
}