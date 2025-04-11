import { pool } from "../libs/database.js";
import { hashPassword ,comparePassword,createJWT } from "../libs/index.js";
export const signupUser = async (req,res)=>{
    try {
        const {firstName,email,password}= req.body;
        if(!firstName || !email || !password)
        {
           return  res.status(404).json({status: "failed",message: "provide required field"})
        }

        const userExist= await pool.query({
            text : "SELECT EXISTS (SELECT * FROM tbluser WHERE email=$1)",
            values: [email],
        })
        if(userExist.rows[0].exists)
        {
            return res.status(409).json({status: "failed",message: "Email already exist"});
        }
        const hashedPassword = await hashPassword(password)

         const user = await pool.query({
            text: `INSERT  INTO tbluser (firstName,email,password) values ($1,$2,$3) RETURNING *`,
            values: [firstName,email,hashedPassword],
         })
         user.rows[0].password=undefined;
        return res.status(201).json({
            status: "success",
            message: "user created successfully",
            user: user.rows[0],
         })
    } catch (error) {
        console.log(error);
     return   res.status(404).json({status: "failed",message: error.message });
    }

}

export const signinUser =async (req,res)=>{
    try {
        const {email,password} =req.body;
        if(!password || !email )
            {
              return  res.status(404).json({status: "failed",message: "provide required field"})
            }

        const userExist= await pool.query({
                text : "SELECT * FROM tbluser WHERE email=$1",
                values: [email],
             })
        const user =userExist.rows[0];
        if(!user)
            {
               return res.status(404).json({status: "failed",message: "invalid emial or password"});
            }
        const isSame = await comparePassword(password,user.password);
        if(!isSame)
        {
          return  res.status(500).json({status:"failed",message : "invalid emial or password"});
        }
        const token = createJWT(user.id);
        
         user.password=undefined;
        return res.status(200).json({
            status : "success",
            message: "login successfully",
            user,
            token,
         })
    } catch (error) {
      return  res.status(404).json({status: "failed",message: error.message })
    }

}
// export const signinUser =(req,res)=>{
//     try {
        
//     } catch (error) {
//         res.status(404).json({status: "failed",message: error.message })
//     }

// }