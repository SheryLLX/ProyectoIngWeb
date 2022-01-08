
import React, { useEffect, useState } from 'react'

//
import Profile from '../../components/Profile/Profile'
import MedicalRecord from '../../components/MedicalRecord/MedicalRecord'
import Date from '../../components/Date/Date'
import DatePersonalizada from '../../components/DatePersonalizada/DatePersonalizada'

export default ({ userId, token }) => {

    const [data, setData] = useState([])
    const [users, setUsers] = useState([])
    const [idUser, setIdUser] = useState("")
    

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
                console.log(resData)
                setIdUser(resData.name)
                console.log(resData.name)
            })
            .catch((err) => {
                console.log(err)
            });

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
                setUsers(resData)
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        console.log(data.name)
    }, [data])

    return (
        <div className="container">
            <div>
                Profile Doctor
            </div>
            <div>
                < Profile data={data} />
            </div>
            <div>
                <MedicalRecord users={users} token={token} />
            </div>
            <div>
            <div>
            </div>
            <div>
                < DatePersonalizada token={token} role={'admin'} data2={data} />
            </div>
            </div>
        </div>
    )

}