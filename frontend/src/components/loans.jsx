// import React, { useState } from 'react';
// import { Plus, DollarSign } from 'lucide-react';
// import Navbar from './Navbar';
// import './Loans.css';


// const initialLoans = [
//   {
//     id: '1',
//     date: '2024-01-15',
//     amount: 2500000,
//     purpose: 'உபகரணங்கள் வாங்குதல்',
//     interestRate: 5.5,
//     status: 'செயலில்',
//     dueDate: '2025-01-15',
//   },
//   {
//     id: '2',
//     date: '2023-08-20',
//     amount: 1500000,
//     purpose: 'தீவன கையிருப்பு',
//     interestRate: 4.75,
//     status: 'செலுத்தப்பட்டது',
//     dueDate: '2024-08-20',
//   },
// ];

// function Loans() {
//   const [loans, setLoans] = useState(initialLoans);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newLoan, setNewLoan] = useState({});

//   const totalActiveLoans = loans
//     .filter((loan) => loan.status === 'செயலில்')
//     .reduce((sum, loan) => sum + loan.amount, 0);

//   const formatIndianCurrency = (amount) => {
//     return new Intl.NumberFormat('ta-IN', {
//       style: 'currency',
//       currency: 'INR',
//       maximumFractionDigits: 0,
//     }).format(amount);
//   };

//   const handleAddLoan = (e) => {
//     e.preventDefault();
//     if (newLoan.amount && newLoan.purpose && newLoan.dueDate) {
//       setLoans([
//         ...loans,
//         {
//           ...newLoan,
//           id: (loans.length + 1).toString(),
//           date: new Date().toISOString().split('T')[0],
//           status: 'செயலில்',
//         },
//       ]);
//       setShowAddForm(false);
//       setNewLoan({});
//     }
//   };

//   return (
//     <div>
//         <Navbar/>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">கடன்கள்</h1>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           கடன் சேர்க்க
//         </button>
//       </div>

//       <div className="mb-8">
//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="p-5">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <DollarSign className="h-6 w-6 text-gray-400" />
//               </div>
//               <div className="ml-5 w-0 flex-1">
//                 <dl>
//                   <dt className="text-sm font-medium text-gray-500 truncate">
//                     மொத்த செயலில் உள்ள கடன்கள்
//                   </dt>
//                   <dd className="text-lg font-medium text-gray-900">
//                     {formatIndianCurrency(totalActiveLoans)}
//                   </dd>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showAddForm && (
//         <div className="mb-8 bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-medium mb-4">புதிய கடன் சேர்க்க</h2>
//           <form onSubmit={handleAddLoan} className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 தொகை (₹)
//               </label>
//               <input
//                 type="number"
//                 step="1000"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={newLoan.amount || ''}
//                 onChange={(e) =>
//                   setNewLoan({
//                     ...newLoan,
//                     amount: parseInt(e.target.value),
//                   })
//                 }
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 வட்டி விகிதம் (%)
//               </label>
//               <input
//                 type="number"
//                 step="0.1"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={newLoan.interestRate || ''}
//                 onChange={(e) =>
//                   setNewLoan({
//                     ...newLoan,
//                     interestRate: parseFloat(e.target.value),
//                   })
//                 }
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 நோக்கம்
//               </label>
//               <input
//                 type="text"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={newLoan.purpose || ''}
//                 onChange={(e) =>
//                   setNewLoan({ ...newLoan, purpose: e.target.value })
//                 }
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 திருப்பிச் செலுத்தும் தேதி
//               </label>
//               <input
//                 type="date"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={newLoan.dueDate || ''}
//                 onChange={(e) =>
//                   setNewLoan({ ...newLoan, dueDate: e.target.value })
//                 }
//               />
//             </div>
//             <div className="col-span-2 flex justify-end gap-4">
//               <button
//                 type="button"
//                 onClick={() => setShowAddForm(false)}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//               >
//                 ரத்து செய்
//               </button>
//               <button
//                 type="submit"
//                 className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//               >
//                 சேமி
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 தேதி
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 தொகை
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 நோக்கம்
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 வட்டி விகிதம்
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 நிலை
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 திருப்பிச் செலுத்தும் தேதி
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {loans.map((loan) => (
//               <tr key={loan.id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {loan.date}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {formatIndianCurrency(loan.amount)}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {loan.purpose}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {loan.interestRate}%
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       loan.status === 'செயலில்'
//                         ? 'bg-green-100 text-green-800'
//                         : loan.status === 'செலுத்தப்பட்டது'
//                         ? 'bg-blue-100 text-blue-800'
//                         : 'bg-red-100 text-red-800'
//                     }`}
//                   >
//                     {loan.status}
//                   </span>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {loan.dueDate}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }




// export default Loans;

import React, { useState, useEffect } from 'react';
import { Plus, DollarSign } from 'lucide-react';
import Navbar from './Navbar';

function Loans() {
  const [loans, setLoans] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLoan, setNewLoan] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/loans')
      .then((response) => response.json())
      .then((data) => setLoans(data))
      .catch((error) => console.error('Error fetching loans:', error));
  }, []);

  const handleAddLoan = (e) => {
    e.preventDefault();
    if (newLoan.amount && newLoan.purpose && newLoan.dueDate) {
      fetch('http://localhost:5000/api/loans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLoan),
      })
        .then((response) => response.json())
        .then((data) => {
          setLoans([...loans, data]);
          setShowAddForm(false);
          setNewLoan({});
        })
        .catch((error) => console.error('Error adding loan:', error));
    }
  };

  return (
      <div>
        <Navbar/>
       <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-semibold text-gray-900">கடன்கள்</h1>
         <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
           <Plus className="w-4 h-4 mr-2" />
           கடன் சேர்க்க
         </button>
       </div>

       <div className="mb-8">
         <div className="bg-white overflow-hidden shadow rounded-lg">
           <div className="p-5">
             <div className="flex items-center">
               <div className="flex-shrink-0">
                 <DollarSign className="h-6 w-6 text-gray-400" />
               </div>
               <div className="ml-5 w-0 flex-1">
                 <dl>
                   <dt className="text-sm font-medium text-gray-500 truncate">
                     மொத்த செயலில் உள்ள கடன்கள்
                   </dt>
                   <dd className="text-lg font-medium text-gray-900">
                     {formatIndianCurrency(totalActiveLoans)}
                   </dd>
                 </dl>
               </div>
             </div>
           </div>
         </div>
       </div>

       {showAddForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
           <h2 className="text-lg font-medium mb-4">புதிய கடன் சேர்க்க</h2>
           <form onSubmit={handleAddLoan} className="grid grid-cols-2 gap-4">
             <div>
               <label className="block text-sm font-medium text-gray-700">
                 தொகை (₹)
               </label>
               <input
                type="number"
                step="1000"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newLoan.amount || ''}
                onChange={(e) =>
                  setNewLoan({
                    ...newLoan,
                    amount: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                வட்டி விகிதம் (%)
              </label>
              <input
                 type="number"
                 step="0.1"
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 value={newLoan.interestRate || ''}
                 onChange={(e) =>
                   setNewLoan({
                     ...newLoan,
                     interestRate: parseFloat(e.target.value),
                   })
                 }
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700">
                 நோக்கம்
               </label>
               <input
                 type="text"
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 value={newLoan.purpose || ''}
                 onChange={(e) =>
                   setNewLoan({ ...newLoan, purpose: e.target.value })
                 }
               />
             </div>
             <div>
               <label className="block text-sm font-medium text-gray-700">
                 திருப்பிச் செலுத்தும் தேதி
               </label>
               <input
                 type="date"
                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                 value={newLoan.dueDate || ''}
                 onChange={(e) =>
                   setNewLoan({ ...newLoan, dueDate: e.target.value })
                 }
               />
             </div>
             <div className="col-span-2 flex justify-end gap-4">
               <button
                 type="button"
                 onClick={() => setShowAddForm(false)}
                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
               >
                 ரத்து செய்
               </button>
               <button
                 type="submit"
                 className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
               >
                 சேமி
               </button>
             </div>
           </form>
         </div>
       )}

       <div className="bg-white shadow-md rounded-lg overflow-hidden">
         <table className="min-w-full divide-y divide-gray-200">
           <thead className="bg-gray-50">
             <tr>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 தேதி
               </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 தொகை
               </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                நோக்கம்
              </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 வட்டி விகிதம்
               </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 நிலை
               </th>
               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                 திருப்பிச் செலுத்தும் தேதி
               </th>
             </tr>
           </thead>
           <tbody className="bg-white divide-y divide-gray-200">
             {loans.map((loan) => (
               <tr key={loan.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {loan.date}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {formatIndianCurrency(loan.amount)}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {loan.purpose}
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                   {loan.interestRate}%
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap">
                   <span
                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                       loan.status === 'செயலில்'
                         ? 'bg-green-100 text-green-800'
                         : loan.status === 'செலுத்தப்பட்டது'
                         ? 'bg-blue-100 text-blue-800'
                         : 'bg-red-100 text-red-800'
                     }`}
                   >
                     {loan.status}
                   </span>
                 </td>
                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {loan.dueDate}
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
   </div>
  );
}

export default Loans;