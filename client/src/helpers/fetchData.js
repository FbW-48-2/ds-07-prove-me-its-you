const serverUrl = "http://localhost:5000"

export const signInUser = async (userInput, pwInput) => {
    console.log('Sign in started with!',userInput, pwInput)
    const data = {username: userInput, password: pwInput}
    try {
        const res = await (
          await fetch(`${serverUrl}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'

          })
        ).json();
        return res;
      } catch (error) {
        return error;
      }
}

export const fetchUserList = async() => {
    try {
        const res = await (
          await fetch(`${serverUrl}/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          })
        ).json();
        return res;
      } catch (error) {
        return error;
      }
}


export const checkAuth = async() => {
  try {
    const res = await (
      await fetch(`${serverUrl}/checkAuth`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
    ).json();
    return res;
  } catch (error) {
    return error;
  }
}

export const addUser = async(data) => {
  try {
    const res = await (
      await fetch(`${serverUrl}/adduser`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'

      })
    ).json();
    console.log(res, ' went into array')
    return res;
  } catch (error) {
    return error;
  }
}

export const handleLogout = async() =>  {
  try {
    const res = await (
      await fetch(`${serverUrl}/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'

      })
    ).json();
    console.log(res)
    return res;
  }catch (error) {
    return error;
  }
}