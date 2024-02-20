import express, { NextFunction , Request, Response} from 'express';
export const app = express();   
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {ErrorMiddleware} from './middleware/error';
import userRouter from './routes/user.route';
import courseRouter from './routes/course.route';
import orderRouter from './routes/order.route';
import notificationRouter from './routes/notification.route';
import analyticsRouter from './routes/analytics.route';

require('dotenv').config();

//body parser 
app.use(express.json({limit: '50mb'}));

//cookie Parser
app.use(cookieParser());

//cors(cross origin resourse sharing)
app.use(cors({
    origin:process.env.ORIGIN
}));

// routes
app.use('/api/v1',userRouter,courseRouter,orderRouter,notificationRouter,analyticsRouter);


//testing api 
app.get('/test', (req:Request,res:Response,next:NextFunction) => {
    res.status(200).json({
        sucess:true,
        message:"API is working",
    });
})

//unknown routes
app.all("*",(req:Request , res:Response, next:NextFunction) => {
    const err = new Error(`Route ${req.originalUrl} not found`) as any;
    err.statusCode = 404;
    next(err);
});

//Error Handler middleware
app.use(ErrorMiddleware);