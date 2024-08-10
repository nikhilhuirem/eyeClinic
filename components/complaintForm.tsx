import React, { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import axios from "axios";

interface Complaint {
  id: number;
  eye: string;
  type: string;
  duration: string;
  durationUnit: string;
  isEditable: boolean;
}

interface ComplaintFormProps {
  complaintsData?: string; // API returns a string separated by new lines
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ complaintsData }) => {
  const [fetchedComplaints, setFetchedComplaints] = useState<Complaint[]>([]);
  const [newComplaints, setNewComplaints] = useState<Complaint[]>([]);
  const [complaintOptions, setComplaintOptions] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch initial complaint options from API
    const fetchComplaintOptions = async () => {
      try {
        const response = await axios.get("/api/complaints");
        const options = response.data.map(
          (option: { complaintOptions: string }) => option.complaintOptions
        );
        setComplaintOptions(options);
      } catch (error) {
        console.error("Error fetching complaint options:", error);
        setError("Failed to load complaint options.");
      }
    };
    fetchComplaintOptions();
  }, []);

  useEffect(() => {
    if (complaintsData) {
      const parsedComplaints = complaintsData.split("\n").map((line, index) => {
        const [id, eye, type, duration, durationUnit] = line.split(" ");
        return {
          id: parseInt(id),
          eye: eye || "",
          type: type || "",
          duration: duration || "",
          durationUnit: durationUnit || "",
          isEditable: false,
        };
      });
      setFetchedComplaints(parsedComplaints);
    }
  }, [complaintsData]);

  const handleAddComplaint = () => {
    setNewComplaints([
      ...newComplaints,
      {
        id: fetchedComplaints.length + newComplaints.length + 1,
        eye: "",
        type: "",
        duration: "",
        durationUnit: "",
        isEditable: true,
      },
    ]);
  };

  const handleRemoveComplaint = (id: number) => {
    setNewComplaints(newComplaints.filter((complaint) => complaint.id !== id));
  };

  const handleChange = (id: number, field: string, value: string) => {
    setNewComplaints(
      newComplaints.map((complaint) =>
        complaint.id === id ? { ...complaint, [field]: value } : complaint
      )
    );
  };

  const handleBlur = async (complaint: Complaint) => {
    if (complaint.type && !complaintOptions.includes(complaint.type)) {
      try {
        await axios.post("/api/complaint-options", {
          complaintOptions: complaint.type,
        });
        setComplaintOptions([...complaintOptions, complaint.type]);
      } catch (error) {
        console.error("Error adding new complaint option:", error);
        setError("Failed to add new complaint option.");
      }
    }
  };

  const validateForm = () => {
    for (const complaint of newComplaints) {
      if (
        !complaint.eye ||
        !complaint.type ||
        !complaint.duration ||
        !complaint.durationUnit
      ) {
        setError("Please fill in all fields for each complaint.");
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        console.log("Submitting:", [...fetchedComplaints, ...newComplaints]);
        // Handle form submission (e.g., send data to API)
        await axios.post("/api/complaints", {
          complaintOptions: newComplaints,
        });
        setNewComplaints([]);
      } catch (error) {
        console.error("Error submitting complaints:", error);
        setError("Failed to submit complaints.");
      }
    }
  };

  const filteredComplaintOptions =
    query === ""
      ? complaintOptions
      : complaintOptions.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="bg-white p-6 rounded shadow-md w-full mx-auto">
      <section className="border-t border-b py-2">
        <h2 className="text-lg mb-4 font-bold">Complaint</h2>
        <div className="space-y-2">
          {fetchedComplaints.map((complaint) => (
            <div key={complaint.id} className="flex items-center space-x-4">
              <span>{complaint.id}.</span>
              <Label htmlFor={`complaint${complaint.id}-eye`}>Eye:</Label>
              <Select value={complaint.eye} disabled>
                <SelectTrigger
                  id={`complaint${complaint.id}-eye`}
                  className="w-16 border-2 border-gray-500"
                >
                  <SelectValue placeholder="OU" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OU">OU</SelectItem>
                  <SelectItem value="OS">OS</SelectItem>
                  <SelectItem value="OD">OD</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor={`complaint${complaint.id}-type`}>
                Complaint:
              </Label>
              <Input
                value={complaint.type}
                disabled
                className="w-60 border-2 border-gray-500"
              />
              <div className="flex items-center space-x-4">
                <Label>Duration:</Label>
                <Input
                  placeholder="Number"
                  value={complaint.duration}
                  disabled
                  className="w-16 border-2 border-gray-500"
                />
                <span>x</span>
                <Select value={complaint.durationUnit} disabled>
                  <SelectTrigger className="border-2 border-gray-500">
                    <SelectValue placeholder="Hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hours">Hours</SelectItem>
                    <SelectItem value="Days">Days</SelectItem>
                    <SelectItem value="Weeks">Weeks</SelectItem>
                    <SelectItem value="Months">Months</SelectItem>
                    <SelectItem value="Years">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}

          {newComplaints.map((complaint) => (
            <div key={complaint.id} className="flex items-center space-x-4">
              <span>{complaint.id}.</span>
              <Label htmlFor={`complaint${complaint.id}-eye`}>Eye:</Label>
              <Select
                value={complaint.eye}
                onValueChange={(value) =>
                  handleChange(complaint.id, "eye", value)
                }
              >
                <SelectTrigger
                  id={`complaint${complaint.id}-eye`}
                  className="w-16 border-2 border-gray-500"
                >
                  <SelectValue placeholder="OU" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="OU">OU</SelectItem>
                  <SelectItem value="OS">OS</SelectItem>
                  <SelectItem value="OD">OD</SelectItem>
                </SelectContent>
              </Select>

              <Label htmlFor={`complaint${complaint.id}-type`}>
                Complaint:
              </Label>
              <Combobox
                value={complaint.type}
                onChange={(value: string) =>
                  handleChange(complaint.id, "type", value)
                }
              >
                <div className="relative">
                  <ComboboxInput
                    className="w-60 border-2 border-gray-500"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(type: string) => type}
                    onBlur={() => handleBlur(complaint)}
                  />
                  <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
                    {/* Add any icon if needed */}
                  </ComboboxButton>
                  <ComboboxOptions className="absolute z-10 w-40 mt-1 bg-white border border-gray-500 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredComplaintOptions.length === 0 && query ? (
                      <div className="p-2 text-gray-500">No options found</div>
                    ) : (
                      filteredComplaintOptions.map((option, index) => (
                        <ComboboxOption
                          key={index}
                          value={option}
                          className={({ active }) =>
                            `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                              active
                                ? "text-white bg-blue-600"
                                : "text-gray-900"
                            }`
                          }
                        >
                          {({ selected }) => (
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {option}
                            </span>
                          )}
                        </ComboboxOption>
                      ))
                    )}
                  </ComboboxOptions>
                </div>
              </Combobox>

              <div className="flex items-center space-x-4">
                <Label>Duration:</Label>
                <Input
                  placeholder="Number"
                  value={complaint.duration}
                  onChange={(e) =>
                    handleChange(complaint.id, "duration", e.target.value)
                  }
                  className="w-16 border-2 border-gray-500"
                />
                <span>x</span>
                <Select
                  value={complaint.durationUnit}
                  onValueChange={(value) =>
                    handleChange(complaint.id, "durationUnit", value)
                  }
                >
                  <SelectTrigger className="border-2 border-gray-500">
                    <SelectValue placeholder="Hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Hours">Hours</SelectItem>
                    <SelectItem value="Days">Days</SelectItem>
                    <SelectItem value="Weeks">Weeks</SelectItem>
                    <SelectItem value="Months">Months</SelectItem>
                    <SelectItem value="Years">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={() => handleRemoveComplaint(complaint.id)}>
                Remove
              </Button>
            </div>
          ))}
        </div>
      </section>
      <Button onClick={handleAddComplaint} className="mt-4">
        Add Complaint
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <Button onClick={handleSubmit} className="mt-4">
        Submit
      </Button>
    </div>
  );
};

export default ComplaintForm;
