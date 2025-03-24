// import { Link } from "react-router-dom"
// import { Milk, DollarSign, MilkIcon as Cow, TrendingUp, ArrowUp, Receipt, CreditCard, BarChart3 } from "lucide-react"
// import Navbar from "./Navbar"
// import { useLanguage } from "../contexts/LanguageContext"
// import "bootstrap/dist/css/bootstrap.min.css"
// import "../components/css/Dashboard.css"

// function Dashboard() {
//   const { language, translations } = useLanguage()
//   const t = translations[language]

//   const stats = [
//     {
//       name: t.totalCows,
//       value: "24",
//       icon: Cow,
//       change: "+2",
//       changeType: "increase",
//     },
//     {
//       name: t.dailyMilkProduction,
//       value: "486L",
//       icon: Milk,
//       change: "+4.75%",
//       changeType: "increase",
//     },
//     {
//       name: t.monthlyIncome,
//       value: "₹10,25,450",
//       icon: DollarSign,
//       change: "+10.1%",
//       changeType: "increase",
//     },
//     {
//       name: t.profitRatio,
//       value: "24.5%",
//       icon: TrendingUp,
//       change: "+2.3%",
//       changeType: "increase",
//     },
//   ]

//   const navCards = [
//     {
//       title: t.milkProduction,
//       description: t.milkProductionDesc,
//       icon: Milk,
//       path: "/Milk",
//       color: "milk",
//     },
//     {
//       title: t.expenses,
//       description: t.expensesDesc,
//       icon: Receipt,
//       path: "/Expenses",
//       color: "expenses",
//     },
//     {
//       title: t.loans,
//       description: t.loansDesc,
//       icon: CreditCard,
//       path: "/Loans",
//       color: "loans",
//     },
//     {
//       title: t.cows,
//       description: t.cowManagementDesc,
//       icon: Cow,
//       path: "/CowManagement",
//       color: "cows",
//     },
//   ]

//   return (
//     <div className="container mt-4">
//       <Navbar />
//       <div className="dashboard-container">
//         <div className="dashboard-header">
//           <h1 className="text-center mb-4">{t.home}</h1>
//           <div className="dashboard-summary">
//             <div className="stats-grid">
//               {stats.map((item, index) => {
//                 const Icon = item.icon
//                 return (
//                   <div key={index} className="stat-card">
//                     <div className="stat-icon">
//                       <Icon size={24} />
//                     </div>
//                     <div className="stat-title">{item.name}</div>
//                     <div className="stat-value">{item.value}</div>
//                     <div className={`stat-change ${item.changeType}`}>
//                       <ArrowUp size={16} className="me-1" />
//                       {item.change}
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           </div>
//         </div>

//         <div className="dashboard-section mt-5">
//           <h2 className="section-title mb-4">{t.sections}</h2>
//           <div className="nav-cards-grid">
//             {navCards.map((card, index) => {
//               const Icon = card.icon
//               return (
//                 <Link to={card.path} key={index} className={`nav-card ${card.color}`}>
//                   <div className="nav-card-icon">
//                     <Icon size={28} />
//                   </div>
//                   <div className="nav-card-content">
//                     <h3 className="nav-card-title">{card.title}</h3>
//                     <p className="nav-card-description">{card.description}</p>
//                   </div>
//                 </Link>
//               )
//             })}
//           </div>
//         </div>

//         <div className="dashboard-section mt-5">
//           <h2 className="section-title mb-4">{t.performanceMonitoring}</h2>
//           <div className="performance-card">
//             <div className="performance-header">
//               <h3>{t.monthlyMilkProduction}</h3>
//               <div className="performance-actions">
//                 <select className="form-select form-select-sm">
//                   <option>{t.last30Days}</option>
//                   <option>{t.last90Days}</option>
//                   <option>{t.lastYear}</option>
//                 </select>
//               </div>
//             </div>
//             <div className="chart-placeholder">
//               <BarChart3 size={48} className="chart-icon" />
//               <p>{t.chartsComingSoon}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Milk, DollarSign, MilkIcon as Cow, TrendingUp, ArrowUp, Receipt, CreditCard, BarChart3 } from "lucide-react";
import Navbar from "./Navbar";
import { useLanguage } from "../contexts/LanguageContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/css/Dashboard.css";

function Dashboard() {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const [stats, setStats] = useState({
    totalCows: 0,
    dailyMilkProduction: 0,
    monthlyIncome: 0,
    profitRatio: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    const [cowsRes, milkRes, expensesRes] = await Promise.all([
      fetch('http://localhost:5000/api/cows'),
      fetch('http://localhost:5000/api/milk'),
      fetch('http://localhost:5000/api/expenses'),
    ]);
    const [cows, milkRecords, expenses] = await Promise.all([
      cowsRes.json(),
      milkRes.json(),
      expensesRes.json(),
    ]);

    const dailyMilk = milkRecords.reduce((sum, record) => sum + record.quantity, 0);
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const monthlyIncome = dailyMilk * 30 * 50; // Assuming 50 INR per liter
    const profitRatio = totalExpenses ? ((monthlyIncome - totalExpenses) / monthlyIncome * 100) : 0;

    setStats({
      totalCows: cows.length,
      dailyMilkProduction: dailyMilk,
      monthlyIncome,
      profitRatio,
    });
  };

  const navCards = [
    { title: t.milkProduction, description: t.milkProductionDesc, icon: Milk, path: "/Milk", color: "milk" },
    { title: t.expenses, description: t.expensesDesc, icon: Receipt, path: "/Expenses", color: "expenses" },
    { title: t.loans, description: t.loansDesc, icon: CreditCard, path: "/Loans", color: "loans" },
    { title: t.cows, description: t.cowManagementDesc, icon: Cow, path: "/CowManagement", color: "cows" },
  ];

  return (
    <div className="container mt-4">
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="text-center mb-4">{t.home}</h1>
          <div className="dashboard-summary">
            <div className="stats-grid">
              {[
                { name: t.totalCows, value: stats.totalCows, icon: Cow, change: "+2", changeType: "increase" },
                { name: t.dailyMilkProduction, value: `${stats.dailyMilkProduction}L`, icon: Milk, change: "+4.75%", changeType: "increase" },
                { name: t.monthlyIncome, value: `₹${stats.monthlyIncome.toLocaleString('en-IN')}`, icon: DollarSign, change: "+10.1%", changeType: "increase" },
                { name: t.profitRatio, value: `${stats.profitRatio.toFixed(1)}%`, icon: TrendingUp, change: "+2.3%", changeType: "increase" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="stat-card">
                    <div className="stat-icon"><Icon size={24} /></div>
                    <div className="stat-title">{item.name}</div>
                    <div className="stat-value">{item.value}</div>
                    <div className={`stat-change ${item.changeType}`}>
                      <ArrowUp size={16} className="me-1" /> {item.change}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="dashboard-section mt-5">
          <h2 className="section-title mb-4">{t.sections}</h2>
          <div className="nav-cards-grid">
            {navCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link to={card.path} key={index} className={`nav-card ${card.color}`}>
                  <div className="nav-card-icon"><Icon size={28} /></div>
                  <div className="nav-card-content">
                    <h3 className="nav-card-title">{card.title}</h3>
                    <p className="nav-card-description">{card.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="dashboard-section mt-5">
          <h2 className="section-title mb-4">{t.performanceMonitoring}</h2>
          <div className="performance-card">
            <div className="performance-header">
              <h3>{t.monthlyMilkProduction}</h3>
              <div className="performance-actions">
                <select className="form-select form-select-sm">
                  <option>{t.last30Days}</option>
                  <option>{t.last90Days}</option>
                  <option>{t.lastYear}</option>
                </select>
              </div>
            </div>
            <div className="chart-placeholder">
              <BarChart3 size={48} className="chart-icon" />
              <p>{t.chartsComingSoon}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;