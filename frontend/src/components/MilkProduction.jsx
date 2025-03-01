// import React, { useState } from 'react';
// import { Plus, TrendingUp } from 'lucide-react';
// import Navbar from './Navbar';

// const initialRecords = [
//   {
//     id: '1',
//     date: '2024-03-10',
//     quantity: 15,
//     quality: 'தரம் A',
//     cowId: '001',
//     shift: 'காலை',
//   },
//   {
//     id: '2',
//     date: '2024-03-10',
//     quantity: 12,
//     quality: 'தரம் A',
//     cowId: '001',
//     shift: 'மாலை',
//   },
//   {
//     id: '3',
//     date: '2024-03-10',
//     quantity: 10,
//     quality: 'தரம் B',
//     cowId: '002',
//     shift: 'காலை',
//   },
// ];

// function MilkProduction() {
//   const [records, setRecords] = useState(initialRecords);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newRecord, setNewRecord] = useState({});

//   const totalProduction = records.reduce((sum, record) => sum + record.quantity, 0);
//   const averageProduction = totalProduction / records.length;

//   const handleAddRecord = (e) => {
//     e.preventDefault();
//     if (newRecord.quantity && newRecord.cowId) {
//       setRecords([
//         ...records,
//         {
//           ...newRecord,
//           id: (records.length + 1).toString(),
//           date: new Date().toISOString().split('T')[0],
//         },
//       ]);
//       setShowAddForm(false);
//       setNewRecord({});
//     }
//   };

//   // Group records by cow ID
//   const groupedRecords = records.reduce((acc, record) => {
//     const cow = acc[record.cowId] || { morning: 0, evening: 0, total: 0 };
//     if (record.shift === 'காலை') {
//       cow.morning += record.quantity;
//     } else if (record.shift === 'மாலை') {
//       cow.evening += record.quantity;
//     }
//     cow.total += record.quantity;
//     acc[record.cowId] = cow;
//     return acc;
//   }, {});

//   return (
//     <div>
//       <Navbar />
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">பால் உற்பத்தி</h1>
//         <button
//           onClick={() => setShowAddForm(true)}
//           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//         >
//           <Plus className="w-4 h-4 mr-2" />
//           பதிவு சேர்க்க
//         </button>
//       </div>

//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="p-5">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <TrendingUp className="h-6 w-6 text-gray-400" />
//               </div>
//               <div className="ml-5 w-0 flex-1">
//                 <dl>
//                   <dt className="text-sm font-medium text-gray-500 truncate">
//                     மொத்த உற்பத்தி
//                   </dt>
//                   <dd className="text-lg font-medium text-gray-900">
//                     {totalProduction}L
//                   </dd>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white overflow-hidden shadow rounded-lg">
//           <div className="p-5">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <TrendingUp className="h-6 w-6 text-gray-400" />
//               </div>
//               <div className="ml-5 w-0 flex-1">
//                 <dl>
//                   <dt className="text-sm font-medium text-gray-500 truncate">
//                     சராசரி உற்பத்தி
//                   </dt>
//                   <dd className="text-lg font-medium text-gray-900">
//                     {averageProduction.toFixed(2)}L
//                   </dd>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {showAddForm && (
//         <div className="mb-8 bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-medium mb-4">புதிய பதிவு சேர்க்க</h2>
//           <form onSubmit={handleAddRecord} className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 மாடு எண்
//               </label>
//               <input
//                 type="text"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={newRecord.cowId || ''}
//                 onChange={(e) =>
//                   setNewRecord({ ...newRecord, cowId: e.target.value })
//                 }
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 அளவு (L)
//               </label>
//               <input
//                 type="number"
//                 step="0.1"
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={newRecord.quantity || ''}
//                 onChange={(e) =>
//                   setNewRecord({
//                     ...newRecord,
//                     quantity: parseFloat(e.target.value),
//                   })
//                 }
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 தரம்
//               </label>
//               <select
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={newRecord.quality || 'தரம் A'}
//                 onChange={(e) =>
//                   setNewRecord({ ...newRecord, quality: e.target.value })
//                 }
//               >
//                 <option>தரம் A</option>
//                 <option>தரம் B</option>
//                 <option>தரம் C</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 நேரம்
//               </label>
//               <select
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
//                 value={newRecord.shift || 'காலை'}
//                 onChange={(e) =>
//                   setNewRecord({
//                     ...newRecord,
//                     shift: e.target.value,
//                   })
//                 }
//               >
//                 <option>காலை</option>
//                 <option>மாலை</option>
//               </select>
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
//         <table className="min-w-full divide-y divide-gray-200" cow>
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 மாடு எண்
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 காலை உற்பத்தி (L)
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 மாலை உற்பத்தி (L)
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 மொத்த உற்பத்தி (L)
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {Object.entries(groupedRecords).map(([cowId, data]) => (
//               <tr key={cowId}>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {cowId}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {data.morning}L
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {data.evening}L
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {data.total}L
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }









// export default MilkProduction;

import React, { useState, useEffect } from 'react';
import { Plus, TrendingUp } from 'lucide-react';
import Navbar from './Navbar';

function MilkProduction() {
  const [records, setRecords] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/milk-production')
      .then((response) => response.json())
      .then((data) => setRecords(data))
      .catch((error) => console.error('Error fetching milk production records:', error));
  }, []);

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (newRecord.quantity && newRecord.cowId) {
      fetch('http://localhost:5000/api/milk-production', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      })
        .then((response) => response.json())
        .then((data) => {
          setRecords([...records, data]);
          setShowAddForm(false);
          setNewRecord({});
        })
        .catch((error) => console.error('Error adding milk production record:', error));
    }
  };

  return (
    <div>
       <Navbar />
       <div className="flex justify-between items-center mb-6">
         <h1 className="text-2xl font-semibold text-gray-900">பால் உற்பத்தி</h1>
         <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          பதிவு சேர்க்க
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">;l
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    மொத்த உற்பத்தி
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {totalProduction}L
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    சராசரி உற்பத்தி
                  </dt>
                  <dd className="text-lg font-medium text-gray-900">
                    {averageProduction.toFixed(2)}L
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddForm && (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-4">புதிய பதிவு சேர்க்க</h2>
          <form onSubmit={handleAddRecord} className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                மாடு எண்
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newRecord.cowId || ''}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, cowId: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                அளவு (L)
              </label>
              <input
                type="number"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newRecord.quantity || ''}
                onChange={(e) =>
                  setNewRecord({
                    ...newRecord,
                    quantity: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                தரம்
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newRecord.quality || 'தரம் A'}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, quality: e.target.value })
                }
              >
                <option>தரம் A</option>
                <option>தரம் B</option>
                <option>தரம் C</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                நேரம்
              </label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={newRecord.shift || 'காலை'}
                onChange={(e) =>
                  setNewRecord({
                    ...newRecord,
                    shift: e.target.value,
                  })
                }
              >
                <option>காலை</option>
                <option>மாலை</option>
              </select>
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
        <table className="min-w-full divide-y divide-gray-200" cow>
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                மாடு எண்
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                காலை உற்பத்தி (L)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                மாலை உற்பத்தி (L)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                மொத்த உற்பத்தி (L)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(groupedRecords).map(([cowId, data]) => (
              <tr key={cowId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {cowId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.morning}L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.evening}L
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {data.total}L
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MilkProduction;