import React, { useRef, useEffect, useState } from "react";
import ContentCard from "./ContentCard";
import SideBar from "./SideBar";
import CarouselTopics from "./CarouselTopics";
import {getJobsDetails} from "@/hooks/getDetails";
import { useNavigate } from "react-router-dom";
import { Toast } from "@/components/majorComponents/toast";

interface JobData {
    id: string;
    jobDescription: {
        jobName: string;
        location: string;
        description: string;
        benefits: string;
        ourValues: string;
        positionSummary: string;
        positionResponsibilities: string;
        skills: string;
        whyWorkWithUs: string;
    };
    createdAt: string;
    questions: {
        id: string;
        type: string;
        content: string;
        options: string[];
        correctAnswers: string[];
    }[];
}



const MainBody: React.FC = () => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [sidebarHeight, setSidebarHeight] = useState<number>(0);
    const [jobData, setJobData] = useState<JobData[]>([]);
    const [error, setError] = useState<string | null>(null);

    const Router = useNavigate()

    useEffect(() => {
        async function fetchJobs() {    
            try {
                const res = await getJobsDetails();
                setJobData(res.data);
                console.log("Job Data:", res.data);
            } catch (error) {
                console.error("Failed to fetch job data:", error);
                setError("Failed to load job listings.");
            }
        }
        fetchJobs();
    }, []);

    useEffect(() => {
        if (sidebarRef.current) {
            setSidebarHeight(sidebarRef.current.clientHeight);
        }
    }, []);


    function HandleApplicationClickEvent(jobId: string) {
        const selectedJob = jobData.find((job) => job.id === jobId);
        
        if (selectedJob) {
            Router('/description', { state: { selectedJob } });
        } else {
           Toast("Error","Job not found for the given ID.")
        }
    }

    return (
        <div className="flex justify-center ehd:justify-evenly xl:justify-center xl:gap-16">
            <div
                className="overflow-y-clip nhd:overflow-y-scroll no-scrollbar"
                style={{ height: `${sidebarHeight}px` }}
            >
                <CarouselTopics />
                {error ? (  
                    <div className="text-red-500">{error}</div>
                ) : (
                    jobData.map((job) => (
                        <ContentCard 
                            key={job.id}
                            avatarSrc="/default-avatar.png" // Placeholder for avatar
                            avatarFallback="N" // Fallback name
                            name={job.jobDescription.location}
                            publication={job.jobDescription.skills}
                            articleHeading={job.jobDescription.jobName}
                            articleDescription={job.jobDescription.description}
                            articleImageSrc="/default-image.png" // Placeholder for image
                            date={new Date(job.createdAt).toLocaleDateString()} 
                            time={job.createdAt}
                            HandleApplicationClickEvent={() => HandleApplicationClickEvent(job.id)}
                            />
                    ))
                )}
            </div>
            <div ref={sidebarRef}>
                <SideBar />
            </div>
        </div>
    );
};

export default MainBody;