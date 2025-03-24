// import { useState } from "react"
// import { Plus } from "lucide-react"
// import Navbar from "./Navbar"
// import { useLanguage } from "../contexts/LanguageContext"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "../components/css/CowManagement.css"

// function CowManagement() {
//   const { language, translations } = useLanguage()
//   const t = translations[language]

//   const [cows, setCows] = useState([])
//   const [newCow, setNewCow] = useState({})

//   const handleAddCow = (e) => {
//     e.preventDefault()
//     if (newCow.name && newCow.breed) {
//       const addedCow = {
//         ...newCow,
//         id: cows.length + 1 // Simple ID generation for demo
//       }
//       setCows([...cows, addedCow])
//       setNewCow({})
//       document.getElementById("closeModal").click()
//     }
//   }

//   const getStatusBadgeClass = (status) => {
//     if (status === t.healthy) return "status-badge healthy"
//     if (status === t.pregnant) return "status-badge pregnant"
//     if (status === t.sick) return "status-badge sick"
//     if (status === t.noMilk) return "status-badge no-milk"
//     return "status-badge"
//   }

//   return (
//     <div className="container mt-4">
//       <Navbar />

//       <div className="cow-management-container">
//         <div className="header-actions">
//           <h1>{t.cowManagementTitle}</h1>
//           <div className="d-flex gap-3">
//             <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCowModal">
//               <Plus size={18} className="me-1" /> {t.addCow}
//             </button>
//           </div>
//         </div>

//         {/* Bootstrap Modal for Adding Cow */}
//         <div className="modal fade" id="addCowModal" tabIndex="-1">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title">{t.addCow}</h5>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={handleAddCow} className="cow-form">
//                   {["name", "breed", "age"].map((field) => (
//                     <div key={field} className="mb-3">
//                       <label className="form-label">{t[field]}</label>
//                       <input
//                         type={field === "age" ? "number" : "text"}
//                         className="form-control"
//                         value={newCow[field] || ""}
//                         onChange={(e) => setNewCow({ ...newCow, [field]: e.target.value })}
//                       />
//                     </div>
//                   ))}
//                   <div className="mb-3">
//                     <label className="form-label">{t.status}</label>
//                     <select
//                       className="form-select"
//                       value={newCow.status || t.healthy}
//                       onChange={(e) => setNewCow({ ...newCow, status: e.target.value })}
//                     >
//                       {[t.healthy, t.pregnant, t.sick, t.noMilk].map((status) => (
//                         <option key={status}>{status}</option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="d-flex justify-content-end gap-2">
//                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">
//                       {t.cancel}
//                     </button>
//                     <button type="submit" className="btn btn-primary">
//                       {t.save}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Cow Table */}
//         <div className="table-responsive">
//           <table className="table table-bordered cow-table">
//             <thead>
//               <tr>
//                 {["id", "name", "breed", "age", "status", "lastMilking"].map((col) => (
//                   <th key={col}>{t[col]}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {cows.map((cow) => (
//                 <tr key={cow.id}>
//                   {["id", "name", "breed", "age"].map((key) => (
//                     <td key={key}>{cow[key]}</td>
//                   ))}
//                   <td>
//                     <span className={getStatusBadgeClass(cow.status)}>{cow.status}</span>
//                   </td>
//                   <td>{cow.lastMilking || "-"}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CowManagement

import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import Navbar from "./Navbar";
import { useLanguage } from "../contexts/LanguageContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/css/CowManagement.css";

function CowManagement() {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const [cows, setCows] = useState([]);
  const [newCow, setNewCow] = useState({});

  useEffect(() => {
    fetchCows();
  }, []);

  const fetchCows = async () => {
    const response = await fetch('http://localhost:5000/api/cows');
    const data = await response.json();
    setCows(data);
  };

  const handleAddCow = async (e) => {
    e.preventDefault();
    if (newCow.name && newCow.breed) {
      const response = await fetch('http://localhost:5000/api/cows', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCow),
      });
      if (response.ok) {
        fetchCows();
        setNewCow({});
        document.getElementById("closeModal").click();
      }
    }
  };

  const getStatusBadgeClass = (status) => {
    if (status === t.healthy) return "status-badge healthy";
    if (status === t.pregnant) return "status-badge pregnant";
    if (status === t.sick) return "status-badge sick";
    if (status === t.noMilk) return "status-badge no-milk";
    return "status-badge";
  };

  return (
    <div className="container mt-4">
      <Navbar />
      <div className="cow-management-container">
        <div className="header-actions">
          <h1>{t.cowManagementTitle}</h1>
          <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addCowModal">
            <Plus size={18} className="me-1" /> {t.addCow}
          </button>
        </div>

        <div className="modal fade" id="addCowModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{t.addCow}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddCow} className="cow-form">
                  {["name", "breed", "age"].map((field) => (
                    <div key={field} className="mb-3">
                      <label className="form-label">{t[field]}</label>
                      <input
                        type={field === "age" ? "number" : "text"}
                        className="form-control"
                        value={newCow[field] || ""}
                        onChange={(e) => setNewCow({ ...newCow, [field]: e.target.value })}
                      />
                    </div>
                  ))}
                  <div className="mb-3">
                    <label className="form-label">{t.status}</label>
                    <select
                      className="form-select"
                      value={newCow.status || t.healthy}
                      onChange={(e) => setNewCow({ ...newCow, status: e.target.value })}
                    >
                      {[t.healthy, t.pregnant, t.sick, t.noMilk].map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                  <div className="d-flex justify-content-end gap-2">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" id="closeModal">
                      {t.cancel}
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {t.save}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered cow-table">
            <thead>
              <tr>
                {["id", "name", "breed", "age", "status"].map((col) => (
                  <th key={col}>{t[col]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cows.map((cow) => (
                <tr key={cow._id}>
                  <td>{cow._id}</td>
                  <td>{cow.name}</td>
                  <td>{cow.breed}</td>
                  <td>{cow.age}</td>
                  <td><span className={getStatusBadgeClass(cow.status)}>{cow.status}</span></td>
                  {/* <td>{cow.lastMilking ? new Date(cow.lastMilking).toLocaleDateString() : "-"}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CowManagement;