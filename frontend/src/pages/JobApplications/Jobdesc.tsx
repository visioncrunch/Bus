import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, MapPin, CheckCircle, ClipboardList, Star, Gift } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { type } from "os";
import { title } from "process";
import { map } from "zod";

interface JobDescriptionProps {
    jobName: string;
    location: string;
    description: string;
    benefits: string;
    ourValues: string;
    positionSummary: string;
    positionResponsibilities: string;
    skills: string;
    whyWorkWithUs: string;
    createdAt: string;
}

const JobDescriptionPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [employeeInfo, setEmployeeInfo] = useState({ fullName: "", email: "", phoneNumber: "", coverLetter: "" });
    
    const location = useLocation();
    const navigate = useNavigate();

    const job = location.state?.selectedJob;
    if (!job) return <div>Access Denied</div>;

    const jobData = location.state?.selectedJob.jobDescription as JobDescriptionProps;
    const jobId = location.state?.selectedJob.id;
    const QuestionObj = job.questions;

    console.log(employeeInfo)

    const handleNextStepClickEvent = () => {
        if (QuestionObj && jobId) {
            navigate('/Test', { state: { QuestionObj, jobId, employeeInfo ,jobData}});
        } else {
            alert("Invalid job data");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEmployeeInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };

    const sanitize = (content: string) => DOMPurify.sanitize(content);

return (
    <div className="container mx-auto px-4 py-10 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
        <Card className="max-w-5xl mx-auto bg-white shadow-md rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-100 to-white dark:from-blue-600 dark:to-gray-800">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" /> 
                    {sanitize(jobData.jobName)}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-2">
                    <MapPin className="w-4 h-4" /> {sanitize(jobData.location)} • Posted on {new Date(jobData.createdAt).toLocaleDateString()}
                </CardDescription>
            </CardHeader>

            <CardContent className="px-8 py-6 space-y-8">
                {/* Display additional job details */}
                {[
                    { title: "Job Description", content: jobData.description },
                    { title: "Benefits", content: jobData.benefits },
                    { title: "Our Values", content: jobData.ourValues },
                    { title: "Position Summary", content: jobData.positionSummary },
                    { title: "Position Responsibilities", content: jobData.positionResponsibilities },
                    { title: "Skills Required", content: jobData.skills },
                    { title: "Why Work With Us", content: jobData.whyWorkWithUs },
                ].map((section, index) => (
                    <section key={index}>
                        <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{section.title}</h2>
                        <p className="text-gray-700 dark:text-gray-300">{sanitize(section.content)}</p>
                    </section>
                ))}

                {/* Apply button to open modal */}
                <div className="flex justify-center mt-10">
                    <Button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-12 rounded-lg transition duration-200 shadow-md transform hover:scale-105"
                    >
                        Apply Now
                    </Button>
                </div>
            </CardContent>
        </Card>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative dark:bg-gray-700">
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 text-2xl font-bold"
                    >
                        &times;
                    </button>
                    <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
                        Apply for {sanitize(jobData.jobName)}
                    </CardTitle>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Full Name</label>
                            <Input 
                                type="text" 
                                name="fullName" 
                                placeholder="Your Name" 
                                value={employeeInfo.fullName} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Email</label>
                            <Input 
                                type="email" 
                                name="email" 
                                placeholder="Your Email" 
                                value={employeeInfo.email} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Phone Number</label>
                            <Input 
                                type="tel" 
                                name="phoneNumber" 
                                placeholder="Your Phone Number" 
                                value={employeeInfo.phoneNumber} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Cover Letter</label>
                            <Textarea 
                                name="coverLetter" 
                                placeholder="Write a short cover letter" 
                                rows={4} 
                                value={employeeInfo.coverLetter} 
                                onChange={handleInputChange} 
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button 
                                type="button" 
                                onClick={handleNextStepClickEvent}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-md transition duration-200"
                            >
                                Next Step
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
);}


export default JobDescriptionPage;