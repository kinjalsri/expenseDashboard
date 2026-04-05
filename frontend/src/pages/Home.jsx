
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../util';
import {ToastContainer} from 'react-toastify'
import ExpensesTable from './ExpensesTable';
import ExpenseTrackerForm from './ExpenseTrackerForm';
import ExpenseDetails from './ExpenseDetails';



function Home() {

  const [loggedInUser, setLoggedInUser] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [expenseAmt, setExpenseAmt] = useState(0);
  const [incomeAmt, setIncomeAmt] = useState(0);

  
  const navigate = useNavigate();


  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'))
  }, []);


  useEffect(()=>{
    const amounts = expenses.map((item) => item.amount);
    console.log(amounts);
    const income = amounts.filter(item => item>0).reduce((acc, item) => (acc += item), 0);
    console.log('income :' , income );
    const exp = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1 ;
    console.log('exp :' , exp );

    setIncomeAmt(income); 
    setExpenseAmt(exp);

  }, [expenses]);

  const handleLogout = () => {
    localStorage.removeItem('JWTtoken');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged Out');
    setTimeout(() => { 
       navigate('/login');
    }, 2000);

  }

 const fetchExpenses = async () => {
  try {

    const url = "http://localhost:3000/expenses";
    const headers = {
      headers: {
        'Authorization' : localStorage.getItem('JWTtoken')
    }
  }
    
    const res = await fetch(url, headers);
    if(res.status===403){
      navigate('/login')
      return;
    }
    const result = await res.json();
    //console.log(result.data);
    setExpenses(result.data);
    
  } catch (error) {
    handleError(error);
  }
 }
  useEffect(() => {
    fetchExpenses()
  }, []);

  const addExpenses = async (data) => {
  try {

    const url = `http://localhost:3000/expenses`;
    const headers = {
      headers: {
        'Authorization' : localStorage.getItem('JWTtoken'),
        'Content-Type'  : 'application/json'

    },
      method: 'POST',
      body: JSON.stringify(data)
  }
    
    const res = await fetch(url, headers);
    if(res.status===403){
      navigate('/login')
      return;
    }
    const result = await res.json();
    //console.log(result.data);
    setExpenses(result.data);
    handleSuccess(result.message);
    
  } catch (error) {
    handleError(error);
  }
 }

 const handleDeleteEx = async (expenseId)=> {
 try {

    const url =`http://localhost:3000/expenses/${expenseId}`;
    const headers = {
      headers: {
        'Authorization' : localStorage.getItem('JWTtoken'),
        'Content-Type'  : 'application/json'

    },
      method: 'DELETE',
      
  }
    
    const res = await fetch(url, headers);
    if(res.status===403){
      navigate('/login')
      return;
    }
    const result = await res.json();
    //console.log(result.data);
    setExpenses(result.data);
    handleSuccess(result.message);
    
  } catch (error) {
    handleError(error);
  }
}
 

  return (

    <div>
      <div className='user-section'>
         <div>Welcome, {loggedInUser}</div>
         <button onClick={handleLogout}>Logout</button>
     </div>
      <ExpenseDetails incomeAmt = {incomeAmt} expenseAmt = {expenseAmt}/>
      <ExpenseTrackerForm addExpenses={addExpenses}/>
     <ExpensesTable 
     expenses={expenses} handleDeleteEx={handleDeleteEx}/>
      
      
      
      <ToastContainer />
    </div>
  )
}

export default Home
