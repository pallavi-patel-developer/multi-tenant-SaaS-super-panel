"use client";
import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import FormInput from '../../components/ui/FormInput';
import FormSelect from '../../components/ui/FormSelect';
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi';

const dummyPlans = [
  { id: 'PLN001', name: 'Basic Plan', price: '$29', cycle: 'Monthly', status: 'Active' },
  { id: 'PLN002', name: 'Pro Plan', price: '$99', cycle: 'Monthly', status: 'Active' },
  { id: 'PLN003', name: 'Enterprise', price: '$499', cycle: 'Yearly', status: 'Active' },
  { id: 'PLN004', name: 'Starter', price: '$0', cycle: 'Monthly', status: 'Archived' },
];

export default function PlansPage() {
  const [plans, setPlans] = useState(dummyPlans);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', code: '', price: '', cycle: 'Monthly', trialDays: '14', status: 'Active'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlan = {
      id: `PLN00${plans.length + 1}`,
      name: formData.name,
      price: `$${formData.price}`,
      cycle: formData.cycle,
      status: formData.status
    };
    setPlans([...plans, newPlan]);
    setIsModalOpen(false);
  };

  const columns = [
    { header: 'Plan ID', accessor: 'id' },
    { header: 'Plan Name', accessor: 'name', render: (row) => <span className="font-medium text-gray-900 dark:text-white">{row.name}</span> },
    { header: 'Price', accessor: 'price' },
    { header: 'Billing Cycle', accessor: 'cycle' },
    {
      header: 'Status', accessor: 'status', render: (row) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {row.status}
        </span>
      )
    },
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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Subscription Plans</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
        >
          <FiPlus /> Create Plan
        </button>
      </div>

      <DataTable columns={columns} data={plans} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Plan">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput label="Plan Name" name="planName" required onChange={handleInputChange} />
          <FormInput label="Plan Code" name="planCode" placeholder="e.g., BASIC_MONTHLY" required onChange={handleInputChange} />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Price" name="planPrice" type="number" required onChange={handleInputChange} />
            <FormSelect label="Billing Cycle" name="billingCycle" options={[{ label: 'Monthly', value: 'monthly' }, { label: 'Yearly', value: 'yearly' }]} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Trial Days" name="trialDays" type="number" onChange={handleInputChange} />
            <FormSelect label="Status" name="status" options={[{ label: 'Active', value: 'Active' }, { label: 'Archived', value: 'Archived' }]} onChange={handleInputChange} />
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
              Save Plan
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
