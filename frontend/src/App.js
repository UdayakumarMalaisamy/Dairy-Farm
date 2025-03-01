import './App.css';
import Dashboard from './components/Dashboard';
import MilkProduction from './components/MilkProduction';
import Expenses from './components/Expenses';
import Loans from './components/loans';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CowManagement from './components/CowManagement';
function App() {
  
    return (
      <Router>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/Milk" element={<MilkProduction />} />
            <Route path="/Expenses" element={<Expenses/>} />
            <Route path="/Loans" element={<Loans />} />
            <Route path="/CowManagement" element={<CowManagement />} />
         
          </Routes>
        </div>
      </Router>
    
  );
}

export default App;
