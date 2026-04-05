import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import { handleError } from '../util';

function ExpenseTrackerForm({addExpenses}) {

    const [expensesInfo, setExepensesInfo] = useState({
        text: '', amount:''
    });
 const navigate = useNavigate();


  const handleChange = (e) => {
    
      const {name, value} = e.target;
      //console.log(name, value); 
      const copyExpenseInfo = {...expensesInfo};
      copyExpenseInfo[name] = value; 
      setExepensesInfo(copyExpenseInfo) 

  }

  const handleExpense = (e) => {

    e.preventDefault();
    console.log(expensesInfo);
    const{text , amount} = expensesInfo;
    if(!text || !amount){
        handleError('all fields are required');
        return;
    }
    setTimeout(()=>{
        setExepensesInfo({text: '', amount: ''})
    }, 1000);
    addExpenses(expensesInfo);

  }

  return (
    <div className = 'container'>
      <h1>Expense Tracker</h1>
      <form onSubmit={handleExpense}>
         
       <div>
         <label htmlFor='expense'>Expense</label>
         <input 
         onChange={handleChange}
         type="text" 
         name='text'
         placeholder='Enter you expense...'
         value={expensesInfo.text}
         />
      </div>
       <div>
         <label htmlFor='amount'>Amount</label>
         <input 
         onChange={handleChange}
         type="number" 
         name='amount'
         placeholder='Enter your amount..'
         value={expensesInfo.amount}
         />
        </div>
         <button type='submit'>Add Expense</button>
         
      </form>
      <ToastContainer />
    </div>
  )
}

export default ExpenseTrackerForm
