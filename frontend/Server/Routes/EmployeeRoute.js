import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";
import axios from 'axios';

const router = express.Router();

router.get("/adminlogin", (req, res) => {
    console.log("Test" + req.body)
    // axios.get('http://localhost:8080/api/employees/empLogin/'+ email +'/' + pw)
    // if (result.length > 0) {
    //     const email = result[0].email;
    //     const token = jwt.sign(
    //       { role: "admin", email: email, id: result[0].id },
    //       "jwt_secret_key",
    //       { expiresIn: "1d" }
    //     );
    //     res.cookie('token', token)
    //     return res.json({ loginStatus: true });
    // } else {
    //     return res.json({ loginStatus: false, Error:"wrong email or password" });
    // }

});

export {router as EmployeeRouter}