import dotenv from 'dotenv'
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js'
import router from './routes/bookRoutes.js';


dotenv.config();


const port=process.env.PORT || 5000;
const app=express ();
//middleware
app.use(express.json());
app.use(cors)

connectDB();
app.use("/api/books",router);
app.listen(port,()=>{
    console.log(`app is running on the ${port}`);
})
