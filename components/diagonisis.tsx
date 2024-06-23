// components/DiagnosisForm.js
"use client"
import React, { useState } from 'react';

const DiagnosisForm = () => {
  const initialMedicationRow = {
    eye: '',
    form: '',
    medicine: '',
    dose: '',
    frequency: '',
    duration: '',
    remarks: ''
  };

  const [medications, setMedications] = useState([initialMedicationRow]);

  const handleAddMedicationRow = () => {
    setMedications([...medications, initialMedicationRow]);
  };

  const handleMedicationChange = (e, index) => {
    const { name, value } = e.target;
    const updatedMedications = [...medications];
    updatedMedications[index][name] = value;
    setMedications(updatedMedications);
  };
  return (
    <div className="max-w-10xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Diagnosis Form</h2>
      <form>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Diagnosis</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">OU</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">OD</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">OS</label>
              <input
                type="text"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Glass Prescription</h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left"></th>
                <th colSpan="4" className="border px-4 py-2 text-center">Right Eye</th>
                <th colSpan="4" className="border px-4 py-2 text-center">Left Eye</th>
              </tr>
              <tr>
                <th className="border px-4 py-2 text-left"></th>
                <th className="border px-4 py-2 text-left">SPH</th>
                <th className="border px-4 py-2 text-left">CYL</th>
                <th className="border px-4 py-2 text-left">Axis</th>
                <th className="border px-4 py-2 text-left">V/A</th>
                <th className="border px-4 py-2 text-left">SPH</th>
                <th className="border px-4 py-2 text-left">CYL</th>
                <th className="border px-4 py-2 text-left">Axis</th>
                <th className="border px-4 py-2 text-left">V/A</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">DV</td>
                <td className="border px-4 py-2 bg-white border border-gray-300"><input type="text" className="w-full px-2 py-1 border rounded " /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
              </tr>
              <tr>
                <td className="border px-4 py-2">NV</td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
                <td className="border px-4 py-2"><input type="text" className="w-full px-2 py-1 border rounded" /></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Glass and Lens Type</h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2 text-left"></th>
                <th className="border px-4 py-2 text-left">Right Eye</th>
                <th className="border px-4 py-2 text-left">Left Eye</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Glass Type</td>
                <td className="border px-4 py-2">
                  <select className="w-full px-2 py-1 border rounded">
                    <option value="Bluecut Green">Bluecut Green</option>
                    <option value="Bluecut Green">Bluecut Green</option>
                    <option value="Hardcoat">Hardcoat</option>
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <select className="w-full px-2 py-1 border rounded">
                    <option value="Bluecut Green">Bluecut Green</option>
                    <option value="Bluecut Green">Bluecut Green</option>
                    <option value="Hardcoat">Hardcoat</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Lens Type</td>
                <td className="border px-4 py-2">
                  <select className="w-full px-2 py-1 border rounded">
                    <option value="Digital Progressive">Digital Progressive</option>
                    <option value="Bifocal">Bifocal</option>
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <select className="w-full px-2 py-1 border rounded">
                    <option value="Digital Progressive">Digital Progressive</option>
                    <option value="Bifocal">Bifocal</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Remarks</label>
          <textarea
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Clinical Comments</label>
          <textarea
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Medications</h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Serial No.</th>
                <th className="border px-4 py-2">Eye</th>
                <th className="border px-4 py-2">Form</th>
                <th className="border px-4 py-2">Medicine</th>
                <th className="border px-4 py-2">Dose</th>
                <th className="border px-4 py-2">Frequency</th>
                <th className="border px-4 py-2">Duration</th>
                <th className="border px-4 py-2">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {medications.map((medication, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    <select
                      name="eye"
                      value={medication.eye}
                      onChange={(e) => handleMedicationChange(e, index)}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="">Select</option>
                      <option value="right_eye">Right Eye</option>
                      <option value="left_eye">Left Eye</option>
                      <option value="both_eye">Both Eyes</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      name="form"
                      value={medication.form}
                      onChange={(e) => handleMedicationChange(e, index)}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="">Select</option>
                      <option value="eye_drop">Eye Drop</option>
                      <option value="tablet">Tablet</option>
                      <option value="capsule">Capsule</option>
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      name="medicine"
                      value={medication.medicine}
                      onChange={(e) => handleMedicationChange(e, index)}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="">Select</option>
                      <option value="vitamin">Vitamin</option>
                      <option value="tablet_medicine">Tablet Medicine</option>
                      {/* Add more options as needed */}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      name="dose"
                      value={medication.dose}
                      onChange={(e) => handleMedicationChange(e, index)}
                      className="w-full px-2 py-1 border rounded"
                      placeholder="E.g., 1 tab, 1 drop"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      name="frequency"
                      value={medication.frequency}
                      onChange={(e) => handleMedicationChange(e, index)}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="">Select</option>
                      <option value="once_daily">Once Daily</option>
                      <option value="twice_daily">Twice Daily</option>
                      {/* Add more options as needed */}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <select
                      name="duration"
                      value={medication.duration}
                      onChange={(e) => handleMedicationChange(e, index)}
                      className="w-full px-2 py-1 border rounded"
                    >
                      <option value="">Select</option>
                      <option value="1_month">1 Month</option>
                      <option value="2_month">2 Months</option>
                      {/* Add more options as needed */}
                    </select>
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      name="remarks"
                      value={medication.remarks}
                      onChange={(e) => handleMedicationChange(e, index)}
                      className="w-full px-2 py-1 border rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            onClick={handleAddMedicationRow}
            className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Add More
          </button>
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

export default DiagnosisForm;
