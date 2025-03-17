"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Create the language context
const LanguageContext = createContext()

// Create a provider component
export const LanguageProvider = ({ children }) => {
  // Try to get the language from localStorage, default to 'tamil'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language")
    return savedLanguage || "tamil"
  })

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem("language", language)
  }, [language])

  // Function to toggle language
  const toggleLanguage = () => {
    setLanguage(language === "tamil" ? "english" : "tamil")
  }

  // Translations for all components
  const translations = {
    english: {
      // Navbar
      dashboard: "Dashboard",
      milkProduction: "Milk Production",
      expenses: "Expenses",
      loans: "Loans",
      cows: "Cow Management",
      dairy: "MSD Dairy Farm",

      // Dashboard
      home: "Dashboard",
      totalCows: "Total Cows",
      dailyMilkProduction: "Daily Milk Production",
      monthlyIncome: "Monthly Income",
      profitRatio: "Profit Ratio",
      sections: "Sections",
      milkProductionDesc: "Milk production records and reports",
      expensesDesc: "Expense tracking and analysis",
      loansDesc: "Loans and financial management",
      cowManagementDesc: "Cow details and status",
      performanceMonitoring: "Performance Monitoring",
      monthlyMilkProduction: "Monthly Milk Production",
      last30Days: "Last 30 Days",
      last90Days: "Last 90 Days",
      lastYear: "Last Year",
      chartsComingSoon: "Charts and reports coming soon",

      // Milk Production
      addRecord: "Add Record",
      totalProduction: "Total Production",
      averageProduction: "Average Production",
      newRecord: "Add New Record",
      cowId: "Cow ID",
      quantity: "Quantity (L)",
      quality: "Quality",
      qualityA: "Quality A",
      qualityB: "Quality B",
      qualityC: "Quality C",
      shift: "Shift",
      morning: "Morning",
      evening: "Evening",
      save: "Save",
      cancel: "Cancel",
      morningProduction: "Morning Production (L)",
      eveningProduction: "Evening Production (L)",
      totalProductionTable: "Total Production (L)",

      // Expenses
      expensesTitle: "Expenses",
      addExpense: "Add Expense",
      print: "Print",
      totalExpenses: "Total Expenses",
      category: "Category",
      selectCategory: "Select Category",
      feed: "Feed",
      medical: "Medical",
      equipment: "Equipment",
      labor: "Labor",
      utilities: "Utilities",
      other: "Other",
      amount: "Amount (₹)",
      description: "Description",
      date: "Date",

      // Loans
      loansTitle: "Loans",
      addLoan: "Add Loan",
      totalActiveLoans: "Total Active Loans",
      loanAmount: "Amount (₹)",
      interestRate: "Interest Rate (%)",
      purpose: "Purpose",
      dueDate: "Due Date",
      loanId: "Loan ID",
      status: "Status",
      active: "Active",
      paid: "Paid",
      overdue: "Overdue",

      // Cow Management
      cowManagementTitle: "Cow Management",
      addCow: "Add Cow",
      name: "Name",
      breed: "Breed",
      age: "Age",
      healthy: "Healthy",
      pregnant: "Pregnant",
      sick: "Sick",
      noMilk: "No Milk",
      id: "ID",
      lastMilking: "Last Milking Date",
    },
    tamil: {
      // Navbar
      dashboard: "முகப்பு",
      milkProduction: "பால் உற்பத்தி",
      expenses: "செலவுகள்",
      loans: "கடன்கள்",
      cows: "மாடுகள்",
      dairy: "பால் பண்ணை",

      // Dashboard
      home: "முகப்பு",
      totalCows: "மொத்த மாடுகள்",
      dailyMilkProduction: "தினசரி பால் உற்பத்தி",
      monthlyIncome: "மாத வருமானம்",
      profitRatio: "லாப விகிதம்",
      sections: "பிரிவுகள்",
      milkProductionDesc: "பால் உற்பத்தி பதிவுகள் மற்றும் அறிக்கைகள்",
      expensesDesc: "செலவுகள் கண்காணிப்பு மற்றும் பகுப்பாய்வு",
      loansDesc: "கடன்கள் மற்றும் நிதி மேலாண்மை",
      cowManagementDesc: "மாடுகளின் விவரங்கள் மற்றும் நிலை",
      performanceMonitoring: "செயல்திறன் கண்காணிப்பு",
      monthlyMilkProduction: "மாதாந்திர பால் உற்பத்தி",
      last30Days: "கடந்த 30 நாட்கள்",
      last90Days: "கடந்த 90 நாட்கள்",
      lastYear: "கடந்த ஆண்டு",
      chartsComingSoon: "விரைவில் வரைபடங்கள் மற்றும் அறிக்கைகள்",

      // Milk Production
      addRecord: "பதிவு சேர்க்க",
      totalProduction: "மொத்த உற்பத்தி",
      averageProduction: "சராசரி உற்பத்தி",
      newRecord: "புதிய பதிவு சேர்க்க",
      cowId: "மாடு எண்",
      quantity: "அளவு (L)",
      quality: "தரம்",
      qualityA: "தரம் A",
      qualityB: "தரம் B",
      qualityC: "தரம் C",
      shift: "நேரம்",
      morning: "காலை",
      evening: "மாலை",
      save: "சேமி",
      cancel: "ரத்து செய்",
      morningProduction: "காலை உற்பத்தி (L)",
      eveningProduction: "மாலை உற்பத்தி (L)",
      totalProductionTable: "மொத்த உற்பத்தி (L)",

      // Expenses
      expensesTitle: "செலவுகள்",
      addExpense: "செலவு சேர்க்க",
      print: "அச்சிடு",
      totalExpenses: "மொத்த செலவுகள்",
      category: "வகை",
      selectCategory: "வகையைத் தேர்ந்தெடுக்கவும்",
      feed: "தீவனம்",
      medical: "மருத்துவம்",
      equipment: "உபகரணங்கள்",
      labor: "வேலையாட்கள்",
      utilities: "பயன்பாடுகள்",
      other: "மற்றவை",
      amount: "தொகை (₹)",
      description: "விவரம்",
      date: "தேதி",

      // Loans
      loansTitle: "கடன்கள்",
      addLoan: "கடன் சேர்க்க",
      totalActiveLoans: "மொத்த செயலில் உள்ள கடன்கள்",
      loanAmount: "தொகை (₹)",
      interestRate: "வட்டி விகிதம் (%)",
      purpose: "நோக்கம்",
      dueDate: "திருப்பிச் செலுத்தும் தேதி",
      loanId: "கடன் எண்",
      status: "நிலை",
      active: "செயலில்",
      paid: "செலுத்தப்பட்டது",
      overdue: "தாமதமானது",

      // Cow Management
      cowManagementTitle: "மாடு மேலாண்மை",
      addCow: "மாடு சேர்க்க",
      name: "பெயர்",
      breed: "இனம்",
      age: "வயது",
      healthy: "ஆரோக்கியமானது",
      pregnant: "கர்ப்பிணி",
      sick: "நோயுற்றது",
      noMilk: "பால் இல்லை",
      id: "அடையாள எண்",
      lastMilking: "கடைசி பால் கறந்த நாள்",
    },
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>{children}</LanguageContext.Provider>
  )
}

// Custom hook to use the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

