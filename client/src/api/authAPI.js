import axios from 'axios'


export const configToken = token =>{
    
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    if(token){
        config.headers["x-auth-token"] = token
    }
 return config
}




export const  loadUser = async (token) => {
    try {
        
    const config = configToken(token)
    const resp = await axios.get('/api/auth/user', config)
    
    return resp
} catch (e){
    return {data: e.response.data, status: e.response.status}
}
    }

 export const registerUser = async (userInfo) => {
    
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const { name, email, password } = userInfo
    
      // Request body
      const body = JSON.stringify({ name, email, password });
    
    try{
    const resp = await axios.post('/api/users', body, config)
    return resp 
} catch (e) {
    
    return (e.response)
}

 }   


 // login user
 export const loginUser = async (userInfo) => {
    
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const { email, password } = userInfo
    
      // Request body
      const body = JSON.stringify({ email, password });
    
    try{
    const resp = await axios.post('/api/auth/user/login', body, config)
    return resp 
} catch (e) {
    
    return (e.response)
}

 }   
