"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./ui/header";
import PatientDetailsForm from "./patientDetailsForm";
import ComplaintForm from "./complaintForm";
import ClinicalCommentAndActionPlan from "./clinicalCommentAndActionPlan";
import DatePickerWithPresets from "./reviewDate";
import { Label } from "@radix-ui/react-label";

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
  const [complaints, setComplaints] = useState<string>();
  const [diagnosisData, setDiagnosisData] = useState<diagnosis>({
    clinical_comment: "",
    action_plan: "",
    review_date: "",
    complaint: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/patient/${id}`);
        if (response.data && typeof response.data === "object") {
          setPatientData(response.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchDiagnosisData = async () => {
      try {
        const response = await axios.get(`/api/diagnosis/${id}`);
        if (response.data && typeof response.data === "object") {
          setDiagnosisData(response.data);
          if (response.data.complaint) {
            setComplaints(response.data.complaint);
          }
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnosisData();
  }, [id]);

  const handleCommentChange = (value: string) => {
    setDiagnosisData((prevDiagnosis) => ({
      ...prevDiagnosis,
      clinical_comment: value,
    }));
  };

  const handleActionPlanChange = (value: string) => {
    setDiagnosisData((prevDiagnosis) => ({
      ...prevDiagnosis,
      action_plan: value,
    }));
  };

  const handleReviewDateChange = (newDate: string) => {
    setDiagnosisData((prevDiagnosis) => ({
      ...prevDiagnosis,
      review_date: newDate,
    }));
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      // Handle form submission logic
    }
  };

  const validateForm = () => {
    // Add validation logic here
    return true;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!patientData) {
    return <div>No data available</div>;
  }

  return (
    <div className="min-h-screen flex items-center flex-col bg-gray-100 w-full">
      <div className="w-full">
        <Header />
      </div>
      <div className="flex flex-col items-center bg-gray-100 w-full p-1">
        <PatientDetailsForm patientData={patientData} onSubmit={handleSubmit} />
      </div>
      <div className="flex flex-col items-center bg-gray-100 w-full p-1">
        <ComplaintForm complaintsData={complaints} />
      </div>
      <div className="flex flex-col items-center bg-gray-100 w-full p-1">
        <ClinicalCommentAndActionPlan
          clinical_comment={diagnosisData?.clinical_comment}
          action_plan={diagnosisData?.action_plan}
          onCommentChange={handleCommentChange}
          onActionPlanChange={handleActionPlanChange}
        />
      </div>
      <div className="flex flex-col items-center bg-gray-100 w-full p-1">
        <div className="bg-white p-6 rounded shadow-md w-full mx-auto">
          <section className="border-t border-b py-4">
            <Label className="font-bold mb-2">Review Date: </Label>
            <DatePickerWithPresets
              dateInString={diagnosisData?.review_date}
              onReviewDateChange={handleReviewDateChange}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisForm;
