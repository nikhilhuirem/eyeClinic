"use client";

import React, { useState } from "react";
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

interface patient {
  patient_id: string;
  name: string;
  age: number;
  sex: string;
  address: string;
  mobile: string;
}

interface PatientDetailsFormProps {
  patientData: patient | null;
  onSubmit: (data: patient) => void;
}

const PatientDetailsForm: React.FC<PatientDetailsFormProps> = ({
  patientData,
  onSubmit,
}) => {
  const [showAgeAlert, setShowAgeAlert] = useState(false);
  const [showMobileAlert, setShowMobileAlert] = useState(false);
  const [prevAge, setPrevAge] = useState<number | null>(null);
  const [prevMobile, setPrevMobile] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
    watch,
  } = useForm<patient>({
    mode: "onChange", // This ensures validation happens on field change
  });

  const age = watch("age");
  const mobile = watch("mobile");

  React.useEffect(() => {
    if (patientData) {
      // Use a type assertion to handle the keys correctly
      Object.keys(patientData).forEach((key) => {
        setValue(key as keyof patient, patientData[key as keyof patient]);
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
      setShowMobileAlert(true);
    }
  };

  const handleAgeAlertConfirm = () => {
    setValue("age", prevAge as number); // Reset age to the previous value
    setShowAgeAlert(false); // Close the alert dialog
  };

  const handleMobileAlertConfirm = () => {
    setValue("mobile", prevMobile as string); // Reset mobile to the previous value
    setShowMobileAlert(false); // Close the alert dialog
  };

  return (
    <>
      <div className="bg-white p-6 rounded shadow-md w-full h-auto">
        <h2 className="text-2xl mb-4">Patient Details:</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
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
            {errors.mobile && showMobileAlert && (
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
      <AlertDialog open={showMobileAlert} onOpenChange={setShowMobileAlert}>
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
};

export default PatientDetailsForm;
