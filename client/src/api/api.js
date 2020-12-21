import axios from 'axios'



export const fetchItems = async () => {
    
    
    try {
     const response = await axios('/api/items')
       
        return response.data
        
    } catch (err) {
        return (err.message);
    }
}

export const addItemAPI = async (name) => {
   

    try {
     const response = await axios.post('/api/items', {name})
        
        return response
        
    } catch (err) {
        return err.message;
    }
}

export const deleteItemAPI = async (id) => {
   
    try {
     const response = await axios.delete('/api/items/' + id)
        return response
        
        
    } catch (err) {
        return (err.message);
    }
}

