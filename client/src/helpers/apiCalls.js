import axios from "axios";

axios.defaults.baseURL = 'https://ds-07-prove-me-its-you.vercel.app/'
// axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

export const signUp = async (user) => {
  try {
    const res = await (await axios.post(
      '/signup',
      user
    )).data
    return res
  } catch (err) {
    return err.response.data
  }
}

export const auth = async (user) => {
  try {
    const res = await (await axios.post(
      '/login',
      user
    )).data
    return res
  } catch (err) {
    return err.response.data
  }
}

export const getUsers = async () => {
  try {
    const res = await (await axios('/users')).data
    return res
  } catch (err) {
    return err.response.data
  }
}

export const signOut = async () => {
  try {
    const res = await (await axios('/signout')).data
    return res
  } catch (err) {
    return err.response.data
  }
}