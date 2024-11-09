import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
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
  onSubmit: (data: FormData | null) => void; // Allow null for onSubmit
}

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, resume: e.target.files?.[0] || null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to parent component
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white max-w-3xl w-full mx-4 rounded-lg shadow-lg">
        <Card>
          <CardHeader className="px-8 py-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-gray-900">Job Application Form</CardTitle>
            <button onClick={() => onSubmit(null)} className="text-gray-500 hover:text-gray-700 text-xl font-bold">
              &times;
            </button>
          </CardHeader>

          <CardContent className="px-8 py-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} required />
              <Input name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleInputChange} required />
              <Input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} required />
              <Input name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
              <Textarea name="address" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
              <Textarea name="coverLetter" placeholder="Cover Letter (Optional)" value={formData.coverLetter} onChange={handleInputChange} />

              {/* Select for Job Location */}
              <Select onValueChange={(value) => setFormData({ ...formData, location: value })}>
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

              <Input type="file" name="resume" accept=".pdf" onChange={handleFileChange} />
              <Textarea name="whyJoin" placeholder="Why do you want to join us?" value={formData.whyJoin} onChange={handleInputChange} required />
              <Input name="availability" placeholder="Availability to Start" value={formData.availability} onChange={handleInputChange} required />

              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-12 rounded-md">
                Submit Application
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApplicationForm;