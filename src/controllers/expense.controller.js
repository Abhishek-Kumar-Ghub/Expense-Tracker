import expense from "../models/expense.js";

const addExpense=async(req,res)=>{
try{
    const {title,amount,category,date,note}=req.body;
    const expense=await expense.create({title,amount,category,date,note,user:req.user._id})
    return res.status(201).json({message:"expenses were created"})
}catch(error){
    console.log(error.message)
    res.status(500).json({message:error.message})
}
}
const getExpense=async(req,res)=>{
try{
const expenses=await expense.find({user:req.user._id})
res.status(200).json({message:"data fetched successfully",expenses})
} catch(error){

    console.log(error.message)
    res.status(500).json({message:error.message})
}
}
const updateExpense=async(req,res)=>{
    try {
        const {id}=req.params
        const expense=await expense.findById(id)
        if(expense.user.toString()!==req.user._id.toString()){
            return res.status(401).json({message:"unauthorized mesage"})
        }
        const updateExpense=await expense.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json({message:"data is updated successfully",updateExpense})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message}) 
    }
}

export{addExpense , getExpense , updateExpense}