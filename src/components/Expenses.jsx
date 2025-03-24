// import { useState } from "react"
// import { Plus, Printer } from "lucide-react"
// import Navbar from "./Navbar"
// import { useLanguage } from "../contexts/LanguageContext"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "../components/css/Expenses.css"

// const Expenses = () => {
//   const { language, translations } = useLanguage()
//   const t = translations[language]

//   const initialExpenses = [
//     { id: "1", date: "2024-03-10", category: t.feed, amount: 85000, description: "மாத தீவன வழங்கல்" },
//     { id: "2", date: "2024-03-09", category: t.medical, amount: 25000, description: "வழக்கமான பரிசோதனை" },
//   ]

//   const [expenses, setExpenses] = useState(initialExpenses)
//   const [showAddForm, setShowAddForm] = useState(false)
//   const [newExpense, setNewExpense] = useState({})

//   const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

//   const formatIndianCurrency = (amount) =>
//     new Intl.NumberFormat("ta-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount)

//   const handleAddExpense = (e) => {
//     e.preventDefault()
//     if (newExpense.amount && newExpense.category) {
//       setExpenses([
//         ...expenses,
//         {
//           ...newExpense,
//           id: (expenses.length + 1).toString(),
//           date: new Date().toISOString().split("T")[0],
//         },
//       ])
//       setShowAddForm(false)
//       setNewExpense({})
//     }
//   }

//   const handlePrint = () => {
//     window.print()
//   }

//   return (
//     <div className="container mt-4">
//       <Navbar />
//       <div className="expenses-container">
//         <div className="header-actions">
//           <h1>{t.expensesTitle}</h1>
//           <div className="d-flex gap-3">
//             <button onClick={handlePrint} className="btn btn-success d-flex align-items-center">
//               <Printer size={18} className="me-2" />
//               {t.print}
//             </button>
//             <button onClick={() => setShowAddForm(true)} className="btn btn-primary d-flex align-items-center">
//               <Plus size={18} className="me-2" />
//               {t.addExpense}
//             </button>
//           </div>
//         </div>

//         <div className="total-expenses-card">
//           <h5>{t.totalExpenses}</h5>
//           <h4>{formatIndianCurrency(totalExpenses)}</h4>
//         </div>

//         {showAddForm && (
//           <div className="card p-4 mb-4">
//             <h5 className="mb-3">{t.addExpense}</h5>
//             <form onSubmit={handleAddExpense} className="expense-form row g-3">
//               <div className="col-md-6">
//                 <label className="form-label">{t.category}</label>
//                 <select
//                   className="form-select"
//                   value={newExpense.category || ""}
//                   onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//                 >
//                   <option value="">{t.selectCategory}</option>
//                   <option>{t.feed}</option>
//                   <option>{t.medical}</option>
//                   <option>{t.equipment}</option>
//                   <option>{t.labor}</option>
//                   <option>{t.utilities}</option>
//                   <option>{t.other}</option>
//                 </select>
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">{t.amount}</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   value={newExpense.amount || ""}
//                   onChange={(e) => setNewExpense({ ...newExpense, amount: Number.parseInt(e.target.value) })}
//                 />
//               </div>
//               <div className="col-12">
//                 <label className="form-label">{t.description}</label>
//                 <textarea
//                   className="form-control"
//                   rows="3"
//                   value={newExpense.description || ""}
//                   onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
//                 ></textarea>
//               </div>
//               <div className="col-12 d-flex justify-content-end gap-2">
//                 <button type="button" className="btn btn-outline-secondary" onClick={() => setShowAddForm(false)}>
//                   {t.cancel}
//                 </button>
//                 <button type="submit" className="btn btn-primary">
//                   {t.save}
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         <div className="table-responsive">
//           <table className="table table-bordered expense-table">
//             <thead>
//               <tr>
//                 <th>{t.date}</th>
//                 <th>{t.category}</th>
//                 <th>{t.amount}</th>
//                 <th>{t.description}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {expenses.map((expense) => (
//                 <tr key={expense.id}>
//                   <td>{expense.date}</td>
//                   <td>{expense.category}</td>
//                   <td className="expense-amount">{formatIndianCurrency(expense.amount)}</td>
//                   <td>{expense.description}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Expenses

import { useState, useEffect } from "react";
import { Plus, Printer } from "lucide-react";
import Navbar from "./Navbar";
import { useLanguage } from "../contexts/LanguageContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/css/Expenses.css";

const Expenses = () => {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const [expenses, setExpenses] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({});

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const response = await fetch('http://localhost:5000/api/expenses');
    const data = await response.json();
    setExpenses(data);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const formatIndianCurrency = (amount) =>
    new Intl.NumberFormat("ta-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(amount);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (newExpense.amount && newExpense.category) {
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newExpense,
          date: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        fetchExpenses();
        setShowAddForm(false);
        setNewExpense({});
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <div className="expenses-container">
        <div className="header-actions">
          <h1>{t.expensesTitle}</h1>
          <div className="d-flex gap-3">
            <button onClick={handlePrint} className="btn btn-success d-flex align-items-center">
              <Printer size={18} className="me-2" />
              {t.print}
            </button>
            <button onClick={() => setShowAddForm(true)} className="btn btn-primary d-flex align-items-center">
              <Plus size={18} className="me-2" />
              {t.addExpense}
            </button>
          </div>
        </div>

        <div className="total-expenses-card">
          <h5>{t.totalExpenses}</h5>
          <h4>{formatIndianCurrency(totalExpenses)}</h4>
        </div>

        {showAddForm && (
          <div className="card p-4 mb-4">
            <h5 className="mb-3">{t.addExpense}</h5>
            <form onSubmit={handleAddExpense} className="expense-form row g-3">
              <div className="col-md-6">
                <label className="form-label">{t.category}</label>
                <select
                  className="form-select"
                  value={newExpense.category || ""}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                >
                  <option value="">{t.selectCategory}</option>
                  <option>{t.feed}</option>
                  <option>{t.medical}</option>
                  <option>{t.equipment}</option>
                  <option>{t.labor}</option>
                  <option>{t.utilities}</option>
                  <option>{t.other}</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">{t.amount}</label>
                <input
                  type="number"
                  className="form-control"
                  value={newExpense.amount || ""}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="col-12">
                <label className="form-label">{t.description}</label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={newExpense.description || ""}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                ></textarea>
              </div>
              <div className="col-12 d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-secondary" onClick={() => setShowAddForm(false)}>
                  {t.cancel}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t.save}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-bordered expense-table">
            <thead>
              <tr>
                <th>{t.date}</th>
                <th>{t.category}</th>
                <th>{t.amount}</th>
                <th>{t.description}</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>{expense.category}</td>
                  <td className="expense-amount">{formatIndianCurrency(expense.amount)}</td>
                  <td>{expense.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expenses;