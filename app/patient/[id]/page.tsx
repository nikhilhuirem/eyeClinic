"use client";
import DiagnosisForm from "@/components/diagonisis";

export default function Doctor({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);
  return (
    <>
      <DiagnosisForm id={id as string} />
    </>
  );
}
