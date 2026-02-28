"use client";
import React, { useState } from 'react';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import FormInput from '../../components/ui/FormInput';
import FormSelect from '../../components/ui/FormSelect';
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiMoreVertical } from 'react-icons/fi';

const dummyTenants = [
  { id: 'TNT001', name: 'Acme Corp', owner: 'john@acme.com', plan: 'Enterprise', status: 'Active', expiry: '2024-12-31', created: '2023-01-15' },
  { id: 'TNT002', name: 'Globex Inc', owner: 'jane@globex.com', plan: 'Pro', status: 'Active', expiry: '2024-10-20', created: '2023-02-10' },
  { id: 'TNT003', name: 'Soylent Corp', owner: 'admin@soylent.com', plan: 'Basic', status: 'Suspended', expiry: '2023-11-05', created: '2023-03-05' },
  { id: 'TNT004', name: 'Umbrella Corp', owner: 'wesker@umbrella.com', plan: 'Enterprise', status: 'Active', expiry: '2025-01-01', created: '2023-04-01' },
];

export default function TenantsPage() {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    businessName: '', businessType: '', ownerName: '', ownerEmail: '', ownerPhone: '',
    gst: '', pan: '', address: '', country: '', state: '', city: '', pincode: '',
    timezone: '', currency: '', subdomain: '', customDomain: '', mongoUri: '',
    apiRateLimit: '', maxUsers: '', maxProducts: '',
    plan: '', billingCycle: '', trialEnd: '', expiry: '', paymentStatus: '', status: 'Active'
  });

  const fetchTenants = async () => {
    try {
      const res = await fetch(`${process.env.Backend_url}/api/v1/tenants`);
      const data = await res.json();
      setTenants(data);
    } catch (error) {
      console.error('Failed to fetch tenants:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchTenants();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: `TNT${Date.now()}`,
      businessName: formData.businessName,
      subdomain: formData.subdomain,
      mongoUri: formData.mongoUri || null,
      ownerEmail: formData.ownerEmail,
      plan: formData.plan || 'Basic',
      status: formData.status,
      expiry: formData.expiry || '2025-01-01',
      created: new Date().toISOString().split('T')[0]
    };

    try {
      const res = await fetch(`${process.env.Backend_url}/api/v1/tenants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'SuperAdmin_001' // Simulating logged in user
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        fetchTenants();
        setIsModalOpen(false);
        // Add reset logic if needed
      }
    } catch (error) {
      console.error('Failed to create tenant:', error);
    }
  };

  const columns = [
    { header: 'Tenant ID', accessor: 'id' },
    { header: 'Business Name', accessor: 'name', render: (row) => <span className="font-medium text-gray-900 dark:text-white">{row.name}</span> },
    { header: 'Owner Email', accessor: 'owner' },
    {
      header: 'Plan', accessor: 'plan', render: (row) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
          {row.plan}
        </span>
      )
    },
    {
      header: 'Status', accessor: 'status', render: (row) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {row.status}
        </span>
      )
    },
    { header: 'Expiry', accessor: 'expiry' },
    { header: 'Created Date', accessor: 'created' },
  ];

  const actions = (row) => (
    <>
      <button className="text-gray-500 hover:text-indigo-600"><FiEye size={18} /></button>
      <button className="text-gray-500 hover:text-blue-600"><FiEdit2 size={18} /></button>
      <button className="text-gray-500 hover:text-red-600"><FiTrash2 size={18} /></button>
    </>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Tenant Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition"
        >
          <FiPlus /> Create Tenant
        </button>
      </div>

      <DataTable columns={columns} data={tenants} actions={actions} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Create New Tenant" size="xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Info */}
          <div>
            <h4 className="mb-4 text-lg font-medium text-gray-900 dark:text-white border-b pb-2">1. Business Information</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormInput label="Business Name" name="businessName" required onChange={handleInputChange} />
              <FormSelect label="Business Type" name="businessType" options={[{ label: 'Retail', value: 'retail' }, { label: 'Restaurant', value: 'Restaurant' }, { label: 'Hotel', value: 'Hotel' }, { label: 'Pharmacy', value: 'Pharmacy' }, {
                label: 'Manufacturing', value: 'Manufacturing'
              }]} onChange={handleInputChange} />
              <FormInput label="Owner Name" name="ownerName" required onChange={handleInputChange} />
              <FormInput label="Owner Email" name="ownerEmail" type="email" required onChange={handleInputChange} />
              <FormInput label="Owner Phone" name="ownerPhone" type="tel" onChange={handleInputChange} />
              <FormInput label="GST Number" name="gst" onChange={handleInputChange} />
              <FormInput label="PAN" name="pan" onChange={handleInputChange} />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <FormInput label="Address" name="address" className="lg:col-span-4" onChange={handleInputChange} />
              <FormInput label="Country" name="country" onChange={handleInputChange} />
              <FormInput label="State" name="state" onChange={handleInputChange} />
              <FormInput label="City" name="city" onChange={handleInputChange} />
              <FormInput label="Pincode" name="pincode" onChange={handleInputChange} />
              <FormSelect label="Timezone" name="timezone" options={[{ label: 'UTC', value: 'UTC' }, { label: 'IST', value: 'IST' }]} onChange={handleInputChange} />
              <FormSelect label="Currency" name="currency" options={[{ label: 'USD', value: 'USD' }, { label: 'INR', value: 'INR' }]} onChange={handleInputChange} />
            </div>
          </div>



          {/* Technical Info */}
          <div>
            <h4 className="mb-4 text-lg font-medium text-gray-900 dark:text-white border-b pb-2">2. Technical Configuration</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormInput label="Subdomain" name="subdomain" placeholder="example.app.com" required onChange={handleInputChange} />
              <FormInput label="Custom MongoDB URI (Optional)" name="mongoUri" placeholder="mongodb+srv://..." onChange={handleInputChange} />
            </div>
          </div>

          {/* Subscription Info */}
          <div>
            <h4 className="mb-4 text-lg font-medium text-gray-900 dark:text-white border-b pb-2">3. Subscription & Billing</h4>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <FormSelect label="Plan" name="plan" options={[{ label: 'Basic', value: 'Basic' }, { label: 'Pro', value: 'Pro' }, { label: 'Enterprise', value: 'Enterprise' }]} required onChange={handleInputChange} />
              <FormSelect label="Billing Cycle" name="billingCycle" options={[{ label: 'Monthly', value: 'monthly' }, { label: 'Yearly', value: 'yearly' }]} onChange={handleInputChange} />
              <FormInput label="Trial End Date" name="trialEnd" type="date" onChange={handleInputChange} />
              <FormInput label="Expiry Date" name="expiry" type="date" onChange={handleInputChange} />
              <FormSelect label="Payment Status" name="paymentStatus" options={[{ label: 'Paid', value: 'paid' }, { label: 'Pending', value: 'pending' }]} onChange={handleInputChange} />
              <FormSelect label="Tenant Status" name="status" options={[{ label: 'Active', value: 'Active' }, { label: 'Suspended', value: 'Suspended' }]} onChange={handleInputChange} />
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
              Create Tenant
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
