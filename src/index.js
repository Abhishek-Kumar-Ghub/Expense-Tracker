import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/databse.js';
import router from './routes/user.route.js';
import expenseRouter from './routes/expense.route.js';

dotenv.config()
const app=express();
app.use(express.json())
const PORT=process.env.PORT || 5000;
connectDb();

app.get("/" , (req,res)=>{
res.send("server is running healthy")
})

app.use("/user", router)
app.use("/expense", expenseRouter)

app.listen(PORT,()=>{
console.log(`server is running on PORT ${PORT}`)
})
