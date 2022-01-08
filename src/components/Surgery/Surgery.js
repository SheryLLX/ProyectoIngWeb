
import React from 'react'

//components
import SurgeryList from './SurgeryList/SurgeryList'
import SurgeryForm from './SurgeryForm/SurgeryForm'

export default ({ token , surgerys , addSurgerytHandler  }) => {

    const addSurgery = (surgery) => {
        addSurgerytHandler(surgery)
    }
    
    return (
       <div>
           <h4 style={{ marginTop : 30 , textAlign : 'center' , marginBottom : -6 , fontWeight : 'bold'}}> Surgerys </h4>
           <SurgeryList surgerys={surgerys} />
           <SurgeryForm token={ token } addSurgery={addSurgery} />
       </div> 
    )
}