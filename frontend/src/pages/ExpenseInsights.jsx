import React from 'react'

function ExpenseInsights({expenses}) {

const getHighestExpense = () => {
if(!expenses?.length) return null;

const expenseOnly = expenses.filter(e => e.amount < 0);

if(!expenseOnly.length) return null;

return expenseOnly.reduce((max, item) => 
item.amount < max.amount ? item : max
);
}

const highest = getHighestExpense();

return (

<div style={{marginTop:'20px'}}>

<h3>Insights</h3>

<div style={{
background:'#f5f5f5',
padding:'15px',
borderRadius:'8px'
}}>

<div>
Total Transactions: {expenses?.length || 0}
</div>

<div>
Highest Expense: {highest?.text || 'None'}
</div>

<div>
Category: {highest?.category || 'N/A'}
</div>

</div>

</div>

)
}

export default ExpenseInsights