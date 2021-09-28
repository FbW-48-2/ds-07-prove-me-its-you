import React, { useContext, useState } from 'react'
import { LogInContext } from '../context/LogInContext';
import { useHistory } from 'react-router-dom';


export default function LogIn() {
    
    const { login, setUser } = useContext(LogInContext)

    const history = useHistory()

    const [ formData, setFormData ] = useState({
        username: "",
        password: ""
    })

    const [ errorState, setErrorState ] = useState()

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await login(formData);
        
        if(response.error){
            setErrorState(response)
            setTimeout(()=>{
                setErrorState()
            }, 5000)
        }
        else{
            setUser(response)
            setFormData({
                username: "",
                password: ""
            })
            history.push('/users')
        }
    }

    return (
        <>
            <div className="submit">
                <form className="form" onSubmit={handleSubmit}>
                    <h3 className="form__heading">LogIn</h3>
                    <input 
                        type="text" 
                        name="username"
                        onChange={handleChange} 
                        className="form__input form__input--user"  
                        placeholder="Username"
                        value={formData.username}
                    />
                    <input 
                        type="password" 
                        onChange={handleChange} 
                        name="password"
                        className="form__input form__input--password" 
                        placeholder="Password" 
                        value={formData.password}
                    />

                    <button type="submit" className="form__submit">Submit</button>
                    {
                    errorState ? 
                        <div className="form__error">
                            <p>{errorState.error}</p>
                        </div>
                        :
                        ""
                    }
                </form>
            </div>
        </>
    )
}
