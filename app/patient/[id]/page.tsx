"use client";
import DiagnosisForm from "@/components/patientParentComponent";

export default function Doctor({ params }: { params: { id: string } }) {
  const id = params.id;

  return (
    <>
      <DiagnosisForm id={id as string} />
    </>
  );
}
