
import React from 'react'

//components
import ContactList from './components/ContactList.js/ContactList'
import ContactForm from './components/ContactForm.js/ContactForm'

export default ({ token , contacts , addContactHandler  }) => {

    const addContact = (contact) => {
        addContactHandler(contact)
    }
    
    return (
       <div>
           <h4 style={{ marginTop : 30 , textAlign : 'center' , marginBottom : -6 , fontWeight : 'bold'}}> Contacts </h4>
           <ContactList contacts={contacts} />
           <ContactForm token={ token } addContact={addContact} />
       </div> 
    )
}