
import React from 'react'

//components
import HereditaryDiseasesList from './HereditaryDiseasesList/HereditaryDiseasesList'
import HereditaryDiseasesForm from './HereditaryDiseasesForm/HereditaryDiseasesForm'

export default ({ token , hereditaryDiseases , addHereditaryDiseasesHandler  }) => {

    const addHereditaryDiseases = (hereditaryDiseases) => {
        addHereditaryDiseasesHandler(hereditaryDiseases)
    }
    
    return (
       <div>
           <h4 style={{ marginTop : 30 , textAlign : 'center' , marginBottom : -6 , fontWeight : 'bold'}}> Hereditary Diseases </h4>
           <HereditaryDiseasesList hereditaryDiseases={hereditaryDiseases} />
           <HereditaryDiseasesForm token={ token } addHereditaryDiseases={addHereditaryDiseases} />
       </div> 
    )
}