import React from "react";
import "./App.css";

function App() {
  const [expenses, setExpenses] = React.useState([]);
  const [currentExpense, setCurrentExpense] = React.useState({
    description: "",
    amount: "",
    date: "",
  });
  const [inputErrors, setInputErrors] = React.useState({
    description: false,
    amount: false,
    date: false,
  });

  React.useEffect(() => {
    let oldExpenses = localStorage.getItem('expenses')
    oldExpenses && setExpenses(JSON.parse(oldExpenses))
  },[])

  React.useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  function trackExpense(event) {
    switch (event.target.name) {
      case "expense_description":
        setCurrentExpense((prev) => ({
          ...prev,
          description: event.target.value,
        }));
        break;
      case "expense_amount":
        setCurrentExpense((prev) => ({ ...prev, amount: event.target.value }));
        break;
      case "expense_date":
        setCurrentExpense((prev) => ({ ...prev, date: event.target.value }));
        break;
      default:
    }
  }

  function addExpense(event) {
    event.preventDefault();
    // console.log(currentExpense)
    let errors = false;
    if (currentExpense.amount === "") {
      setInputErrors((prev) => ({ ...prev, amount: true }));
      errors = true;
    }
    if (currentExpense.description === "") {
      setInputErrors((prev) => ({ ...prev, description: true }));
      errors = true;
    }
    if (currentExpense.date === "") {
      setInputErrors((prev) => ({ ...prev, date: true }));
      errors = true;
    }
    if (errors) {
      return;
    }
    setExpenses((prev) => [...prev, currentExpense]);
    clearCurrentExpense(event);
  }

  function clearCurrentExpense(event) {
    event.preventDefault();
    setCurrentExpense({
      description: "",
      amount: "",
      date: "",
    });
    setInputErrors({
      description: false,
      amount: false,
      date: false,
    });
  }

  function deleteExpense(index) {
    setExpenses(expenses.filter((item, i) => i !== index));
  }

  function ListExpenses() {
    return expenses.map(function (expense, index) {
      return (
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{expense.description}</td>
          <td>${expense.amount}</td>
          <td>{expense.date}</td>
          <td>
            <button onClick={() => deleteExpense(index)}>☓</button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="App">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <main>
        <div className="form-area">
          <div className="form-header">
            <p>
              description
              <span className="input-required">
                {inputErrors.description ? " Required!" : ""}
              </span>
            </p>
            <p>
              amount
              <span className="input-required">
                {inputErrors.amount ? " Required!" : ""}
              </span>
            </p>
            <p>
              date
              <span className="input-required">
                {inputErrors.date ? " Required!" : ""}
              </span>
            </p>
          </div>
          <form>
            <input
              className="expense_description"
              name="expense_description"
              value={currentExpense.description}
              onChange={trackExpense}
              required={true}
            />
            <label for="expense_amount" id="expense_amount-label">
              <input
                className="expense_amount"
                name="expense_amount"
                value={currentExpense.amount}
                onChange={trackExpense}
                required={true}
              />
            </label>
            <input
              className="expense_date"
              name="expense_date"
              type={"date"}
              value={currentExpense.date}
              onChange={trackExpense}
              required={true}
            />
            <div className="form-buttons">
              <button onClick={addExpense}>➕</button>
              <button onClick={clearCurrentExpense}>🗑️</button>
            </div>
          </form>
        </div>
        <table>
          <tbody>
            <tr>
              <th>#</th>
              <th>description</th>
              <th>amount</th>
              <th>date</th>
              <th></th>
            </tr>
            <ListExpenses />
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
