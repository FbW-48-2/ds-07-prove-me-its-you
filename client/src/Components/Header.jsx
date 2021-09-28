import React, {useContext} from 'react'
import { Grid, MenuItem } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/userContext.js'
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { handleLogout } from '../helpers/fetchData.js';


export default function Header() {
    
    const {user, setUser} = useContext(UserContext)

    const handleClick = () => {
        handleLogout()
        setUser({})
        
    }

    return (
        <Grid item height="100px"  sx={{padding: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', width: "100vw"}}>
            <MenuItem component={Link} to={'/adduser'}>
                <PersonAddIcon /> 
                <p> - add user</p> 
            </MenuItem> 
            
            {!user.username ?
                <MenuItem component={Link} to={'/login'}>
                    <PersonOutlineIcon />
                    <p> - Login</p> 
                </MenuItem>             
            :
            <>
                <MenuItem component={Link} to={'/login'}>
                    <PersonOutlineIcon />
                    <p> - UserLIst</p> 
                </MenuItem>                 
                <MenuItem onClick={handleClick}>
                    <LogoutIcon />
                    <p> - Logout</p> 
                </MenuItem> 
            </>
             }
        </Grid>
    )
}