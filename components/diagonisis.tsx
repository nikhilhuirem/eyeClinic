"use client";
import React, { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface medication {
  sl_no: number;
  eye: string;
  form: string;
  medicine: string;
  dose: string;
  frequency: string;
  duration: string;
  remarks: string;
}

interface diagnosis {
  clinical_comment: string;
  action_plan: string;
  review_date: string;
  comment: string;
}

interface eyeDiagnosis {
  sl_no: number;
  eye: string;
  diagnosis: string;
}

interface eye_perscription {
  eye: string;
  vision_type: string;
  sphere: number;
  cylinder: number;
  axis: number;
  va: string;
}

interface glass_perscription {
  eye: string;
  glass_type: string;
  lens_type: string;
}
interface patient {
  name: string;
  age: number;
  sex: string;
  address: string;
  mobile: string;
}
const DiagnosisForm = () => {
  const { register, handleSubmit, control, setValue } = useForm<FormData>();

  const initialMedicationRow: medication = {
    sl_no: 1,
    eye: "",
    form: "",
    medicine: "",
    dose: "",
    frequency: "",
    duration: "",
    remarks: "",
  };

  const [medications, setMedications] = useState<medication[]>([
    initialMedicationRow,
  ]);

  const handleAddMedicationRow = () => {
    setMedications([...medications, initialMedicationRow]);
  };

  const handleMedicationChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedMedications = [...medications];
    updatedMedications[index] = { ...updatedMedications[index], [name]: value };
    setMedications(updatedMedications);
    setValue(`medications.${index}.${name}`, value as never);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch("/api/diagnosis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
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
              <input
                type="text"
                {...register("glassType.rightEye")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Left Eye
              </label>
              <input
                type="text"
                {...register("glassType.leftEye")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
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
              <input
                type="text"
                {...register("lensType.rightEye")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Left Eye
              </label>
              <input
                type="text"
                {...register("lensType.leftEye")}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
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
            <div key={index} className="grid grid-cols-7 gap-4 mb-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Eye
                </label>
                <select
                  name="eye"
                  value={medication.eye}
                  onChange={(e) => handleMedicationChange(e, index)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value=""></option>
                  <option value="right">Right</option>
                  <option value="left">Left</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Form
                </label>
                <input
                  type="text"
                  name="form"
                  value={medication.form}
                  onChange={(e) => handleMedicationChange(e, index)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Medicine
                </label>
                <input
                  type="text"
                  name="medicine"
                  value={medication.medicine}
                  onChange={(e) => handleMedicationChange(e, index)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dose
                </label>
                <input
                  type="text"
                  name="dose"
                  value={medication.dose}
                  onChange={(e) => handleMedicationChange(e, index)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Frequency
                </label>
                <input
                  type="text"
                  name="frequency"
                  value={medication.frequency}
                  onChange={(e) => handleMedicationChange(e, index)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={medication.duration}
                  onChange={(e) => handleMedicationChange(e, index)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Remarks
                </label>
                <input
                  type="text"
                  name="remarks"
                  value={medication.remarks}
                  onChange={(e) => handleMedicationChange(e, index)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddMedicationRow}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Medication
          </button>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default DiagnosisForm;
