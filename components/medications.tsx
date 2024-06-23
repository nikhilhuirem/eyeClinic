// components/DiagnosisForm.js
"use client"
// components/DiagnosisForm.js
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
      <form>
        {/* Existing form content here */}
        
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

        {/* Existing form content continues here */}

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DiagnosisForm;
