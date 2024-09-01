"use client";

import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "./ui/button";

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

const EyePrescriptionForm = forwardRef<any, EyePrescriptionFormProps>(
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
    const [rightDVSphereInput, setRightDVSphereInput] = useState<string>("");
    const [rightDVCylinderInput, setRightDVCylinderInput] =
      useState<string>("");
    const [rightDVAxisInput, setRightDVAxisInput] = useState<string>("");
    const [LeftDVSphereInput, setLeftDVSphereInput] = useState<string>("");
    const [leftDVCylinderInput, setLeftDVCylinderInput] = useState<string>("");
    const [leftDVAxisInput, setLeftDVAxisInput] = useState<string>("");

    const [rightNVSphereInput, setRightNVSphereInput] = useState<string>("");
    const [rightNVCylinderInput, setRightNVCylinderInput] =
      useState<string>("");
    const [rightNVAxisInput, setRightNVAxisInput] = useState<string>("");
    const [leftNVSphereInput, setLeftNVSphereInput] = useState<string>("");
    const [leftNVCylinderInput, setLeftNVCylinderInput] = useState<string>("");
    const [leftNVAxisInput, setLeftNVAxisInput] = useState<string>("");

    const [nvSphereInput, setNvSphereInput] = useState<string>("");
    const [nvSphereError, setNvSphereError] = useState<string | null>(null);

    useEffect(() => {
      const fetchEyePrescription = async () => {
        try {
          const response = await axios.get(`/api/eye_perscription/${id}`);
          if (response.data && typeof response.data == "object") {
            const leftDV = response.data.find(
              (item: EyePrescription) =>
                item.eye === "left" && item.vision_type === "DV"
            );
            const leftNV = response.data.find(
              (item: EyePrescription) =>
                item.eye === "left" && item.vision_type === "NV"
            );
            const rightDV = response.data.find(
              (item: EyePrescription) =>
                item.eye === "right" && item.vision_type === "DV"
            );
            const rightNV = response.data.find(
              (item: EyePrescription) =>
                item.eye === "right" && item.vision_type === "NV"
            );

            if (leftDV) setLeftEyeDVPrescriptions(leftDV);
            if (leftNV) setLeftEyeNVPrescriptions(leftNV);
            if (rightDV) setRightEyeDVPrescriptions(rightDV);
            if (rightNV) setRightEyeNVPrescriptions(rightNV);
          }
        } catch (error) {
          console.log("continuing with empty values");
        }
      };
      fetchEyePrescription();
    }, [id]);

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
      console.log("NV trigger");
      setNvSphereError("");
      const nvSphereValue = parseFloat(nvSphereInput);

      // Check if the input is a valid number and falls within the valid range
      if (isNaN(nvSphereValue) || !validateNvSphereInput(nvSphereValue)) {
        setNvSphereError(
          "Please enter a valid number between 0.75 and 3.00, divisible by 0.25"
        );
        return;
      }

      // Check if DV prescription values are not null before proceeding
      if (
        leftEyeDVPrescriptions.sphere === null ||
        leftEyeDVPrescriptions.cylinder === null ||
        leftEyeDVPrescriptions.axis === null ||
        rightEyeDVPrescriptions.sphere === null ||
        rightEyeDVPrescriptions.cylinder === null ||
        rightEyeDVPrescriptions.axis === null
      ) {
        setNvSphereError(
          "Please ensure all DV prescription values are provided before adding NV values."
        );
        return;
      }

      // Proceed with creating new NV prescriptions since all validations passed
      const newLeftNVPrescription: EyePrescription = {
        ...leftEyeNVPrescriptions, // Preserve existing NV prescription state
        sphere: leftEyeDVPrescriptions.sphere + nvSphereValue, // Example adjustment
        cylinder: leftEyeDVPrescriptions.cylinder,
        axis: leftEyeDVPrescriptions.axis,
      };

      const newRightNVPrescription: EyePrescription = {
        ...rightEyeNVPrescriptions, // Preserve existing NV prescription state
        sphere: rightEyeDVPrescriptions.sphere + nvSphereValue, // Example adjustment
        cylinder: rightEyeDVPrescriptions.cylinder,
        axis: rightEyeDVPrescriptions.axis,
      };

      // Update states with new NV prescriptions
      setLeftEyeNVPrescriptions(newLeftNVPrescription);
      setRightEyeNVPrescriptions(newRightNVPrescription);
    };
    useEffect(() => {
      setLeftNVSphereInput(leftEyeNVPrescriptions.sphere?.toString() || "");
      setLeftNVCylinderInput(leftEyeNVPrescriptions.cylinder?.toString() || "");
      setLeftNVAxisInput(leftEyeNVPrescriptions.axis?.toString() || "");
      setRightNVSphereInput(rightEyeNVPrescriptions.sphere?.toString() || "");
      setRightNVCylinderInput(
        rightEyeNVPrescriptions.cylinder?.toString() || ""
      );
      setRightNVAxisInput(rightEyeNVPrescriptions.axis?.toString() || "");
    }, [leftEyeNVPrescriptions, rightEyeNVPrescriptions]);

    useEffect(() => {
      setLeftDVSphereInput(leftEyeDVPrescriptions.sphere?.toString() || "");
      setLeftDVCylinderInput(leftEyeDVPrescriptions.cylinder?.toString() || "");
      setLeftDVAxisInput(leftEyeDVPrescriptions.axis?.toString() || "");
      setRightDVSphereInput(rightEyeDVPrescriptions.sphere?.toString() || "");
      setRightDVCylinderInput(
        rightEyeDVPrescriptions.cylinder?.toString() || ""
      );
      setRightDVAxisInput(rightEyeDVPrescriptions.axis?.toString() || "");
    }, [leftEyeDVPrescriptions, rightEyeDVPrescriptions]);

    return (
      <Card className="w-full">
        <CardHeader className="bg-muted px-6 py-4">
          <CardTitle>Glass Prescription</CardTitle>
        </CardHeader>
        <CardContent className="px-6 py-4">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Right Eye</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead />
                    <TableHead>SPH</TableHead>
                    <TableHead>CYL</TableHead>
                    <TableHead>Axis</TableHead>
                    <TableHead>V/A</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">DV</TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={rightDVSphereInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setRightDVSphereInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setRightEyeDVPrescriptions((prev) => ({
                            ...prev,
                            sphere: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setRightDVSphereInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={rightDVCylinderInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setRightDVCylinderInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setRightEyeDVPrescriptions((prev) => ({
                            ...prev,
                            cylinder: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setRightDVCylinderInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={rightDVAxisInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setRightDVAxisInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setRightEyeDVPrescriptions((prev) => ({
                            ...prev,
                            axis: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setRightDVAxisInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={rightEyeDVPrescriptions.va}
                        onValueChange={(value) =>
                          setRightEyeDVPrescriptions((prev) => ({
                            ...prev,
                            va: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select V/A" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6/6">6/6</SelectItem>
                          <SelectItem value="6/6p">6/6p</SelectItem>
                          <SelectItem value="6/9">6/9</SelectItem>
                          <SelectItem value="6/9p">6/9p</SelectItem>
                          <SelectItem value="6/12">6/12</SelectItem>
                          <SelectItem value="6/12p">6/12p</SelectItem>
                          <SelectItem value="6/18">6/18</SelectItem>
                          <SelectItem value="6/18p">6/18p</SelectItem>
                          <SelectItem value="6/24">6/24</SelectItem>
                          <SelectItem value="6/24p">6/24p</SelectItem>
                          <SelectItem value="6/36">6/36</SelectItem>
                          <SelectItem value="6/36p">6/36p</SelectItem>
                          <SelectItem value="CF3">CF3</SelectItem>
                          <SelectItem value="CF2">CF2</SelectItem>
                          <SelectItem value="CF1">CF1</SelectItem>
                          <SelectItem value="CFCF">CFCF</SelectItem>
                          <SelectItem value="HM+">HM+</SelectItem>
                          <SelectItem value="PL +ve">PL +ve</SelectItem>
                          <SelectItem value="PL -ve">PL -ve</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">NV</TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={rightNVSphereInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setRightNVSphereInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setRightEyeNVPrescriptions((prev) => ({
                            ...prev,
                            sphere: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setRightNVSphereInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={rightNVCylinderInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setRightNVCylinderInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setRightEyeNVPrescriptions((prev) => ({
                            ...prev,
                            cylinder: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setRightNVCylinderInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={rightNVAxisInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setRightNVAxisInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setRightEyeNVPrescriptions((prev) => ({
                            ...prev,
                            axis: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setRightNVAxisInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={rightEyeNVPrescriptions.va}
                        onValueChange={(value) =>
                          setRightEyeNVPrescriptions((prev) => ({
                            ...prev,
                            va: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select V/A" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="N6">N6</SelectItem>
                          <SelectItem value="N8">N8</SelectItem>
                          <SelectItem value="N10">N10</SelectItem>
                          <SelectItem value="N12">N12</SelectItem>
                          <SelectItem value="N18">N18</SelectItem>
                          <SelectItem value="N24">N24</SelectItem>
                          <SelectItem value="N36">N36</SelectItem>
                          <SelectItem value="<N36">&lt;N36</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Left Eye</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead />
                    <TableHead>SPH</TableHead>
                    <TableHead>CYL</TableHead>
                    <TableHead>Axis</TableHead>
                    <TableHead>V/A</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">DV</TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={LeftDVSphereInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setLeftDVSphereInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setLeftEyeDVPrescriptions((prev) => ({
                            ...prev,
                            sphere: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setLeftDVSphereInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={leftDVCylinderInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setLeftDVCylinderInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setLeftEyeDVPrescriptions((prev) => ({
                            ...prev,
                            cylinder: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setLeftDVCylinderInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={leftDVAxisInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setLeftDVAxisInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setLeftEyeDVPrescriptions((prev) => ({
                            ...prev,
                            axis: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setLeftDVAxisInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={leftEyeDVPrescriptions.va}
                        onValueChange={(value) =>
                          setLeftEyeDVPrescriptions((prev) => ({
                            ...prev,
                            va: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select V/A" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6/6">6/6</SelectItem>
                          <SelectItem value="6/6p">6/6p</SelectItem>
                          <SelectItem value="6/9">6/9</SelectItem>
                          <SelectItem value="6/9p">6/9p</SelectItem>
                          <SelectItem value="6/12">6/12</SelectItem>
                          <SelectItem value="6/12p">6/12p</SelectItem>
                          <SelectItem value="6/18">6/18</SelectItem>
                          <SelectItem value="6/18p">6/18p</SelectItem>
                          <SelectItem value="6/24">6/24</SelectItem>
                          <SelectItem value="6/24p">6/24p</SelectItem>
                          <SelectItem value="6/36">6/36</SelectItem>
                          <SelectItem value="6/36p">6/36p</SelectItem>
                          <SelectItem value="CF3">CF3</SelectItem>
                          <SelectItem value="CF2">CF2</SelectItem>
                          <SelectItem value="CF1">CF1</SelectItem>
                          <SelectItem value="CFCF">CFCF</SelectItem>
                          <SelectItem value="HM+">HM+</SelectItem>
                          <SelectItem value="PL +ve">PL +ve</SelectItem>
                          <SelectItem value="PL -ve">PL -ve</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">NV</TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={leftNVSphereInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setLeftNVSphereInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setLeftEyeNVPrescriptions((prev) => ({
                            ...prev,
                            sphere: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setLeftNVSphereInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={leftNVCylinderInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setLeftNVCylinderInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setLeftEyeNVPrescriptions((prev) => ({
                            ...prev,
                            cylinder: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setLeftNVCylinderInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={leftNVAxisInput}
                        onChange={(e) => {
                          const { value } = e.target;
                          const regex = /^-?\d*\.?\d*$/;

                          // Only update if the input matches the regex
                          if (regex.test(value)) {
                            setLeftNVAxisInput(value); // Store the string in the temporary state
                          }
                        }}
                        onBlur={(e) => {
                          const parsedValue = parseFloat(e.target.value);

                          // Update the main state with the parsed number or null
                          setLeftEyeNVPrescriptions((prev) => ({
                            ...prev,
                            axis: isNaN(parsedValue) ? null : parsedValue,
                          }));

                          // Sync the temporary state with the main state
                          setLeftNVAxisInput(
                            isNaN(parsedValue) ? "" : parsedValue.toString()
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={leftEyeNVPrescriptions.va}
                        onValueChange={(value) =>
                          setLeftEyeNVPrescriptions((prev) => ({
                            ...prev,
                            va: value,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select V/A" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="N6">N6</SelectItem>
                          <SelectItem value="N8">N8</SelectItem>
                          <SelectItem value="N10">N10</SelectItem>
                          <SelectItem value="N12">N12</SelectItem>
                          <SelectItem value="N18">N18</SelectItem>
                          <SelectItem value="N24">N24</SelectItem>
                          <SelectItem value="N36">N36</SelectItem>
                          <SelectItem value="<N36">&lt;N36</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="number"
                step="0.25"
                placeholder="NV Spherical Value Adjustment"
                value={nvSphereInput}
                onChange={handleNvSphereChange}
                min="0.75"
                max="3"
                aria-describedby="nvSphereError"
              />
              <Button type="button" onClick={handleAddNvSphere}>
                Add NV Sphere
              </Button>
              {nvSphereError && (
                <p id="nvSphereError" className="text-red-500">
                  {nvSphereError}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

export default EyePrescriptionForm;
