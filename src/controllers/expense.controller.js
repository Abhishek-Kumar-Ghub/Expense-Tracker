import expense from "../models/expense.js";

const addExpense=async(req,res)=>{
try{
    const {title,amount,category,date,note}=req.body;
    const expensess=await expense.create({title,amount,category,date,note,user:req.user._id})
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
        const expensee=await expense.findById(id)
        if(expensee.user.toString()!==req.user._id.toString()){
            return res.status(401).json({message:"unauthorized mesage"})
        }
        const updateExpense=await expense.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json({message:"data is updated successfully",updateExpense})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message}) 
    }
}
const deleteExpense = async (req, res) => {
  try {
    const {id} = req.params;
    const existingExpense = await expense.findById(id);
    if (!existingExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    if (existingExpense.user.toString() !== req.user._id.toString()) {
        // user aur miidleware ki id ko check krega same h ki nhi
      return res.status(401).json({ message: "Unauthorized" });
    }
    await expense.findByIdAndDelete(id);
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const getTotalExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const total = await expense.aggregate([
      { $match: { user: userId } },
      { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
    ]);
    const totalAmount = total.length > 0 ? total[0].totalAmount : 0;
    res.status(200).json({ message: "Total calculated successfully", totalAmount });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export { addExpense, getExpense, updateExpense, deleteExpense, getTotalExpense };