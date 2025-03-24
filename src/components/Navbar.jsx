import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Globe } from "lucide-react"
import { useLanguage } from "../contexts/LanguageContext"
import "../components/css/Navbar.css"

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { language, toggleLanguage, translations } = useLanguage()

  const t = translations[language]

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  return (
    <div className="container">
      <header className="navbar">
        <div className="profile-container">
          <Link to="/" className="brand-link">
            <h1>{t.dairy}</h1>
          </Link>
        </div>
        <button className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className={menuOpen ? "open" : ""}>
          <Link to="/" className={isActive("/")} onClick={() => setMenuOpen(false)}>
            {t.dashboard}
          </Link>
          <Link to="/Milk" className={isActive("/Milk")} onClick={() => setMenuOpen(false)}>
            {t.milkProduction}
          </Link>
          <Link to="/Expenses" className={isActive("/Expenses")} onClick={() => setMenuOpen(false)}>
            {t.expenses}
          </Link>
          {/* <Link to="/Loans" className={isActive("/Loans")} onClick={() => setMenuOpen(false)}>
            {t.loans}
          </Link> */}
          <Link to="/CowManagement" className={isActive("/CowManagement")} onClick={() => setMenuOpen(false)}>
            {t.cows}
          </Link>
          <button className="language-button" onClick={toggleLanguage}>
            <Globe size={16} className="me-2" />
            {language === "english" ? "தமிழ்" : "English"}
          </button>
        </nav>
      </header>
    </div>
  )
}

export default Navbar

