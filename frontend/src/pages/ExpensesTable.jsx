import React from 'react'

function ExpensesTable({ expenses, handleDeleteEx }) {

  const getCategoryColor = (category) => {
    switch(category){
      case 'Food': return '#f39c12'
      case 'Travel': return '#3498db'
      case 'Salary': return '#27ae60'
      case 'Shopping': return '#9b59b6'
      default: return '#7f8c8d'
    }
  }

  return (

    <div className='expense-list'>

      {expenses?.map((expense, index) => (

        <div key={index} className='expense-item'>

          {/* Delete Button */}
          <button
            className='delete-button'
            onClick={() => handleDeleteEx(expense._id)}
          >
            X
          </button>

          {/* Expense Text */}
          <div className='expense-description'>
            {expense.text}
          </div>

          {/* Category Badge */}
          <div
            className='expense-category'
            style={{
              backgroundColor: getCategoryColor(expense.category),
              color: 'white',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '12px',
              minWidth: '70px',
              textAlign: 'center'
            }}
          >
            {expense.category}
          </div>

          {/* Amount */}
          <div
            className='expense-amt'
            style={{
              color: expense.amount > 0 ? '#27ae60' : '#e74c3c',
              fontWeight: '600'
            }}
          >
            {expense.amount}
          </div>

        </div>

      ))}

    </div>

  )
}

export default ExpensesTable