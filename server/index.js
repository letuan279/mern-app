const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const authRoute = require('./routes/auth')
const courseRoute = require('./routes/course')
const cors = require('cors')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.c8qgw.mongodb.net/Cluster0?retryWrites=true&w=majority`, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useFindAndModify: false
        })
        console.log('MongoBD connected')
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}
connectDB()

app.use(express.json())
app.use(cors())

// Router
app.use('/api/auth', authRoute)
app.use('/api/courses', courseRoute)



app.listen(PORT, (err) => {
    if (err) console.log(err)
    console.log(`Server listening on port : ${PORT}`)
})
