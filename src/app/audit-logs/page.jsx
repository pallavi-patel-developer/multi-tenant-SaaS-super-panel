"use client";
import React, { useState, useEffect } from 'react';
import DataTable from '../../components/ui/DataTable';
import { FiRefreshCw, FiInfo } from 'react-icons/fi';

export default function AuditLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.Backend_url}/api/v1/audit-logs`);
      const data = await res.json();
      setLogs(data);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const columns = [
    {
      header: 'Action', accessor: 'action', render: (row) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
        ${row.action.includes('CREATED') ? 'bg-green-100 text-green-800' :
            row.action.includes('UPDATED') ? 'bg-blue-100 text-blue-800' :
              row.action.includes('SUSPENDED') ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
          {row.action}
        </span>
      )
    },
    { header: 'Resource ID', accessor: 'resourceId' },
    { header: 'User', accessor: 'user' },
    { header: 'Reason', accessor: 'reason', render: (row) => <span className="text-gray-500 text-sm italic">{row.reason}</span> },
    { header: 'Timestamp', accessor: 'timestamp', render: (row) => new Date(row.timestamp).toLocaleString() },
  ];

  const actions = (row) => (
    <button className="text-gray-500 hover:text-indigo-600" title="View Details">
      <FiInfo size={18} />
    </button>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Audit Logs</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track all critical actions and system changes for security and debugging.</p>
        </div>
        <button
          onClick={fetchLogs}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
        >
          <FiRefreshCw className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <DataTable columns={columns} data={logs} actions={actions} />

      {logs.length === 0 && !loading && (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No audit logs found.</p>
        </div>
      )}
    </div>
  );
}
