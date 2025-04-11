import cors from 'cors';
import express from 'express'
import dotenv, { config } from 'dotenv'
import { Route } from 'react-router-dom';
import routes from './routes/index.js';
dotenv.config()
 

const app=express();

const PORT=process.env.PORT || 8000;

app.use(cors("*"))
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended:true}))


app.use("/api-v1",routes);

app.use("*",(req,res)=>{
    res.status(404).json({
        status : "404 not found",
        message : "route not found",
    });
});

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`);
})


