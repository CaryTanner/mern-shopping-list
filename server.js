import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as path from 'path'

dotenv.config();


const PORT = process.env.PORT || 5000
const db = process.env.MONGODB_URI

import itemRoutes from './routes/api/items'


const app = express()

//middleware
app.use(bodyParser.json())

//routes

app.use('/api/items', itemRoutes)

//serve static routes in production
if(process.env.NODE_ENV === 'production'){
    //set a static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(()=> console.log('mongodb connected'))
    .catch(err => console.log(err))

app.listen(PORT, ()=> console.log(`server started on ${PORT}`))