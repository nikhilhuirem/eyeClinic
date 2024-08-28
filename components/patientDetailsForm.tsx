"use client";

import React, {
  useState,
  forwardRef,
  useRef,
  useImperativeHandle,
} from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Patient {
  patient_id: string;
  name: string;
  age: number;
  sex: string;
  address: string;
  mobile: string;
}

interface PatientDetailsFormProps {
  patientData: Patient | null;
  onSubmit: (data: Patient) => void;
}

interface PatientDetailsFormRef extends HTMLFormElement {
  getPatientData: () => Patient;
}

// Forward ref to enable ref usage in parent component
const PatientDetailsForm = forwardRef<
  PatientDetailsFormRef,
  PatientDetailsFormProps
>(({ patientData, onSubmit }, ref) => {
  const [showAgeAlert, setShowAgeAlert] = useState(false);
  const [showMobileNumberAlert, setShowMobileNumberAlert] = useState(false);
  const [prevAge, setPrevAge] = useState<number | null>(null);
  const [prevMobile, setPrevMobile] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    watch,
  } = useForm<Patient>({
    mode: "onChange", // This ensures validation happens on field change
  });

  const age = watch("age");
  const mobile = watch("mobile");

  React.useEffect(() => {
    if (patientData) {
      // Use a type assertion to handle the keys correctly
      Object.keys(patientData).forEach((key) => {
        setValue(key as keyof Patient, patientData[key as keyof Patient]);
      });
      setPrevAge(patientData.age);
      setPrevMobile(patientData.mobile);
    }
  }, [patientData, setValue]);

  const handleAgeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const age = parseInt(value, 10);
    if (age < 0 || age > 120) {
      trigger("age"); // Trigger validation to show the error message
      setShowAgeAlert(true);
    } else {
      setValue("age", age);
    }
  };

  const handleMobileBlur = async () => {
    const mobilePattern = /^[1-9][0-9]{9}$/; // Adjust the pattern as needed for your validation
    if (mobile && !mobilePattern.test(mobile)) {
      trigger("mobile"); // Trigger validation to show the error message
      setShowMobileNumberAlert(true);
    }
  };

  const handleAgeAlertConfirm = () => {
    setValue("age", prevAge as number); // Reset age to the previous value
    setShowAgeAlert(false); // Close the alert dialog
  };

  const handleMobileAlertConfirm = () => {
    setValue("mobile", prevMobile as string); // Reset mobile to the previous value
    setShowMobileNumberAlert(false); // Close the alert dialog
  };

  const formRef = useRef<HTMLFormElement>(null);
  // Expose methods or values to parent through ref
  useImperativeHandle(ref, () => ({
    ...(formRef.current as HTMLFormElement), // Explicitly cast to HTMLFormElement to match all form properties
    getPatientData: () => ({
      patient_id: watch("patient_id"),
      name: watch("name"),
      age: watch("age"),
      sex: watch("sex"),
      address: watch("address"),
      mobile: watch("mobile"),
    }),
  }));

  return (
    <>
      <div className="bg-white p-2 rounded shadow-md w-full h-auto">
        <h2 className="text-2xl mb-4">Patient Details:</h2>
        <form
          ref={formRef} // Attach ref to the form element if needed
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-1.5 md:grid-cols-2"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Patient ID</label>
            <input
              type="text"
              {...register("patient_id")}
              className="w-full px-4 py-2 border rounded bg-gray-200"
              readOnly
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              {...register("name")}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              {...register("age", {
                min: { value: 1, message: "Age must be at least 1" },
                max: { value: 120, message: "Age cannot be more than 120" },
              })}
              onChange={handleAgeChange}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.age && showAgeAlert && (
              <p className="text-red-500">{errors.age.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Sex</label>
            <input
              type="text"
              {...register("sex")}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              {...register("address")}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Mobile</label>
            <input
              type="text"
              {...register("mobile", {
                pattern: {
                  value: /^[1-9][0-9]{9}$/,
                  message:
                    "Mobile number must be 10 digits or cannot starts with 0",
                },
              })}
              onBlur={handleMobileBlur}
              className="w-full px-4 py-2 border rounded"
            />
            {errors.mobile && showMobileNumberAlert && (
              <p className="text-red-500">{errors.mobile.message}</p>
            )}
          </div>
        </form>
      </div>
      <AlertDialog open={showAgeAlert} onOpenChange={setShowAgeAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Invalid Age?</AlertDialogTitle>
            <AlertDialogDescription>
              Clicking continue will reset the age value to the previous value.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleAgeAlertConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={showMobileNumberAlert}
        onOpenChange={setShowMobileNumberAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Invalid Mobile Number?</AlertDialogTitle>
            <AlertDialogDescription>
              Clicking continue will reset the mobile number value to the
              previous value.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleMobileAlertConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
});

export default PatientDetailsForm;
