import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Navbar from './Navbar';

const translations = {
    tamil: {
        title: 'மாடு மேலாண்மை',
        addCow: 'மாடு சேர்க்க',
        name: 'பெயர்',
        breed: 'இனம்',
        age: 'வயது',
        status: 'நிலை',
        save: 'சேமி',
        cancel: 'ரத்து செய்',
        id: 'அடையாள எண்',
        lastMilking: 'கடைசி பால் கறந்த நாள்',
        healthy: 'ஆரோக்கியமானது',
        pregnant: 'கர்ப்பிணி',
        sick: 'நோயுற்றது',
        noMilk: 'பால் இல்லை',
    },
    english: {
        title: 'Cow Management',
        addCow: 'Add Cow',
        name: 'Name',
        breed: 'Breed',
        age: 'Age',
        status: 'Status',
        save: 'Save',
        cancel: 'Cancel',
        id: 'ID',
        lastMilking: 'Last Milking Date',
        healthy: 'Healthy',
        pregnant: 'Pregnant',
        sick: 'Sick',
        noMilk: 'No Milk',
    },
};

function CowManagement() {
    const [cows, setCows] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [newCow, setNewCow] = useState({});
    const [language, setLanguage] = useState('tamil');
    const t = translations[language];

    useEffect(() => {
        fetch('http://localhost:5000/api/cows')
            .then((response) => response.json())
            .then((data) => setCows(data))
            .catch((error) => console.error('Error fetching cows:', error));
    }, []);

    const handleAddCow = (e) => {
        e.preventDefault();
        if (newCow.name && newCow.breed) {
            fetch('http://localhost:5000/api/cows', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newCow),
            })
                .then((response) => response.json())
                .then((data) => {
                    setCows([...cows, data]);
                    setShowAddForm(false);
                    setNewCow({});
                })
                .catch((error) => console.error('Error adding cow:', error));
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Navbar />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold">{t.title}</h1>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setShowAddForm(true)} className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        <Plus className="w-4 h-4 mr-2" /> {t.addCow}
                    </button>
                    <button onClick={() => setLanguage(language === 'tamil' ? 'english' : 'tamil')} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
                        {language === 'tamil' ? 'English' : 'தமிழ்'}
                    </button>
                </div>
            </div>

            {showAddForm && (
                <div className="mb-8 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-xl font-medium mb-4">{t.addCow}</h2>
                    <form onSubmit={handleAddCow} className="grid grid-cols-2 gap-4">
                        {['name', 'breed', 'age'].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium">{t[field]}</label>
                                <input
                                    type={field === 'age' ? 'number' : 'text'}
                                    className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                                    value={newCow[field] || ''}
                                    onChange={(e) => setNewCow({ ...newCow, [field]: e.target.value })}
                                />
                            </div>
                        ))}
                        <div>
                            <label className="block text-sm font-medium">{t.status}</label>
                            <select className="mt-1 block w-full border rounded-md shadow-sm focus:ring focus:ring-blue-300"
                                value={newCow.status || t.healthy}
                                onChange={(e) => setNewCow({ ...newCow, status: e.target.value })}>
                                {[t.healthy, t.pregnant, t.sick, t.noMilk].map((status) => (
                                    <option key={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-2 flex justify-end gap-4">
                            <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
                                {t.cancel}
                            </button>
                            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                {t.save}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['id', 'name', 'breed', 'age', 'status', 'lastMilking'].map((col) => (
                                <th key={col} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t[col]}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {cows.map((cow) => (
                            <tr key={cow.id} className="hover:bg-gray-100">
                                {['id', 'name', 'breed', 'age'].map((key) => (
                                    <td key={key} className="px-6 py-4 text-sm text-gray-500">{cow[key]}</td>
                                ))}
                                <td className="px-6 py-4">
                                    <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${cow.status === t.healthy ? 'bg-green-100 text-green-800' : cow.status === t.pregnant ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                        {cow.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-50000000">{cow.lastMilking}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CowManagement;