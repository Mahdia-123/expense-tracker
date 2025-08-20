import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import "./Expenses.css";

export default function Expenses() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [loading, setLoading] = useState(false);
  const [expense, setExpense] = useState(
    () => JSON.parse(localStorage.getItem("expenses")) || []
  );

  function addExpense() {
    if (!description || !amount) return;

    const newExpense = {
      description,
      amount: Number(amount),
      category,
    };

    setLoading(true);

    setTimeout(() => {
      const updated = [...expense, newExpense];
      setExpense(updated);
      localStorage.setItem("expenses", JSON.stringify(updated));
      setDescription("");
      setAmount("");
      setLoading(false);
    }, 2000);
  }

  function deleteExpense(index) {
    const updated = expense.filter((_, i) => i !== index);
    setExpense(updated);
    localStorage.setItem("expenses", JSON.stringify(updated));
  }

  const total = expense.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container">
      <div className="expenses">
        <div className="inputs">
          <input
            type="text"
            placeholder="Expense Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Food">Food 🍔</option>
            <option value="Transport">Transport 🚗</option>
            <option value="Shopping">Shopping 🛍</option>
            <option value="Home Rent">Home 🏡</option>
            <option value="Entertainment">Entertainment 🎬</option>
            <option value="Health">Health 💊</option>
            <option value="Education">Education 📚</option>
            <option value="Savings">Savings 💰</option>
            <option value="Cosmetics">Cosmetics 💄</option>
            <option value="Vacation">Vacation ✈️</option>
            <option value="Repairs">Repairs 🛠</option>
          </select>
          <button className="btn" onClick={addExpense}>
            Add
          </button>
        </div>
      </div>

      {loading && (
        <div className="spinner">
          <RotatingLines
            visible={true}
            height="80"
            width="80"
            color="#93b554"
            strokeWidth="5"
            animationDuration="0.90"
            ariaLabel="loading"
          />
        </div>
      )}

      {!loading && expense.length > 0 && (
        <section>
          <h3>Expenses</h3>
          <ol>
            {expense.map((e, index) => (
              <li key={index}>
                <span>{index + 1}.</span>
                <div>
                  <strong>Description:</strong> {e.description}
                </div>
                <div>
                  <strong>Amount:</strong> {e.amount} Af
                </div>
                <div>
                  <strong>Category:</strong> {e.category}
                </div>
                <button
                  className="btn-delete"
                  onClick={() => deleteExpense(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ol>
          <p className="p">
            <strong>Total expenses: </strong> {total} Af
          </p>
        </section>
      )}
    </div>
  );
}
