import React, { useState, forwardRef, useImperativeHandle } from "react";

interface EyePrescription {
  sphereDV: number;
  cylinderDV: number;
  axisDV: number;
  sphereNV?: number;
  cylinderNV?: number;
  axisNV?: number;
  vaNV?: string; // Assuming VA is a string
}

interface Props {
  prescription: EyePrescription;
}

const EyePrescriptionForm = forwardRef(({ prescription }: Props, ref) => {
  const [nvSphereInput, setNvSphereInput] = useState<string>("");
  const [nvSphereError, setNvSphereError] = useState<string | null>(null);
  const [nvVa, setNvVa] = useState<string>("");
  const [eyePrescription, setEyePrescription] = useState<EyePrescription>({
    ...prescription,
    sphereNV: undefined,
    cylinderNV: undefined,
    axisNV: undefined,
  });

  const handleNvSphereChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNvSphereInput(e.target.value);
    setNvSphereError(null); // Reset error on input change
  };

  const validateNvSphereInput = (value: number) => {
    if (value < 0.75 || value > 3.0 || value % 0.25 !== 0) {
      setNvSphereError(
        "Value must be between 0.75 and 3.00 and divisible by 0.25"
      );
      return false;
    }
    return true;
  };

  const handleAddNvSphere = () => {
    const nvSphereValue = parseFloat(nvSphereInput);

    if (isNaN(nvSphereValue) || !validateNvSphereInput(nvSphereValue)) {
      setNvSphereError(
        "Please enter a valid number between 0.75 and 3.00, divisible by 0.25"
      );
      return;
    }

    // Update NV Sphere value based on DV Sphere + NV Sphere input
    const newSphereNV = prescription.sphereDV + nvSphereValue;
    const updatedPrescription: EyePrescription = {
      ...eyePrescription,
      sphereNV: newSphereNV,
      cylinderNV: prescription.cylinderDV,
      axisNV: prescription.axisDV,
      vaNV: nvVa,
    };

    setEyePrescription(updatedPrescription);
  };

  useImperativeHandle(ref, () => ({
    getValues: () => {
      if (
        !eyePrescription.sphereNV &&
        !eyePrescription.cylinderNV &&
        !eyePrescription.axisNV
      ) {
        return null;
      }
      if (
        (eyePrescription.sphereNV !== undefined &&
          (eyePrescription.cylinderNV === undefined ||
            eyePrescription.axisNV === undefined)) ||
        (eyePrescription.cylinderNV !== undefined &&
          (eyePrescription.sphereNV === undefined ||
            eyePrescription.axisNV === undefined)) ||
        (eyePrescription.axisNV !== undefined &&
          (eyePrescription.sphereNV === undefined ||
            eyePrescription.cylinderNV === undefined))
      ) {
        alert("Please fill out all fields or the values will be discarded.");
        return null;
      }
      return [
        {
          sphereNV: eyePrescription.sphereNV,
          cylinderNV: eyePrescription.cylinderNV,
          axisNV: eyePrescription.axisNV,
          vaNV: eyePrescription.vaNV,
        },
      ];
    },
  }));

  return (
    <div>
      <div>
        <label>NV Sphere Adjustment:</label>
        <input
          type="number"
          step="0.25"
          value={nvSphereInput}
          onChange={handleNvSphereChange}
        />
        {nvSphereError && <p style={{ color: "red" }}>{nvSphereError}</p>}
      </div>
      <div>
        <label>NV VA:</label>
        <input
          type="text"
          value={nvVa}
          onChange={(e) => setNvVa(e.target.value)}
        />
      </div>
      <button onClick={handleAddNvSphere}>Add NV Sphere</button>
    </div>
  );
});

export default EyePrescriptionForm;
