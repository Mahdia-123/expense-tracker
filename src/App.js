import "./App.css";
import Expenses from "./Expenses";
function App() {
  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <Expenses />

      <footer>
        {" "}
        <p>
          This page was coded by
          {"  "}
          <a href="https://github.com/Mahdia-123" rel="noreferrer">
            {" "}
            Mahdia Khamoosh{" "}
          </a>
          and is{" "}
          <a
            href="https://github.com/Mahdia-123/expense-tracker"
            rel="noreferrer"
          >
            Open-sourced{" "}
          </a>
          and hosted on{" "}
          <a
            href="https://modern-expense-tracker-app.netlify.app/"
            rel="noreferrer"
          >
            Netlify
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
