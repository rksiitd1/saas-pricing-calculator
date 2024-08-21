import React, { useState, useEffect } from 'react';

const Input = ({ label, id, type, min, value, onChange }) => (
  <div className="grid gap-2">
    <label htmlFor={id} className="text-sm font-medium">{label}</label>
    <input
      id={id}
      type={type}
      min={min}
      value={value}
      onChange={onChange}
      className="border rounded-md px-3 py-2"
    />
  </div>
);

const Select = ({ label, id, value, onChange, options }) => (
  <div className="grid gap-2">
    <label htmlFor={id} className="text-sm font-medium">{label}</label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="border rounded-md px-3 py-2"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

const Checkbox = ({ label, id, checked, onChange }) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <label htmlFor={id} className="text-sm font-medium">{label}</label>
  </div>
);

const PricingCalculator = () => {
  const [seats, setSeats] = useState(1);
  const [usage, setUsage] = useState(0);
  const [plan, setPlan] = useState('basic');
  const [discount, setDiscount] = useState(false);
  const [total, setTotal] = useState(0);

  const plans = {
    basic: { name: 'Basic', basePrice: 10, includeUsage: 100, extraUsagePrice: 0.1 },
    pro: { name: 'Pro', basePrice: 20, includeUsage: 250, extraUsagePrice: 0.08 },
    enterprise: { name: 'Enterprise', basePrice: 50, includeUsage: 1000, extraUsagePrice: 0.05 },
  };

  useEffect(() => {
    const selectedPlan = plans[plan];
    let price = selectedPlan.basePrice * seats;
    
    if (usage > selectedPlan.includeUsage) {
      price += (usage - selectedPlan.includeUsage) * selectedPlan.extraUsagePrice;
    }

    if (discount) {
      price *= 0.9; // 10% discount
    }

    setTotal(price);
  }, [seats, usage, plan, discount]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">SaaS Pricing Calculator</h2>
      <p className="text-gray-600 mb-6">Calculate your monthly cost based on seats, usage, and plan.</p>
      <div className="grid gap-6">
        <Input
          label="Number of Seats"
          id="seats"
          type="number"
          min="1"
          value={seats}
          onChange={(e) => setSeats(parseInt(e.target.value) || 1)}
        />
        <Input
          label="Monthly Usage (in GB)"
          id="usage"
          type="number"
          min="0"
          value={usage}
          onChange={(e) => setUsage(parseInt(e.target.value) || 0)}
        />
        <Select
          label="Plan"
          id="plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          options={[
            { value: 'basic', label: 'Basic' },
            { value: 'pro', label: 'Pro' },
            { value: 'enterprise', label: 'Enterprise' },
          ]}
        />
        <Checkbox
          label="Apply 10% discount"
          id="discount"
          checked={discount}
          onChange={(e) => setDiscount(e.target.checked)}
        />
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Price Breakdown</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span>Base Price ({plans[plan].name} Plan):</span>
              <span>${plans[plan].basePrice.toFixed(2)} per seat</span>
            </div>
            <div className="flex justify-between">
              <span>Number of Seats:</span>
              <span>{seats}</span>
            </div>
            <div className="flex justify-between">
              <span>Included Usage:</span>
              <span>{plans[plan].includeUsage} GB</span>
            </div>
            <div className="flex justify-between">
              <span>Extra Usage:</span>
              <span>{Math.max(0, usage - plans[plan].includeUsage)} GB</span>
            </div>
            <div className="flex justify-between">
              <span>Extra Usage Price:</span>
              <span>${plans[plan].extraUsagePrice.toFixed(2)} per GB</span>
            </div>
            {discount && (
              <div className="flex justify-between text-green-500">
                <span>Discount Applied:</span>
                <span>10%</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
              <span>Total Monthly Cost:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingCalculator;