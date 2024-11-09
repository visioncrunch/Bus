import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SelectValue } from "@radix-ui/react-select";

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  email: string;
  location: string;
  resume: File | null;
  coverLetter: string;
  whyJoin: string;
  availability: string;
}

interface ApplicationFormProps {
  onSubmit: (data: FormData | null) => void;
}

const tips = {
  firstName: "Enter your first name as it appears on your ID.",
  lastName: "Enter your last name as it appears on your ID.",
  phoneNumber: "Use the format: (123) 456-7890.",
  email: "Provide a valid email address for communication.",
  address: "Include your full address with postal code.",
  coverLetter: "Optional, but can highlight your motivation.",
  location: "Select your preferred job location.",
  resume: "Upload a PDF version of your resume.",
  whyJoin: "Explain why you want to work with us.",
  availability: "State your earliest availability to start.",
};

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    location: "",
    resume: null,
    coverLetter: "",
    whyJoin: "",
    availability: "",
  });

  const [activeField, setActiveField] = useState<keyof FormData | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, resume: e.target.files?.[0] || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFocus = (field: keyof FormData | null) => {
    setActiveField(field);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 justify-center z-50 h-screen flex items-center">
      <div className="max-w-2xl w-full mx-4 rounded-lg shadow-xl bg-transparent h-4/5">
        <Card>
          <CardHeader className="px-6 py-4 border-b border-gray-200 bg-blue-50 flex justify-between items-center rounded-t-lg">
            <CardTitle className="text-xl font-semibold text-blue-900">
              Apply for the Position
            </CardTitle>
            <button
              onClick={() => onSubmit(null)}
              aria-label="Close form"
              className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            >
              {/* &times; */}
            </button>
          </CardHeader>

          <CardContent className="px-6 py-6 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Personal Information */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("firstName")}
                    onBlur={() => handleFocus(null)}
                    required
                    className="rounded-md"
                  />
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onFocus={() => handleFocus("lastName")}
                    onBlur={() => handleFocus(null)}
                    required
                    className="rounded-md"
                  />
                </div>
                <Input
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("phoneNumber")}
                  onBlur={() => handleFocus(null)}
                  required
                  className="rounded-md"
                />
                <Input
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("email")}
                  onBlur={() => handleFocus(null)}
                  required
                  type="email"
                  className="rounded-md"
                />
              </div>

              {/* Address & Cover Letter */}
              <div className="space-y-3">
                <Textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("address")}
                  onBlur={() => handleFocus(null)}
                  required
                  className="rounded-md"
                />
                <Textarea
                  name="coverLetter"
                  placeholder="Cover Letter (Optional)"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  onFocus={() => handleFocus("coverLetter")}
                  onBlur={() => handleFocus(null)}
                  className="rounded-md"
                />
              </div>

              {/* Job Location */}
              <Select
  onValueChange={(value) => {
    setFormData({ ...formData, location: value });
    handleFocus("location");
  }}
>
                <SelectTrigger>
                  <SelectValue placeholder="Preferred Job Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                  <SelectItem value="Toronto">Toronto</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>

              {/* Resume Upload */}
              <div className="flex items-center justify-evenly">
                <div>Upload Resume</div>
                <Input
                  type="file"
                  name="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  onFocus={() => handleFocus("resume")}
                  onBlur={() => handleFocus(null)}
                  className="rounded-md w-3/5"
                />
              </div>

              {/* Additional Information */}
              <Textarea
                name="whyJoin"
                placeholder="Why do you want to join us?"
                value={formData.whyJoin}
                onChange={handleInputChange}
                onFocus={() => handleFocus("whyJoin")}
                onBlur={() => handleFocus(null)}
                required
                className="rounded-md"
              />
              <Input
                name="availability"
                placeholder="Availability to Start"
                value={formData.availability}
                onChange={handleInputChange}
                onFocus={() => handleFocus("availability")}
                onBlur={() => handleFocus(null)}
                required
                className="rounded-md"
              />

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-md"
              >
                Submit Application
              </Button>
            </form> 
          </CardContent>
        </Card>
      </div>

      <div className="max-w-2xl w-full mx-4 rounded-lg shadow-xl p-6 h-4/5 
  bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-900 dark:to-blue-600
  text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4">Application Tips</h2>
        <ul className="space-y-2">
          {Object.entries(tips).map(([field, tip]) => (
            <li
              key={field}
              className={`transition-colors duration-300 ${
                activeField === field ? "text-white" : "text-white/50"
              }`}
            >
              • {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ApplicationForm;
