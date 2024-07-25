"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface Medication {
  eye: string;
  form: string;
  medicine: string;
  dose: string;
  frequency: string;
  duration: string;
  remarks: string;
}

interface FormData {
  comments: string;
  diagnosisOU: string;
  diagnosisOD: string;
  diagnosisOS: string;
  glassPrescription: {
    rightEye: {
      sph: number;
      cyl: number;
      axis: number;
      va: number;
    };
    leftEye: {
      sph: number;
      cyl: number;
      axis: number;
      va: number;
    };
  };
  glassType: {
    rightEye: string;
    leftEye: string;
  };
  lensType: {
    rightEye: string;
    leftEye: string;
  };
  remarks: string;
  clinicalComments: string;
  medications: Medication[];
}

const DiagnosisForm = () => {
  const { register, handleSubmit, control, setValue } = useForm<FormData>();

  const initialMedicationRow = {
    eye: "",
    form: "",
    medicine: "",
    dose: "",
    frequency: "",
    duration: "",
    remarks: "",
  };

  const [medications, setMedications] = useState([initialMedicationRow]);

  const handleAddMedicationRow = () => {
    setMedications([...medications, initialMedicationRow]);
  };

  const handleMedicationChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedMedications = [...medications];
    updatedMedications[index][name] = value;
    setMedications(updatedMedications);
    setValue(`medications.${index}.${name}`, value as never);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/diagnosis', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-10xl mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Diagnosis Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            {...register("comments")}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Diagnosis</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OU
              </label>
              <input
                type="text"
                {...register("diagnosisOU")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OD
              </label>
              <input
                type="text"
                {...register("diagnosisOD")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                OS
              </label>
              <input
                type="text"
                {...register("diagnosisOS")}
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
                <th colSpan={4} className="border px-4 py-2 text-center">
                  Right Eye
                </th>
                <th colSpan={4} className="border px-4 py-2 text-center">
                  Left Eye
                </th>
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
                <td className="border px-4 py-2 bg-white border border-gray-300">
                  <input
                    type="text"
                    {...register("glassPrescription.rightEye.sph")}
                    className="w-full px-2 py-1 border rounded "
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.rightEye.cyl")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.rightEye.axis")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.rightEye.va")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.leftEye.sph")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.leftEye.cyl")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.leftEye.axis")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.leftEye.va")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
              </tr>
              <tr>
                <td className="border px-4 py-2">NV</td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.rightEye.sph")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.rightEye.cyl")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.rightEye.axis")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.rightEye.va")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.leftEye.sph")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.leftEye.cyl")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.leftEye.axis")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    {...register("glassPrescription.leftEye.va")}
                    className="w-full px-2 py-1 border rounded"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Glass Type</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Right Eye
              </label>
              <select
                {...register("glassType.rightEye")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="singleVision">Single Vision</option>
                <option value="bifocal">Bifocal</option>
                <option value="progressive">Progressive</option>
                <option value="contactLens">Contact Lens</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Left Eye
              </label>
              <select
                {...register("glassType.leftEye")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="singleVision">Single Vision</option>
                <option value="bifocal">Bifocal</option>
                <option value="progressive">Progressive</option>
                <option value="contactLens">Contact Lens</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Lens Type</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Right Eye
              </label>
              <select
                {...register("lensType.rightEye")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="normal">Normal</option>
                <option value="blueCut">Blue Cut</option>
                <option value="photochromatic">Photochromatic</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Left Eye
              </label>
              <select
                {...register("lensType.leftEye")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="normal">Normal</option>
                <option value="blueCut">Blue Cut</option>
                <option value="photochromatic">Photochromatic</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Remarks
          </label>
          <textarea
            {...register("remarks")}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">
            Clinical Comments
          </label>
          <textarea
            {...register("clinicalComments")}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Medications</h3>
          {medications.map((medication, index) => (
            <div key={index} className="grid grid-cols-6 gap-4 mb-4">
              <select
                name="eye"
                value={medication.eye}
                onChange={(e) => handleMedicationChange(e, index)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="OD">OD</option>
                <option value="OS">OS</option>
                <option value="OU">OU</option>
              </select>
              <select
                name="form"
                value={medication.form}
                onChange={(e) => handleMedicationChange(e, index)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="tablet">Tablet</option>
                <option value="drops">Drops</option>
                <option value="ointment">Ointment</option>
              </select>
              <input
                name="medicine"
                value={medication.medicine}
                onChange={(e) => handleMedicationChange(e, index)}
                type="text"
                placeholder="Medicine"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                name="dose"
                value={medication.dose}
                onChange={(e) => handleMedicationChange(e, index)}
                type="text"
                placeholder="Dose"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                name="frequency"
                value={medication.frequency}
                onChange={(e) => handleMedicationChange(e, index)}
                type="text"
                placeholder="Frequency"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                name="duration"
                value={medication.duration}
                onChange={(e) => handleMedicationChange(e, index)}
                type="text"
                placeholder="Duration"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              <input
                name="remarks"
                value={medication.remarks}
                onChange={(e) => handleMedicationChange(e, index)}
                type="text"
                placeholder="Remarks"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMedicationRow}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
          >
            Add Medication
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DiagnosisForm;
