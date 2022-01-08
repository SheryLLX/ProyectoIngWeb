
import React, { useEffect } from 'react'
import { Bar } from 'react-chartjs-2';


const DateGrafico = (props) => {

    useEffect(() => {
        console.log(props.filterData)
    })

    const filterDataMapGraphicCount = (label) => {
        let count = Object.values(props.filterData).filter((item) => {
            if(item.reason == label){
                return item.reason
            }
        })
        return count.length ;
    }

    const data = {
        labels: ['Consulta Mensual', 'Emergencia', 'Covid', 'Examenes', ],
        datasets: [
            {
                label: '# of Cases',
                data: [ 
                    filterDataMapGraphicCount('Consulta Mensual') , 
                    filterDataMapGraphicCount('Emergencia'), 
                    filterDataMapGraphicCount('Covid'),
                    filterDataMapGraphicCount('Examenes') ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    //'rgba(153, 102, 255, 0.2)',
                    //'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    //'rgba(153, 102, 255, 1)',
                    //'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <>
            <Bar data={data} options={options} />
        </>
    )
}

export default DateGrafico;
