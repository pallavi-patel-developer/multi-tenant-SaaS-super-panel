"use client";
import { FiUsers, FiDollarSign, FiShoppingBag, FiCheckCircle, FiActivity } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, tenants: 240 },
  { name: 'Feb', revenue: 3000, tenants: 139 },
  { name: 'Mar', revenue: 2000, tenants: 980 },
  { name: 'Apr', revenue: 2780, tenants: 390 },
  { name: 'May', revenue: 1890, tenants: 480 },
  { name: 'Jun', revenue: 2390, tenants: 380 },
  { name: 'Jul', revenue: 3490, tenants: 430 },
];

const cards = [
  { title: "Total Tenants", value: "1,245", icon: FiUsers, change: "+12%", color: "bg-blue-500" },
  { title: "Active Tenants", value: "1,100", icon: FiCheckCircle, change: "+5%", color: "bg-green-500" },
  { title: "Monthly Revenue", value: "$45,230", icon: FiDollarSign, change: "+8%", color: "bg-indigo-500" },
  { title: "Total Orders", value: "8,540", icon: FiShoppingBag, change: "+24%", color: "bg-purple-500" },
  { title: "Active Subscriptions", value: "950", icon: FiActivity, change: "+3%", color: "bg-orange-500" },
];

const recentActivity = [
  { id: 1, tenant: "Acme Corp", action: "Upgraded Plan", time: "2 hours ago", status: "Completed" },
  { id: 2, tenant: "Globex Inc", action: "New Subscription", time: "4 hours ago", status: "Pending" },
  { id: 3, tenant: "Soylent Corp", action: "Payment Failed", time: "5 hours ago", status: "Failed" },
  { id: 4, tenant: "Umbrella Corp", action: "User Added", time: "8 hours ago", status: "Completed" },
  { id: 5, tenant: "Stark Ind", action: "Plan Renewal", time: "1 day ago", status: "Completed" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard Overview</h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {cards.map((card, index) => (
          <div key={index} className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{card.title}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{card.value}</p>
              </div>
              <div className={`rounded-full p-3 text-white ${card.color}`}>
                <card.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="font-medium text-green-500">{card.change}</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Revenue Overview</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tenant Growth Chart */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Tenant Growth</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="tenants" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Recent Activity</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3">Tenant</th>
                <th className="px-6 py-3">Action</th>
                <th className="px-6 py-3">Time</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.map((item) => (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.tenant}</td>
                  <td className="px-6 py-4">{item.action}</td>
                  <td className="px-6 py-4">{item.time}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                      ${item.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                      }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
