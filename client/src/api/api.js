import axios from 'axios'



export const fetchItems = async () => {
    console.log('fetching all items')
    
    try {
     const response = await axios('/api/items')
       
        return response.data
        
    } catch (err) {
        return console.error(err.message);
    }
}

export const addItemAPI = async (name) => {
    console.log('adding item')

    try {
     const response = await axios.post('/api/items', {name})
        console.log(response)
        return response
        
    } catch (err) {
        return console.error(err.message);
    }
}

export const deleteItemAPI = async (id) => {
    console.log('deleting item from db')
    try {
     const response = await axios.delete('/api/items/' + id)
        console.log(response)
        
        
    } catch (err) {
        return console.error(err.message);
    }
}

