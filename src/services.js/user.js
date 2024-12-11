import axios from "axios";

/**
 * 
 * @param {*} config json object with the data to be updated
 * @param {*} token 
 */
const updateUser = async (config, token) => {
  try {
    const res = await axios.post('http://localhost:3001/api/users',
      config,
      {
        headers: {
          Authorization: token
        }
      }
    )

    return res
  } catch (error) {
    // console.clear()

  }
}

/**
 * 
 * @param {*} token 
 * @returns res
 */
const getUser = async (token) => {
  try {
    const res = await axios.get('http://localhost:3001/api/users', {
      headers: {
        Authorization: token
      }
    });

    return res
  } catch (error) {
    // console.clear()

  }
}


export { updateUser, getUser }