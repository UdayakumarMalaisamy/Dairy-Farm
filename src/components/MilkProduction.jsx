// import { useState } from "react"
// import { Plus, TrendingUp } from "lucide-react"
// import Navbar from "./Navbar"
// import { useLanguage } from "../contexts/LanguageContext"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "../components/css/MilkProduction.css"

// function MilkProduction() {
//   const { language, translations } = useLanguage()
//   const t = translations[language]

//   const [records, setRecords] = useState([])
//   const [showAddForm, setShowAddForm] = useState(false)
//   const [newRecord, setNewRecord] = useState({})

//   const handleAddRecord = (e) => {
//     e.preventDefault()
//     if (newRecord.quantity && newRecord.cowId) {
//       const addedRecord = {
//         ...newRecord,
//         id: records.length + 1 // Simple ID generation for demo
//       }
//       setRecords([...records, addedRecord])
//       setShowAddForm(false)
//       setNewRecord({})
//     }
//   }

//   const totalProduction = records.reduce((total, record) => total + record.quantity, 0)
//   const averageProduction = records.length ? totalProduction / records.length : 0

//   const groupedRecords = records.reduce((acc, record) => {
//     const { cowId, quantity, shift } = record
//     if (!acc[cowId]) {
//       acc[cowId] = { morning: 0, evening: 0, total: 0 }
//     }
//     if (shift === t.morning) {
//       acc[cowId].morning += quantity
//     } else if (shift === t.evening) {
//       acc[cowId].evening += quantity
//     }
//     acc[cowId].total += quantity
//     return acc
//   }, {})

//   return (
//     <div className="container mt-4">
//       <Navbar />
//       <div className="milk-production-container">
//         <div className="header-actions">
//           <h1>{t.milkProduction}</h1>
//           <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
//             <Plus size={18} className="me-1" /> {t.addRecord}
//           </button>
//         </div>

//         <div className="stats-cards">
//           <div className="stat-card">
//             <div className="d-flex align-items-center">
//               <div className="stat-icon">
//                 <TrendingUp size={24} />
//               </div>
//               <div className="stat-content">
//                 <h6 className="mb-1">{t.totalProduction}</h6>
//                 <h4>{totalProduction}L</h4>
//               </div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="d-flex align-items-center">
//               <div className="stat-icon">
//                 <TrendingUp size={24} />
//               </div>
//               <div className="stat-content">
//                 <h6 className="mb-1">{t.averageProduction}</h6>
//                 <h4>{averageProduction.toFixed(2)}L</h4>
//               </div>
//             </div>
//           </div>
//         </div>

//         {showAddForm && (
//           <div className="card p-4 mb-4">
//             <h5 className="mb-3">{t.newRecord}</h5>
//             <form onSubmit={handleAddRecord} className="milk-form row g-3">
//               <div className="col-md-6">
//                 <label className="form-label">{t.cowId}</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   value={newRecord.cowId || ""}
//                   onChange={(e) => setNewRecord({ ...newRecord, cowId: e.target.value })}
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">{t.quantity}</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   step="0.1"
//                   value={newRecord.quantity || ""}
//                   onChange={(e) => setNewRecord({ ...newRecord, quantity: Number.parseFloat(e.target.value) })}
//                 />
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">{t.quality}</label>
//                 <select
//                   className="form-select"
//                   value={newRecord.quality || t.qualityA}
//                   onChange={(e) => setNewRecord({ ...newRecord, quality: e.target.value })}
//                 >
//                   <option>{t.qualityA}</option>
//                   <option>{t.qualityB}</option>
//                   <option>{t.qualityC}</option>
//                 </select>
//               </div>
//               <div className="col-md-6">
//                 <label className="form-label">{t.shift}</label>
//                 <select
//                   className="form-select"
//                   value={newRecord.shift || t.morning}
//                   onChange={(e) => setNewRecord({ ...newRecord, shift: e.target.value })}
//                 >
//                   <option>{t.morning}</option>
//                   <option>{t.evening}</option>
//                 </select>
//               </div>
//               <div className="col-12 d-flex justify-content-end gap-2">
//                 <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
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
//           <table className="table table-bordered milk-table">
//             <thead>
//               <tr>
//                 <th>{t.cowId}</th>
//                 <th>{t.morningProduction}</th>
//                 <th>{t.eveningProduction}</th>
//                 <th>{t.totalProductionTable}</th>
//               </tr>
//             </thead>
//             <tbody>
//               {Object.entries(groupedRecords).map(([cowId, data]) => (
//                 <tr key={cowId}>
//                   <td>{cowId}</td>
//                   <td>{data.morning}L</td>
//                   <td>{data.evening}L</td>
//                   <td>{data.total}L</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MilkProduction

import { useState, useEffect } from "react";
import { Plus, TrendingUp } from "lucide-react";
import Navbar from "./Navbar";
import { useLanguage } from "../contexts/LanguageContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/css/MilkProduction.css";

function MilkProduction() {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const [records, setRecords] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({});

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const response = await fetch('http://localhost:5000/api/milk');
    const data = await response.json();
    setRecords(data);
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    if (newRecord.quantity && newRecord.cowId) {
      const response = await fetch('http://localhost:5000/api/milk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      });
      if (response.ok) {
        fetchRecords();
        setShowAddForm(false);
        setNewRecord({});
      }
    }
  };

  const totalProduction = records.reduce((total, record) => total + record.quantity, 0);
  const averageProduction = records.length ? totalProduction / records.length : 0;

  const groupedRecords = records.reduce((acc, record) => {
    const { cowId, quantity, shift } = record;
    const cowName = record.cowId?.name || cowId;
    if (!acc[cowName]) {
      acc[cowName] = { morning: 0, evening: 0, total: 0 };
    }
    if (shift === t.morning) {
      acc[cowName].morning += quantity;
    } else if (shift === t.evening) {
      acc[cowName].evening += quantity;
    }
    acc[cowName].total += quantity;
    return acc;
  }, {});

  return (
    <div className="container mt-4">
      <Navbar />
      <div className="milk-production-container">
        <div className="header-actions">
          <h1>{t.milkProduction}</h1>
          <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
            <Plus size={18} className="me-1" /> {t.addRecord}
          </button>
        </div>

        <div className="stats-cards">
          <div className="stat-card">
            <div className="d-flex align-items-center">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <h6 className="mb-1">{t.totalProduction}</h6>
                <h4>{totalProduction}L</h4>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="d-flex align-items-center">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <h6 className="mb-1">{t.averageProduction}</h6>
                <h4>{averageProduction.toFixed(2)}L</h4>
              </div>
            </div>
          </div>
        </div>

        {showAddForm && (
          <div className="card p-4 mb-4">
            <h5 className="mb-3">{t.newRecord}</h5>
            <form onSubmit={handleAddRecord} className="milk-form row g-3">
              <div className="col-md-6">
                <label className="form-label">{t.cowId}</label>
                <input
                  type="text"
                  className="form-control"
                  value={newRecord.cowId || ""}
                  onChange={(e) => setNewRecord({ ...newRecord, cowId: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t.quantity}</label>
                <input
                  type="number"
                  className="form-control"
                  step="0.1"
                  value={newRecord.quantity || ""}
                  onChange={(e) => setNewRecord({ ...newRecord, quantity: Number.parseFloat(e.target.value) })}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">{t.quality}</label>
                <select
                  className="form-select"
                  value={newRecord.quality || t.qualityA}
                  onChange={(e) => setNewRecord({ ...newRecord, quality: e.target.value })}
                >
                  <option>{t.qualityA}</option>
                  <option>{t.qualityB}</option>
                  <option>{t.qualityC}</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">{t.shift}</label>
                <select
                  className="form-select"
                  value={newRecord.shift || t.morning}
                  onChange={(e) => setNewRecord({ ...newRecord, shift: e.target.value })}
                >
                  <option>{t.morning}</option>
                  <option>{t.evening}</option>
                </select>
              </div>
              <div className="col-12 d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddForm(false)}>
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
          <table className="table table-bordered milk-table">
            <thead>
              <tr>
                <th>{t.cowId}</th>
                <th>{t.morningProduction}</th>
                <th>{t.eveningProduction}</th>
                <th>{t.totalProductionTable}</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedRecords).map(([cowId, data]) => (
                <tr key={cowId}>
                  <td>{cowId}</td>
                  <td>{data.morning}L</td>
                  <td>{data.evening}L</td>
                  <td>{data.total}L</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MilkProduction;