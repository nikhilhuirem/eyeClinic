"use client";

import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
interface EyePrescription {
  eye: string;
  vision_type: string;
  sphere: number | null;
  cylinder: number | null;
  axis: number | null;
  va: string;
}

interface EyePrescriptionFormProps {
  id: string;
}
const EyePerscriptionForm = forwardRef<any, EyePrescriptionFormProps>(
  ({ id }, ref) => {
    const [leftEyeDVPrescriptions, setLeftEyeDVPrescriptions] =
      useState<EyePrescription>({
        eye: "left",
        vision_type: "DV",
        sphere: null,
        cylinder: null,
        axis: null,
        va: "",
      });

    const [leftEyeNVPrescriptions, setLeftEyeNVPrescriptions] =
      useState<EyePrescription>({
        eye: "left",
        vision_type: "NV",
        sphere: null,
        cylinder: null,
        axis: null,
        va: "",
      });

    const [rightEyeDVPrescriptions, setRightEyeDVPrescriptions] =
      useState<EyePrescription>({
        eye: "right",
        vision_type: "DV",
        sphere: null,
        cylinder: null,
        axis: null,
        va: "",
      });

    const [rightEyeNVPrescriptions, setRightEyeNVPrescriptions] =
      useState<EyePrescription>({
        eye: "right",
        vision_type: "NV",
        sphere: null,
        cylinder: null,
        axis: null,
        va: "",
      });

    useEffect(() => {
      const fetchEyePerscription = async () => {
        try {
          const response = await axios.get(`/api/eye_perscription/${id}`);
          if (response.data && typeof response.data == "object") {
            setLeftEyeDVPrescriptions(
              response.data.filter(
                (item: { eye: string; vision_type: string }) =>
                  item.eye === "left" && item.vision_type === "DV"
              )
            );
            setLeftEyeNVPrescriptions(
              response.data.filter(
                (item: { eye: string; vision_type: string }) =>
                  item.eye === "left" && item.vision_type === "NV"
              )
            );
            setRightEyeDVPrescriptions(
              response.data.filter(
                (item: { eye: string; vision_type: string }) =>
                  item.eye === "right" && item.vision_type === "DV"
              )
            );
            setRightEyeNVPrescriptions(
              response.data.filter(
                (item: { eye: string; vision_type: string }) =>
                  item.eye === "right" && item.vision_type === "NV"
              )
            );
          }
        } catch (error) {
          console.log("continuing with empty values");
        }
      };
      fetchEyePerscription();
    }, [id]);
    useEffect(() => {
      console.log(leftEyeDVPrescriptions);
    }, [leftEyeDVPrescriptions]);

    return (
      <div className="rounded-md border">
        <Table></Table>
      </div>
    );
  }
);

export default EyePerscriptionForm;
