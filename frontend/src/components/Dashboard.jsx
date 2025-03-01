
import React from 'react';
import { Milk, DollarSign, Cog as Cow, TrendingUp } from 'lucide-react';
import './Dashboard.css';
import Navbar from './Navbar';

const stats = [
  {
    name: 'மொத்த மாடுகள்',
    value: '24',
    icon: Cow,
    change: '+2',
    changeType: 'increase',
  },
  {
    name: 'தினசரி பால் உற்பத்தி',
    value: '486L',
    icon: Milk,
    change: '+4.75%',
    changeType: 'increase',
  },
  {
    name: 'மாத வருமானம்',
    value: '₹10,25,450',
    icon: DollarSign,
    change: '+10.1%',
    changeType: 'increase',
  },
  {
    name: 'லாப விகிதம்',
    value: '24.5%',
    icon: TrendingUp,
    change: '+2.3%',
    changeType: 'increase',
  },
];

function Dashboard() {
  return (
    <div className="p-6">
      <Navbar/>
      <h1 className="text-2xl font-semibold text-gray-900">முகப்பு</h1>

      
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
                <p
                  className={`ml-2 flex items-baseline text-sm font-semibold ${
                    item.changeType === 'increase'
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {item.change}
                </p>
              </dd>
            </div>
          );
        })}
      </div>

      
    </div>
  );
}

export default Dashboard;