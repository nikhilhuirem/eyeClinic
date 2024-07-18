"use client";
import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";

const PatientForm = () => {
  const [patientType, setPatientType] = useState<string>("new");
  const [consultancyFee, setConsultancyFee] = useState<number>(500);
  const [patientId, setPatientId] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const date = new Date();
    setCurrentTime(date);
    const formattedDate = date.toISOString().slice(0, 10).replace(/-/g, "");
    const formattedTime = date
      .toLocaleTimeString("en-US", { hour12: false })
      .replace(/:/g, "");
    setPatientId(formattedDate + formattedTime);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePatientTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setPatientType(type);

    switch (type) {
      case "new":
        setConsultancyFee(500);
        break;
      case "review":
        setConsultancyFee(200);
        break;
      case "charity":
        setConsultancyFee(0);
        break;
      case "old":
        setConsultancyFee(0);
        break;
      default:
        setConsultancyFee(0);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = Object.fromEntries(formData.entries());

    if (!/^\d{10}$/.test(data.mobile)) {
      alert(
        "Invalid phone number. Please enter a valid 10-digit phone number."
      );
      return;
    }

    // Convert age to an integer
    data.age = parseInt(data.age, 10);

    // Format date and time for MySQL compatibility
    const date = new Date();
    data.date = date.toISOString().split("T")[0]; // YYYY-MM-DD format
    data.time = date.toTimeString().split(" ")[0]; // HH:MM:SS format

    try {
      await axios.post(`/api/patient/${patientId}`, data);
      alert("Patient saved successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error saving patient data:", error);
      alert("Failed to save patient data.");
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md relative">
      <h2 className="text-2xl font-bold mb-4">Patient Form</h2>
      <div className="absolute top-4 right-4">
        {formatDate(currentTime)} {formatTime(currentTime)}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Patient ID
          </label>
          <input
            type="text"
            value={patientId}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Patient Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Sex</label>
          <input
            type="text"
            name="sex"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            required
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Patient Type
          </label>
          <select
            name="patient_type"
            value={patientType}
            onChange={handlePatientTypeChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="new">New</option>
            <option value="review">Review</option>
            <option value="charity">Charity</option>
            <option value="old">Old Patient</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Consultancy Fee
          </label>
          <input
            type="text"
            value={`Rs ${consultancyFee}`}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Payment Status
          </label>
          <select
            name="payment_status"
            defaultValue="not_paid"
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
