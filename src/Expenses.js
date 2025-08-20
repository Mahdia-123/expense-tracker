import React, { useEffect, useState } from "react";
import "./Expenses.css";

export default function Expenses() {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [expense, setExpense] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });
  function addExpense() {
    if (!description || !amount) return;
    const newExpense = {
      description,
      amount: Number(amount),
      category: category,
    };
    setExpense([...expense, newExpense]);
    setDescription("");
    setAmount("");
  }
  function deleteExpense(index) {
    const updated = expense.filter((_, i) => i !== index);
    setExpense(updated);
  }
  const total = expense.reduce((sum, e) => sum + e.amount, 0);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expense));
  }, [expense]);
  return (
    <div className="container">
      <div className="expenses">
        <div className="inputs">
          <input
            type="text"
            placeholder="Expenses Description.."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            value={amount}
            placeholder="amount"
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
            <option value="Cosmatics">Cosmatics 💄</option>
          </select>
          <button className="btn" onClick={addExpense}>
            Add{" "}
          </button>
        </div>
      </div>
      <h3 style={{ display: total > 0 ? "block" : "none" }}>Expenses</h3>
      <section>
        <ol>
          {expense.map(function (e, index) {
            return (
              <li key={index}>
                <span>{index + 1}.</span>
                <div>
                  <strong>Description:</strong> {e.description}
                </div>{" "}
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
            );
          })}
        </ol>
      </section>
      <p className="p" style={{ display: total > 0 ? "block" : "none" }}>
        <strong>Total expenses: </strong> {total} Af
      </p>
    </div>
  );
}
