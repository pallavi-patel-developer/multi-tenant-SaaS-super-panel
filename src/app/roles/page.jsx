"use client";
import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import FormInput from '../../components/ui/FormInput';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

const dummyRoles = [
  { id: 'ROLE001', name: 'Super Admin', description: 'Full access to all system features' },
  { id: 'ROLE002', name: 'Support Agent', description: 'Access to tenant support and tickets' },
  { id: 'ROLE003', name: 'Viewer', description: 'Read-only access to analytics' },
];

const permissionsList = [
  { category: 'Dashboard', actions: ['View'] },
  { category: 'Tenants', actions: ['View', 'Create', 'Edit', 'Delete', 'Suspend'] },
  { category: 'Plans', actions: ['View', 'Create', 'Edit', 'Archive'] },
  { category: 'Payments', actions: ['View', 'Configure'] },
  { category: 'Users', actions: ['View', 'Create', 'Edit', 'Delete'] },
  { category: 'Analytics', actions: ['View', 'Export'] },
];

export default function RolesPage() {
  const [roles, setRoles] = useState(dummyRoles);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '', permissions: {} });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionChange = (category, action) => {
    setFormData(prev => {
      const currentCategoryPerms = prev.permissions[category] || [];
      const newCategoryPerms = currentCategoryPerms.includes(action)
        ? currentCategoryPerms.filter(a => a !== action)
        : [...currentCategoryPerms, action];

      return {
        ...prev,
        permissions: { ...prev.permissions, [category]: newCategoryPerms }
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRole = {
      id: `ROLE00${roles.length + 1}`,
      name: formData.name,
      description: formData.description
    };
    setRoles([...roles, newRole]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Role Name', accessor: 'name', render: (row) => <span className="font-medium text-gray-900 dark:text-white">{row.name}</span> },
    { header: 'Description', accessor: 'description' },
  ];

  const actions = (row) => (
    <>
      <button className="text-gray-500 hover:text-blue-600"><FiEdit2 size={18} /></button>
      <button className="text-gray-500 hover:text-red-600"><FiTrash2 size={18} /></button>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Roles & Permissions</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
        >
          <FiPlus /> Create Role
        </button>
      </div>

      <DataTable columns={columns} data={roles} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Role" size="lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput label="Role Name" name="name" required onChange={handleInputChange} />
          <FormInput label="Description" name="description" onChange={handleInputChange} />

          <div>
            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Permissions</label>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
              <div className="space-y-4">
                {permissionsList.map((perm) => (
                  <div key={perm.category} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center border-b last:border-0 border-gray-200 dark:border-gray-700 pb-3 last:pb-0">
                    <span className="font-medium text-sm text-gray-900 dark:text-white">{perm.category}</span>
                    <div className="col-span-3 flex flex-wrap gap-4">
                      {perm.actions.map((action) => (
                        <label key={action} className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700"
                            checked={formData.permissions[perm.category]?.includes(action) || false}
                            onChange={() => handlePermissionChange(perm.category, action)}
                          />
                          <span>{action}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
            >
              Save Role
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
