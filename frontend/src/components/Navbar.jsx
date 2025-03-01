import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("english"); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const translations = {
    english: {
      dashboard: "Dashboard",
      milkProduction: "MilkProduction",
      expenses: "Expenses",
      loans: "Loans",
      cows: "Cows",
      dairy: "DairyFarm",
    },
    tamil: {
      dashboard: "டாஷ்போர்ட்",
      milkProduction: "பால் உற்பத்தி",
      expenses: "செலவுகள்",
      loans: "கடன்கள்",
      cows: "மாடுகள்",
      dairy: "பால் பண்ணை",
    },
  };

  const t = translations[language];

  return (
    <div className="container">
      <header className="navbar">
        <div className="profile-container">
          <h1>{t.dairy}</h1>
        </div>
        <button className="menu-icon" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <nav className={menuOpen ? "open" : ""}>
          <Link to="/" onClick={() => setMenuOpen(false)}>{t.dashboard}</Link>
          <Link to="/Milk" onClick={() => setMenuOpen(false)}>{t.milkProduction}</Link>
          <Link to="/Expenses" onClick={() => setMenuOpen(false)}>{t.expenses}</Link>
          <Link to="/Loans" onClick={() => setMenuOpen(false)}>{t.loans}</Link>
          <Link to="/CowManagement" onClick={() => setMenuOpen(false)}>{t.cows}</Link>
          <button
          className="language-button"
          onClick={() =>
            setLanguage(language === "english" ? "tamil" : "english")
          }
        >
          {language === "english" ? "தமிழ்" : "English"}
        </button>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
