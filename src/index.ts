import express, { Application, Request, Response, NextFunction } from 'express'
import { configDotenv } from 'dotenv'
import connectDB from './config/config'
import roomsTypesRoute from './routes/room-type.route'
import roomsRoute from './routes/room.route'
import CustomError from './errors/CustomError'
import errorHandler from './middlewares/error-handler.middleware'
import userRoute from './routes/user.route'





configDotenv()

connectDB()
const app:Application = express()

const port = process.env.PORT || 5000

app.use(express.json())
// ROUTES
app.use('/api/v1/rooms-types', roomsTypesRoute)
app.use('/api/v1/rooms', roomsRoute)
app.use('/api/v1/user', userRoute)


// DEFAULT ROUTE 
app.use('*', (req:Request, res:Response, next:NextFunction) =>{
    const error = new CustomError(`Oops... Seems Like the Route ${req.originalUrl} You are Looking For does not Exist`, 404)
    next(error)
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server running on ${port}`);
    
})

