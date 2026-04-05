const UserModel = require("../Models/User");
const mongoose = require('mongoose');

const addExpenses = async (req, res) => {
    const body = req.body;
    const{_id} = req.user;
    
    try {

        const userData = await UserModel.findByIdAndUpdate(
            _id, 
            {
                $push: {expenses: body}
            },

            {new: true} //for returning the updated documents 
        );

       
        
        return res.status(200).json({
            message: "Expense Added succesfully",
            success: true,
            data: userData?.expenses
        });



        
    } catch (err) {
        return res.status(500).json({
            message: "something went wrong",
            error: err,
            success: false
        })
    }
}

const fetchExpenses = async (req, res) => {
    const body = req.body;
    const{_id} = req.user;
    
    try {

        const userData = await UserModel.findById(_id).select('expenses');
        return res.status(200).json({
            message: "Expense Fetched succesfully",
            success: true,
            data: userData?.expenses
        });


        
    } catch (err) {
        return res.status(500).json({
            message: "something went wrong",
            error: err,
            success: false
        })
    }
}

const deleteExpenses = async (req, res) => {
    const{_id} = req.user;
    const { expenseId} = req.params; 

     
    try {

        const userData = await UserModel.findByIdAndUpdate(
            _id, 
            {
                $pull: {
                    expenses: { _id: new mongoose.Types.ObjectId(expenseId) }
                }
            },

            {new: true} //for returning the updated documents 
        );

        console.log("Deleting Expense ID:", expenseId);

        return res.status(200).json({
            message: "Expense deleted succesfully",
            success: true,
            data: userData?.expenses
        });


        
    } catch (err) {

        console.log(err);
        return res.status(500).json({
            message: "something went wrong",
            error: err.message,
            success: false
        })
    }
}

module.exports = {
    addExpenses, 
    deleteExpenses,
    fetchExpenses
}