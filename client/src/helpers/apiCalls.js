import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.withCredentials = true

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