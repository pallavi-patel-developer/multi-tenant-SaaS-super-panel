"use client";
import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, PieChart, Pie, Cell
} from 'recharts';
import { FiTrendingUp, FiUsers, FiDollarSign, FiActivity } from 'react-icons/fi';

const revenueData = [
  { name: 'Jan', revenue: 4000, target: 3500 },
  { name: 'Feb', revenue: 3000, target: 3800 },
  { name: 'Mar', revenue: 5000, target: 4000 },
  { name: 'Apr', revenue: 2780, target: 4200 },
  { name: 'May', revenue: 1890, target: 4500 },
  { name: 'Jun', revenue: 6390, target: 4800 },
  { name: 'Jul', revenue: 3490, target: 5000 },
];

const subscriptionData = [
  { name: 'Basic', value: 400 },
  { name: 'Pro', value: 300 },
  { name: 'Enterprise', value: 200 },
];

const tenantGrowthData = [
  { name: 'Q1', active: 500, churned: 20 },
  { name: 'Q2', active: 650, churned: 35 },
  { name: 'Q3', active: 800, churned: 40 },
  { name: 'Q4', active: 1100, churned: 55 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

const metrics = [
  { title: "Total Revenue", value: "$124,500", icon: FiDollarSign, change: "+12.5%", color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-400" },
  { title: "Active Tenants", value: "1,250", icon: FiUsers, change: "+8.2%", color: "text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400" },
  { title: "Churn Rate", value: "2.4%", icon: FiActivity, change: "-0.5%", color: "text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400" },
  { title: "Avg. Revenue/User", value: "$45.00", icon: FiTrendingUp, change: "+5.1%", color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400" },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Platform Analytics</h1>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div key={index} className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.title}</p>
                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              </div>
              <div className={`rounded-xl p-3 ${metric.color}`}>
                <metric.icon size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className={`font-medium ${metric.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {metric.change}
              </span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        {/* Revenue Trends */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Revenue Trends</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenueAnalytics" x1="0" y1="0" x2="0" y2="1">
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
                <Legend />
                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRevenueAnalytics)" />
                <Area type="monotone" dataKey="target" stroke="#10b981" fillOpacity={0} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tenant Growth Bar Chart */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Tenant Growth vs Churn</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={tenantGrowthData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.3} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="active" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="churned" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscription Distribution Pie Chart */}
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800 lg:col-span-2">
          <h3 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">Subscription Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-4">
              {subscriptionData.map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{entry.name}</span>
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
