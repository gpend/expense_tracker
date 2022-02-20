import './App.css';

function App() {
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
            <input className='expense-description' name='expense-description' />
            <input className='expense-amount' name='expense-amount' />
            <input className='expense-date' name='expense-date' type={'date'} />
            <button>➕</button>
            <button>🗑️</button>      
          </form>
        </div>
      </main>
    </div>
  );
}

export default App;
