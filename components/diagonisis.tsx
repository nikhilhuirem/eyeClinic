"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./ui/header";
import PatientDetailsForm from "./patientDetailsForm";

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
  complaint: string;
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
  patient_id: string;
  name: string;
  age: number;
  sex: string;
  address: string;
  mobile: string;
}

interface DiagnosisFormProps {
  id: string;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ id }) => {
  const [patientData, setPatientData] = useState<patient | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(`Fetching data for id: ${id}`);
        const response = await axios.get(`/api/patient/${id}`);
        console.log("Fetch successful:", response.data);
        if (response.data && typeof response.data === "object") {
          setPatientData(response.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (!patientData) {
    return <div>No data available</div>;
  }

  const onSubmit = (data: patient) => {
    console.log("Form Data Submitted: ", data);
    // You can handle form submission here
  };

  return (
    <div className="min-h-screen flex items-center flex-col bg-gray-100 w-full">
      <div className="w-full">
        <Header />
      </div>
      <div className="flex flex-col items-center bg-gray-100 w-full p-4">
        <PatientDetailsForm patientData={patientData} onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default DiagnosisForm;
