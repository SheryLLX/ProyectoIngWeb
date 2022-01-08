
import React from 'react'

//components
import AllergyList from './AllergyList/AllergyList'
import AllergyForm from './AllergyForm/AllergyForm'

export default ({ token , allergies , addAllergytHandler  }) => {

    const addAllergy = (surgery) => {
        addAllergytHandler(surgery)
    }
    
    return (
       <div>
           <h4 style={{ marginTop : 30 , textAlign : 'center' , marginBottom : -6 , fontWeight : 'bold'}}> Allergies </h4>
           <AllergyList allergies={allergies} />
           <AllergyForm token={ token } addAllergy={addAllergy} />
       </div> 
    )
}