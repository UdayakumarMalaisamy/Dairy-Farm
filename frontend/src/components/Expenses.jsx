import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Navbar from './Navbar';
import './Expenses.css';


const Expenses = () => {
  const initialExpenses = [
    {
      id: '1',
      date: '2024-03-10',
      category: 'தீவனம்',
      amount: 85000,
      description: 'மாத தீவன வழங்கல்',
    },
    {
      id: '2',
      date: '2024-03-09',
      category: 'மருத்துவம்',
      amount: 25000,
      description: 'வழக்கமான பரிசோதனை',
    },
  ];

  const [expenses, setExpenses] = useState(initialExpenses);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newExpense, setNewExpense] = useState({});

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const formatIndianCurrency = (amount) => {
    return new Intl.NumberFormat('ta-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (newExpense.amount && newExpense.category) {
      setExpenses([
        ...expenses,
        {
          ...newExpense,
          id: (expenses.length + 1).toString(),
          date: new Date().toISOString().split('T')[0],
        },
      ]);
      setShowAddForm(false);
      setNewExpense({});
    }
  };

  return (
    <div>
        <Navbar/>
      <div className="flex justify-between items-center mb-6">
      
        <h1 className="text-2xl font-semibold text-gray-900">செலவுகள்</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          செலவு சேர்க்க
        </button>
      </div>

      <div className="mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5 flex items-center">
            <div className="flex-shrink-0">
              <span className="h-6 w-6 text-gray-400 text-2xl font-bold">₹</span>
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">மொத்த செலவுகள்</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {formatIndianCurrency(totalExpenses)}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">புதிய செலவு சேர்க்க</h2>
          <form onSubmit={handleAddExpense} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">வகை</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newExpense.category || ''}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              >
                <option value="">வகையைத் தேர்ந்தெடுக்கவும்</option>
                <option>தீவனம்</option>
                <option>மருத்துவம்</option>
                <option>உபகரணங்கள்</option>
                <option>வேலையாட்கள்</option>
                <option>பயன்பாடுகள்</option>
                <option>மற்றவை</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">தொகை (₹)</label>
              <input
                type="number"
                step="1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newExpense.amount || ''}
                onChange={(e) =>
                  setNewExpense({
                    ...newExpense,
                    amount: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">விவரம்</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                value={newExpense.description || ''}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, description: e.target.value })
                }
              ></textarea>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                தேதி
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                வகை
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                தொகை
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                விவரம்
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {expense.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      expense.category === 'தீவனம்'
                        ? 'bg-green-100 text-green-800'
                        : expense.category === 'மருத்துவம்'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {expense.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatIndianCurrency(expense.amount)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{expense.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


 

export default Expenses;

// import React, { useState, useEffect } from 'react';
// import { Plus } from 'lucide-react';
// import Navbar from './Navbar';

// function Expenses() {
//   const [expenses, setExpenses] = useState([]);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newExpense, setNewExpense] = useState({ date: '', category: '', amount: '', description: '' });

//   useEffect(() => {
//     fetch('http://localhost:5000/api/expenses')
//       .then((response) => response.json())
//       .then((data) => setExpenses(data))
//       .catch((error) => console.error('Error fetching expenses:', error));
//   }, []);

//   const handleAddExpense = async (e) => {
//     e.preventDefault();
//     if (newExpense.amount && newExpense.category && newExpense.date) {
//       try {
//         const response = await fetch('http://localhost:5000/api/expenses', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(newExpense),
//         });
//         const data = await response.json();
//         setExpenses([...expenses, data]);
//         setShowAddForm(false);
//         setNewExpense({ date: '', category: '', amount: '', description: '' });
//       } catch (error) {
//         console.error('Error adding expense:', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">செலவுகள்</h1>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           <Plus className="w-4 h-4 mr-2" /> செலவு சேர்க்க
//         </button>
//       </div>

//       {showAddForm && (
//         <div className="mb-8 bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-medium mb-4">புதிய செலவு சேர்க்க</h2>
//           <form onSubmit={handleAddExpense} className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">தேதி</label>
//               <input
//                 type="date"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={newExpense.date}
//                 onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">வகை</label>
//               <select
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={newExpense.category}
//                 onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
//               >
//                 <option value="">வகையைத் தேர்ந்தெடுக்கவும்</option>
//                 <option>தீவனம்</option>
//                 <option>மருத்துவம்</option>
//                 <option>உபகரணங்கள்</option>
//                 <option>வேலையாட்கள்</option>
//                 <option>பயன்பாடுகள்</option>
//                 <option>மற்றவை</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">தொகை (₹)</label>
//               <input
//                 type="number"
//                 step="1"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={newExpense.amount}
//                 onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
//               />
//             </div>
//             <div className="col-span-2">
//               <label className="block text-sm font-medium text-gray-700">விவரம்</label>
//               <textarea
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 rows={3}
//                 value={newExpense.description}
//                 onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
//               ></textarea>
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
//     </div>
//   );
// }

// export default Expenses;




