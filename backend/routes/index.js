import express from 'express'
import authRoutes from './authroutes.js'
import userRoutes from './userroutes.js'
import accountroutes from './accountroutes.js'
import transactionRoutes from './transactionRoutes.js'
const routes=express.Router();

routes.use('/auth',authRoutes);
routes.use('/user',userRoutes);
routes.use('/account',accountroutes);
routes.use('/transaction',transactionRoutes);
export default routes;