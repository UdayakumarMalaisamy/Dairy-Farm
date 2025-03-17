import { useState, useEffect } from "react"
import { Plus, DollarSign } from "lucide-react"
import Navbar from "./Navbar"
import { useLanguage } from "../contexts/LanguageContext"
import "bootstrap/dist/css/bootstrap.min.css"
import "../components/css/Loans.css"

function Loans() {
  const { language, translations } = useLanguage()
  const t = translations[language]

  const [loans, setLoans] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLoan, setNewLoan] = useState({})

  useEffect(() => {
    fetch("http://localhost:5000/api/loans")
      .then((response) => response.json())
      .then((data) => setLoans(data))
      .catch((error) => console.error("Error fetching loans:", error))
  }, [])

  const handleAddLoan = (e) => {
    e.preventDefault()
    if (newLoan.amount && newLoan.purpose && newLoan.dueDate) {
      fetch("http://localhost:5000/api/loans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLoan),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoans([...loans, data])
          setShowAddForm(false)
          setNewLoan({})
        })
        .catch((error) => console.error("Error adding loan:", error))
    }
  }

  const formatIndianCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount)

  const totalActiveLoans = loans.reduce((total, loan) => (loan.status === t.active ? total + loan.amount : total), 0)

  return (
    <div className="container mt-4">
      <Navbar />
      <div className="loans-container">
        <div className="header-actions">
          <h1>{t.loansTitle}</h1>
          <button onClick={() => setShowAddForm(true)} className="btn btn-primary d-flex align-items-center">
            <Plus size={18} className="me-2" /> {t.addLoan}
          </button>
        </div>

        <div className="total-loans-card">
          <div className="d-flex align-items-center">
            <div className="loan-icon">
              <DollarSign size={24} />
            </div>
            <div className="loan-content">
              <h6>{t.totalActiveLoans}</h6>
              <h4>{formatIndianCurrency(totalActiveLoans)}</h4>
            </div>
          </div>
        </div>

        {showAddForm && (
          <div className="card p-4 mb-4">
            <h5 className="mb-3">{t.addLoan}</h5>
            <form onSubmit={handleAddLoan} className="loan-form row g-3">
              <div className="col-md-6">
                <label className="form-label">{t.loanAmount}</label>
                <input
                  type="number"
                  className="form-control"
                  value={newLoan.amount || ""}
                  onChange={(e) => setNewLoan({ ...newLoan, amount: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t.interestRate}</label>
                <input
                  type="number"
                  className="form-control"
                  value={newLoan.interestRate || ""}
                  onChange={(e) => setNewLoan({ ...newLoan, interestRate: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t.purpose}</label>
                <input
                  type="text"
                  className="form-control"
                  value={newLoan.purpose || ""}
                  onChange={(e) => setNewLoan({ ...newLoan, purpose: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t.dueDate}</label>
                <input
                  type="date"
                  className="form-control"
                  value={newLoan.dueDate || ""}
                  onChange={(e) => setNewLoan({ ...newLoan, dueDate: e.target.value })}
                />
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
          <table className="table table-bordered loan-table">
            <thead>
              <tr>
                <th>{t.loanId}</th>
                <th>{t.loanAmount}</th>
                <th>{t.interestRate}</th>
                <th>{t.purpose}</th>
                <th>{t.status}</th>
                <th>{t.dueDate}</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td className="loan-amount">{formatIndianCurrency(loan.amount)}</td>
                  <td>{loan.interestRate}%</td>
                  <td>{loan.purpose}</td>
                  <td>
                    <span
                      className={`loan-status ${loan.status === t.active ? "active" : loan.status === t.paid ? "paid" : "overdue"}`}
                    >
                      {loan.status}
                    </span>
                  </td>
                  <td>{loan.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Loans

