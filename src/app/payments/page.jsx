"use client";
import React, { useState } from 'react';
import FormInput from '../../components/ui/FormInput';
import FormSelect from '../../components/ui/FormSelect';

export default function PaymentGatewaysPage() {
  const [formData, setFormData] = useState({
    gatewayName: 'RAZORPAY',
    tenantName: '',
    tenantEmail: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment Gateway Configuration Saved (Dummy Action)');
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Gateway Configuration</h1>

      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormSelect
              label="Gateway Name"
              name="gatewayName"
              value={formData.gatewayName}
              options={[
                { label: 'Razorpay', value: 'RAZORPAY' },
                { label: 'Stripe', value: 'STRIPE' },
                { label: 'PayPal', value: 'PAYPAL' }
              ]}
              onChange={handleInputChange}
            />

            <FormInput
              label="Tenant Name"
              name="tenantName"
              placeholder="Enter tenant name"
              value={formData.tenantName}
              required
              onChange={handleInputChange}
            />

            <FormInput
              label="Tenant Email"
              name="tenantEmail"
              type="email"
              placeholder="Enter tenant email"
              value={formData.tenantEmail}
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 sm:w-auto"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
