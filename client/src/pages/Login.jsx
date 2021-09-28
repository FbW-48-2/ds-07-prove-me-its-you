import React, {useState, useContext, useEffect} from 'react'
import { Grid, Box, TextField, FormControl, Button } from '@mui/material'
import { UserContext } from '../context/userContext.js'
import {signInUser} from '../helpers/fetchData.js'
import { Redirect } from 'react-router-dom';
import FormComponent from '../Components/Form.jsx';

function Login() {
    
    const [userInput, setUserInput] = useState('')
    const [pwInput, setPwInput] = useState('')
    const {user, setUser} = useContext(UserContext)
    
    const handleSubmit = async(e, userInput, pwInput) => {
        e.preventDefault()
        const data = await signInUser(userInput, pwInput)
        if (data.username){
            setUser(data)
        }
    }
    

    useEffect(() =>  {
        console.log('THE ACTUAL USER IS: ', user)
    },[user])

    return (
        <>
        {user.username ? <Redirect to="/user" /> :
        <Grid item margin="50px">
            <h2>Login Page</h2>
            <p>Please login to use our service. If you have no account yet, visit our SignUp Page or follow the Link fom your invitation mail.</p>
            <FormComponent handleSubmit={handleSubmit}/>
        </Grid>}
        </>
    )
}

export default Login