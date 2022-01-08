
import React, { useEffect, useState } from 'react'

//components
import DateList from './components/DateList/DateList'
import DateForm from './components/DateForm/DateForm'

export default ({ token, role }) => {

    const [data, setData] = useState([])
    const [ doctors , setDoctors] = useState([])
    const [ caseCovidYear , setCaseCovidYear] = useState([])

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
                setData(resData)
                const result = Object.values(resData).filter(date =>{return date.reason ==="Covid"})
                let other = []
                result.forEach(item => {
                    const year = item.date[0] + item.date[1] + item.date[2] + item.date[3]
                    console.log(year)
                    console.log(other.indexOf(year))
                        if(other.indexOf(year) === -1){
                            other.push(
                                parseInt(year),
                            )
                            console.log(other)
                        }else{
                            other[`${year}`] = other[`${year}`] + 1
                            console.log(other)
                        } 
                })
                console.log(other)
                let n = other.sort(function(a, b){return a - b});
                console.log(n)
                let f = []
                let contador = 0
                for (let x = 0; x < n.length; x++) {
                    const element1 = n[x];
                    contador = 0;
                    for (let j = 0; j < n.length; j++) {
                        const element2 = n[j];
                        if (element1 === element2) {
                            contador ++;
                        }
                    }
                    f.push(
                        {
                            year : element1, 
                            count : contador
                        }
                    ) 
                    x = x + (contador - 1)   
                }
                console.log(f)
                setCaseCovidYear(f)
            })
            .catch((err) => {
                console.log(err)
            });
    }
    
    const fetchDoctor = () => {
        let http = 'http://localhost:8080/user/getAllDoctor';
       
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
                setDoctors(resData)
            })
            .catch((err) => {
                console.log(err)
            });
    }

    const addDateHandler = (date) => {
        console.log(data)
        setData(prevDates => {
            return [date, ...prevDates]
        })
    }

    useEffect(() => {
        fetchData();
        fetchDoctor();
    }, [])

    useEffect(() => {
        console.log(doctors)
    }, [ data , doctors ])

    const renderedcaseCovidYear =Object.values(caseCovidYear).map(item => {
        return (
            <div>
                {item.year} = {item.count}
            </div>
        )
    })
    return (
        <div>
            <div style={{ marginTop: 15 }} >
                {renderedcaseCovidYear}
                < DateList token={token} dates={data} />
                {role == 'admin' ? '' : (< DateForm token={token} addDateHandler={addDateHandler} doctors={doctors} dates={data} />)}
            </div>
        </div>
    )
}