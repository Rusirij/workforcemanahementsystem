import express from "express";
import cors from 'cors'
// import { ManagerRouter} from "./Routes/ManagerRoute.js";
import { EmployeeRouter } from "./Routes/EmployeeRoute.js";


const app = express() 
app.use(cors())
app.use(express.json)
app.use('/auth', EmployeeRouter)


// app.use(cors({
//     origin: ["http://localhost:5173"],
//     methods: ['GET', 'POST', 'PUT', "DELETE"],
//     credentials: true
// }))




app.listen(3000, () => {
    console.log("Server is running")
})

