// here I'll fetch all my routesto the frontend with axios
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const getUsers = async () => {
    try {
        const res = await axios.get("/users")
        return res.data
    } catch (error) {
        return error.response.data;
    }
}

export const login = async (userInput) => {
    try {
        const res = await axios.post('/login', userInput)
        return res.data
    } catch (error) {
        return error.response.data;
    }
}