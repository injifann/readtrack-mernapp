import dotenv from 'dotenv'
import express from 'express';
import connectDB from './config/db.js'

dotenv.config();


const port=process.env.PORT || 5000;
const app=express ();

connectDB();

app.listen(port,()=>{
    console.log(`app is running on the ${port}`);
})
