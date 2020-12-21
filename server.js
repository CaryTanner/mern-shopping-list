import express from 'express';
import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import * as path from 'path'

dotenv.config();


const PORT = process.env.PORT || 5000
const db = process.env.MONGODB_URI




const app = express()

//middleware
app.use(express.json())

//routes
import itemRoutes from './routes/api/items'
import userRoutes from './routes/api/users'
import authRoutes from './routes/api/auth'

app.use('/api/items', itemRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)



//serve static routes in production
if(process.env.NODE_ENV === 'production'){
    //set a static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true  })
    .then(()=> console.log('mongodb connected'))
    .catch(err => console.log(err))

app.listen(PORT, ()=> console.log(`server started on ${PORT}`))