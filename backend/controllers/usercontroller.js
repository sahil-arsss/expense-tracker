import { pool } from "../libs/database.js";
import { comparePassword,hashPassword } from "../libs/index.js";
import { text } from "express";
export const getUser = async (req,res)=>{
    try {
        const {userId} = req.body.user;
        const userexist =await pool.query ({
            text: "Select * From tbluser WHERE id= $1",
            values: [userId],
        });

        const user =userexist.rows[0];
        if(!user)
        {
            return res.status(404).json({status : "failed",message : "user not found"});
        }
        user.password=undefined;
        res.status(201).json({
            status: "success",
            user,
        })
        

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed", message: error.message });
    }
}
export const changePassword = async (req,res)=>{
    try {
        const {currentPassword,newPassword,confirmPassword}=req.body;
        const {userId} = req.body.user;
        
        const userexist =await pool.query ({
            text: "Select * From tbluser WHERE id= $1",
            values: [userId],
        });

        const user =userexist.rows[0];
        if(!user)
        {
            return res.status(404).json({status : "failed",message : "user not found"});
        }
        if(newPassword!==confirmPassword) 
        {
            return res.status(401).json({status: "failed",message : "newPassword doesn't match"})
        }
        const isMatch = await comparePassword(currentPassword,user?.password);
        if(!isMatch)
        {
            return res.status(401).json({status: "failed",message: "incorrect current password"});
        }
        const hashedPassword = hashPassword(newPassword);
        await pool.query({
            text: `UPDATE tbluser SET password=$1 where id = $2`,
            values: [hashedPassword,userId],
        }) 
        return res.status(200).json({
            status: "success",
            message:"password has changed",
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed", message: error.message });
    }
}
export const updateUser = async (req,res)=>{
    try {
        const {userId} = req.body.user;
        const {firstName,lastName,country,currency,contact} = req.body;


        const userexist =await pool.query ({
            text: "Select * From tbluser WHERE id= $1",
            values: [userId],
        });

        const user =userexist.rows[0];
        if(!user)
        {
            return res.status(404).json({status : "failed",message : "user not found"});
        }   

        const updateUser = await pool.query({
            text: `UPDATE tbluser SET firstName=$1,lastName=$2 , country=$3,currency=$4,contact=$5,updatedAt=CURRENT_TIMESTAMP
            where id=$6 RETURNING *`,
            values : [firstName,lastName,country,currency,contact,userId]   
        });


        updateUser.rows[0].password=undefined;
        return res.status(200).json({
            status: "success",
            message: "user information updated successfully",
            user : updateUser.rows[0],
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: "failed", message: error.message });
    }
}