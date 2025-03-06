import express from 'express'
import authRoutes from './authroutes.js'
import userRoutes from './userroutes.js'
const routes=express.Router();


routes.use('/auth',authRoutes);
routes.use('/user',userRoutes);
export default routes;