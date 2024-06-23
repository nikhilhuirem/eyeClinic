// components/PatientForm.js
"use client"
import React, { useState } from 'react';

const PatientForm = () => {
  const [patientType, setPatientType] = useState('new');
  const [consultancyFee, setConsultancyFee] = useState(500);

  const handlePatientTypeChange = (e) => {
    const type = e.target.value;
    setPatientType(type);

    switch (type) {
      case 'new':
        setConsultancyFee(500);
        break;
      case 'review':
        setConsultancyFee(200);
        break;
      case 'charity':
        setConsultancyFee(0);
        break;
      default:
        setConsultancyFee(0);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Patient Form</h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Patient Name</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Patient Type</label>
          <select
            value={patientType}
            onChange={handlePatientTypeChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="new">New</option>
            <option value="review">Review</option>
            <option value="charity">Charity</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Consultancy Fee</label>
          <input
            type="text"
            value={`Rs ${consultancyFee}`}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Payment Status</label>
          <select
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="paid">Paid</option>
            <option value="not_paid">Not Paid</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
