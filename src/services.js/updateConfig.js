import axios from "axios";

/**
 * 
 * @param {*} config json object with the data to be updated
 * @param {*} token 
 */
const update = async (config, token) => {
  const res = await axios.post('http://localhost:3001/api/users',
    config,
    {
      headers: {
        Authorization: token
      }
    }
  ).then((response) => {
    return response
  }).catch((error) => {
    console.log(error);
  })

  return res
}

const getConfig = async (token) => {
  const res = await axios.get('http://localhost:3001/api/users',
    {
      headers: {
        Authorization: token
      }
    }
  ).then((response) => {
    return response
  }).catch((error) => {
    console.log(error);
  })

  return res
}


export { update, getConfig }