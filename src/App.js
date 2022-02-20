import React from 'react';
import './App.css';

function App() {
  const [expenses, setExpenses] = React.useState([])
  const [currentExpense, setCurrentExpense] = React.useState({
                                                      description: "",
                                                      amount: "",
                                                      date: ""
                                                    })

  function trackExpense(event){
    switch (event.target.name){
      case 'expense_description':
        setCurrentExpense(prev => ({...prev,
          description:event.target.value}));
        break;
      case 'expense_amount':
        setCurrentExpense(prev => ({...prev,
          amount:event.target.value}))
        break;
      case 'expense_date':
        setCurrentExpense(prev => ({...prev,
          date:event.target.value}));
        break;
      default: 
    }
  }
  
  function addExpense(event){
    event.preventDefault()
    setExpenses(prev => ([...prev,currentExpense]))
    setCurrentExpense({
      description: "",
      amount: "",
      date: ""
    })
  }

  function ListExpenses(){
    return(
      expenses.map(function(expense){ 
        return (
        <tr>
          <td>{expense.description}</td>
          <td>{expense.amount}</td>
          <td>{expense.date}</td>
        </tr>
      )})
    )
  }

  return (
    <div className="App">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <div className='form-area'>
          <div className='form-header'>
            <p>description</p>
            <p>amount</p>
            <p>date</p>
          </div>
          <form>
            <input 
              className='expense_description' 
              name='expense_description' 
              value={currentExpense.description}
              onChange={trackExpense}
            />
            <input 
              className='expense_amount' 
              name='expense_amount' 
              value={currentExpense.amount}
              onChange={trackExpense}
            />
            <input 
              className='expense_date' 
              name='expense_date' 
              type={'date'} 
              value={currentExpense.date}
              onChange={trackExpense}
            />
            <button onClick={addExpense}>➕</button>
            <button>🗑️</button>      
          </form>
        </div>
        <table>
          <tbody>
            <tr>
              <th>description</th>
              <th>amount</th>
              <th>date</th>
            </tr>
            <ListExpenses />
          </tbody>
        </table>
        
      </main>
    </div>
  );
}

export default App;
