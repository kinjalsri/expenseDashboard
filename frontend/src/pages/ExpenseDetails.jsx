import React from 'react'

function ExpenseDetails({incomeAmt, expenseAmt}) {
  return (
    <div>
      <div>
        Your Balance is {incomeAmt - expenseAmt}
      </div>
      <div className='amounts-container'>
        Income:
        <span className='income-amt'>{incomeAmt}</span>
        
        Expense:
        <span className='expense-amt'>{expenseAmt}</span>
      </div>
    </div>
  )
}

export default ExpenseDetails
