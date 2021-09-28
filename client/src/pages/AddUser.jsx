import React from 'react'
import { Grid} from '@mui/material'

import FormComponent from '../Components/Form'
import { addUser } from '../helpers/fetchData.js';

export default function AddUser() {
    
    const handleSubmit = (e, user, pw) => {
        const intoDb = {username: user, password: pw}
        e.preventDefault()
        const result = addUser(intoDb)
     }
    
    return (
        <>
           <Grid item margin="50px">
               <h2>Add User</h2>
               <p>What a mess, you can addUsers without being logged in...</p>
               <FormComponent handleSubmit={handleSubmit} />
            </Grid>
        </>
    )
}
