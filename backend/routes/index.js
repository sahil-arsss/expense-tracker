import express from 'express'
import authRoutes from './authroutes.js'
const routes=express.Router();


routes.use('/auth',authRoutes);
export default routes;