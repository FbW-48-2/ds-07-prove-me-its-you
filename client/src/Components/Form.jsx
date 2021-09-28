import React, {useState, useContext, useEffect} from 'react'
import { Box, TextField, FormControl, Button } from '@mui/material'

export default function FormComponent(props) {
    const [userInput, setUserInput] = useState('')
    const [pwInput, setPwInput] = useState('')
    
    const {handleSubmit} = props

    return (
        <>
         <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 2, width: '25ch' },
                display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                noValidate
                autoComplete="off"
            >
              <FormControl>
                 <TextField
                    id="outlined-name"
                    label="Username"
                    value={userInput}
                    onChange={(e) => {setUserInput(e.target.value)}}
                    /> 

                <TextField
                id="outlined-pw-input"
                label="Password"
                type="password"
                value={pwInput}
                onChange={(e) => {setPwInput(e.target.value)}}
                />  
            <Button type="submit" onClick={(e) =>{handleSubmit(e, userInput, pwInput); setUserInput(''); setPwInput('')}}>Proceed</Button>
            </FormControl>
            </Box>   
        </>
    )
}
