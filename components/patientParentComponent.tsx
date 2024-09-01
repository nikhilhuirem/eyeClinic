"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import Header from "./ui/header";
import PatientDetailsForm from "./patientDetailsForm";
import ComplaintForm from "./complaintForm";
import EyePerscriptionForm from "./eye_prescription";
import ClinicalCommentAndActionPlan from "./clinicalCommentAndActionPlan";
import DatePickerWithPresets from "./reviewDate";
import { Label } from "@radix-ui/react-label";
import { Console } from "console";

interface Medication {
  sl_no: number;
  eye: string;
  form: string;
  medicine: string;
  dose: string;
  frequency: string;
  duration: string;
  remarks: string;
}

interface Diagnosis {
  clinical_comment: string;
  action_plan: string;
  review_date: string;
  complaint: string;
}

interface EyeDiagnosis {
  sl_no: number;
  eye: string;
  diagnosis: string;
}

interface EyePrescription {
  eye: string;
  vision_type: string;
  sphere: number;
  cylinder: number;
  axis: number;
  va: string;
}

interface GlassPrescription {
  eye: string;
  glass_type: string;
  lens_type: string;
}

interface Patient {
  patient_id: string;
  name: string;
  age: number;
  sex: string;
  address: string;
  mobile: string;
}

type ErrorMessages = {
  diagnosis?: string;
  patient?: string;
  eye_prescription?: string;
};

interface DiagnosisFormProps {
  id: string;
}

const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ id }) => {
  const [patientData, setPatientData] = useState<Patient | null>(null);
  const [complaints, setComplaints] = useState<string | undefined>(undefined);
  const [diagnosisData, setDiagnosisData] = useState<Diagnosis>({
    clinical_comment: "",
    action_plan: "",
    review_date: "",
    complaint: "",
  });
  const [diagnosisDataToSubmit, setDiagnosisDataToSubmit] = useState<Diagnosis>(
    { clinical_comment: "", action_plan: "", review_date: "", complaint: "" }
  );
  const [commentChangeHolder, setCommentChange] = useState<string>("");
  const [actionPlanChangeHolder, setActionPlanChange] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Create a ref to access ComplaintForm methods
  const complaintFormRef = useRef<any>(null);
  const patientDetailsRef = useRef<any>(null);
  const eyePrescriptionRef = useRef<any>(null);

  const isObjectNotEmpty = (
    obj: Diagnosis | { [s: string]: unknown } | ArrayLike<unknown>
  ) =>
    Object.values(obj).every((value) => value !== null && value !== undefined);
  const convertEyePrescriptionData = (
    eyePrescriptionData: Record<string, EyePrescription>
  ): EyePrescription[] => {
    // Extract the EyePrescription objects and return them as an array
    return Object.values(eyePrescriptionData);
  };

  let errorMessages: ErrorMessages = {};
  const handleSubmit = () => {
    const newComplaints = complaintFormRef.current?.getComplaintsData();
    const newPatientData = patientDetailsRef.current?.getPatientData();
    const eyePrescriptionData: Record<string, EyePrescription> | undefined =
      eyePrescriptionRef.current?.getEyePrescriptions();

    let skipEyePrescriptionCall = false;

    // Ensure eyePrescriptionData is not null and is an object
    if (!eyePrescriptionData || Object.keys(eyePrescriptionData).length === 0) {
      console.log("Ignored");
      skipEyePrescriptionCall = true; // Set flag to skip eye prescription API call
    } else {
      let allFieldsNullOrEmpty = true;

      // Iterate over the values of the eyePrescriptionData object
      for (const prescription of Object.values(eyePrescriptionData)) {
        if (
          prescription.sphere !== null &&
          prescription.cylinder !== null &&
          prescription.axis !== null &&
          prescription.va.trim() !== ""
        ) {
          allFieldsNullOrEmpty = false;
        } else if (
          prescription.sphere === null &&
          prescription.cylinder === null &&
          prescription.axis === null &&
          prescription.va.trim() === ""
        ) {
          allFieldsNullOrEmpty = true;
        } else {
          errorMessages.eye_prescription =
            "All fields in the eye prescription data must be filled.";
          break; // Exit loop if validation fails
        }
      }

      if (allFieldsNullOrEmpty) {
        console.log(
          "Skipped eye prescription API call due to all fields being null or empty"
        );
        skipEyePrescriptionCall = true; // Set flag to skip eye prescription API call
      }
    }

    if (Object.keys(errorMessages).length > 0) {
      if (eyePrescriptionRef.current) {
        eyePrescriptionRef.current.setErrorMessages(
          errorMessages.eye_prescription
        );
      }
      return;
    }

    const updatedData = {
      ...diagnosisDataToSubmit,
      complaint: newComplaints || diagnosisDataToSubmit.complaint,
      clinical_comment:
        diagnosisData.clinical_comment + (commentChangeHolder || ""),
      action_plan: diagnosisData.action_plan + (actionPlanChangeHolder || ""),
    };

    setDiagnosisDataToSubmit(updatedData);

    // Now you can check if `updatedData` is valid and submit the data
    if (isObjectNotEmpty(updatedData)) {
      submitDiagnosis(updatedData);
    }

    if (!skipEyePrescriptionCall) {
      if (eyePrescriptionData) {
        // Convert eyePrescriptionData for API call
        const convertedEyePrescriptionData =
          convertEyePrescriptionData(eyePrescriptionData);
        submitEyePrescription(convertedEyePrescriptionData);
      }
    }
  };

  const submitDiagnosis = async (data: Diagnosis) => {
    try {
      await axios.post(`/api/diagnosis/${id}`, data);
      setError(null);
      console.log("Complaints submitted successfully!");
    } catch (error) {
      errorMessages.diagnosis = "Failed to submit Diagnosis.";
      if (Object.keys(errorMessages).length > 0) {
        if (complaintFormRef.current) {
          complaintFormRef.current.setErrorMessages(errorMessages.diagnosis);
        }
        return;
      }
    }
  };

  const submitEyePrescription = async (data: EyePrescription[]) => {
    try {
      await axios.post(`/api/eye_prescription/${id}`, data);
      setError(null);
      console.log("Eye Prescription submitted successfully!");
    } catch (error) {
      errorMessages.eye_prescription = "Failed to submit Eye Prescription.";
      if (Object.keys(errorMessages).length > 0) {
        if (eyePrescriptionRef.current) {
          eyePrescriptionRef.current.setErrorMessages(
            errorMessages.eye_prescription
          );
        }
        return;
      }
    }
  };

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
        console.log(response.data);
        if (response.status === 404) {
          // Handle 404 error by keeping diagnosisData and diagnosisDataToSubmit empty
          setDiagnosisData({
            clinical_comment: "",
            action_plan: "",
            review_date: "",
            complaint: "",
          });
          setDiagnosisDataToSubmit({
            clinical_comment: "",
            action_plan: "",
            review_date: "",
            complaint: "",
          });
        } else if (response.data && typeof response.data === "object") {
          setDiagnosisData(response.data);
          setDiagnosisDataToSubmit({
            clinical_comment: response.data.clinical_comment || "",
            action_plan: response.data.action_plan || "",
            review_date: response.data.review_date || "",
            complaint: response.data.complaint || "",
          });
          if (response.data.complaint) {
            setComplaints(response.data.complaint);
          }
        } else {
          setError("Unexpected response format");
        }
      } catch (error: any) {
        if (error.response && error.response.status === 404) {
          // Handle 404 error by keeping diagnosisData and diagnosisDataToSubmit empty
          setDiagnosisData({
            clinical_comment: "",
            action_plan: "",
            review_date: "",
            complaint: "",
          });
          setDiagnosisDataToSubmit({
            clinical_comment: "",
            action_plan: "",
            review_date: "",
            complaint: "",
          });
        } else {
          setError("Error fetching diagnosis data");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDiagnosisData();
  }, [id]);

  const handleCommentChange = (value: string) => {
    setCommentChange(value);
  };

  const handleActionPlanChange = (value: string) => {
    setActionPlanChange(value);
  };

  const handleReviewDateChange = (newDate: string) => {
    setDiagnosisDataToSubmit((prevDiagnosis) => ({
      ...prevDiagnosis,
      review_date: newDate,
    }));
  };

  if (loading) {
    return <div>Loading for something...</div>;
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
        <PatientDetailsForm
          patientData={patientData}
          onSubmit={handleSubmit}
          ref={patientDetailsRef}
        />
      </div>
      <div className="flex flex-col items-center bg-gray-100 w-full p-1">
        <ComplaintForm
          complaintsData={complaints}
          ref={complaintFormRef}
          onComplaintError={setError}
        />
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
        <EyePerscriptionForm id={id} ref={eyePrescriptionRef} />
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
      <div className="flex flex-col items-center bg-gray-100 w-full p-1">
        <div className="bg-white p-6 rounded shadow-md w-full mx-auto">
          <Button onClick={handleSubmit} className="mt-4">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DiagnosisForm;
