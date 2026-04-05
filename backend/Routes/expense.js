const { fetchExpenses, addExpenses, deleteExpenses } = require('../Controllers/ExpenseController');

const router = require('express').Router();

//we will fetch all user based id here 
router.get('/', fetchExpenses);


//we will add all user based id here 
router.post('/', addExpenses);

//we will delete all user based id here 
router.delete('/:expenseId', deleteExpenses);

module.exports = router;