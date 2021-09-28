import React, {useState, useContext, useEffect} from 'react'
import { Grid} from '@mui/material'
import { UserContext } from '../context/userContext.js'
import {fetchUserList} from '../helpers/fetchData.js'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import People from '@mui/icons-material/People';

function Users() {
    
    const [userList, setUserList] = useState([])
    const {user, setUser} = useContext(UserContext)
    
   useEffect(async() =>  {
       const tmpUserList = await fetchUserList() 
       console.log('THE USER LIST', tmpUserList)
       setUserList(() => tmpUserList)
    },[])

    return (
        <Grid item margin="50px">
            <h2>User Page</h2>
            <p>The following users have been registered:</p>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                { userList.length > 0 ? userList.map((element, index) => {
                    return( 
                            <>
                            <ListItem 
                                alignItems="center" 
                                key={index}
                                disablePadding    
                                >
                                <ListItemAvatar>
                                    <People />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={element}
                                />
                            </ListItem>
                            </>
                    )
                }) : <></>}
            </List>

        
        </Grid>
    )
}

export default Users
