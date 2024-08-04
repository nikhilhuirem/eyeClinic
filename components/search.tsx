"use client";

import Header from "../components/ui/header";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function SearchPatient() {
  const [patientId, setPatientId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(`Patient ID submitted: ${patientId}`);

    try {
      // Make GET request to fetch patient data
      const response = await axios.get(`/api/patient/${patientId}`);
      // If successful, navigate to patient details page
      router.push(`/patient/${patientId}`);
    } catch (error: any) {
      // Set error message if fetch fails
      setError(
        "Failed to fetch patient data. Please check the Patient ID or try again later."
      );
      console.error("Error fetching patient data:", error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setPatientId(value);
    }
  };

  const handleErrorMessageClose = () => {
    // Clear the error message and reset the input field
    setError(null);
    setPatientId("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Header />

      <main className="flex flex-col items-center justify-center flex-1 w-full px-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Search Patient</h2>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded relative flex flex-col items-center">
                <p>{error}</p>
                <button
                  onClick={handleErrorMessageClose}
                  className="mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  OK
                </button>
              </div>
            )}
            <div className="mb-6">
              <label
                htmlFor="patientId"
                className="block text-sm font-medium text-gray-700"
              >
                Patient ID
              </label>
              <input
                type="text"
                id="patientId"
                inputMode="numeric"
                name="patientId"
                value={patientId}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter Patient ID"
                required
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Submit
              </button>
              <Link
                href="/"
                className="w-full px-4 py-2 bg-gray-300 text-black font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center"
              >
                Back
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
