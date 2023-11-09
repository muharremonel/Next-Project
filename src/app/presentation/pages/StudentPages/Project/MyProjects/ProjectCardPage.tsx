import React, { useState } from 'react';
import { Union, Open } from "@/svgImports";
import Popup from '../../ProjectForm/components/PopUp';
import Preview from './Preview';
import { BASE_URL } from '@/config';
import EmptyImage from '@/app/presentation/assets/digithane.png'
import Image from 'next/image';

interface Project {
    projectName: string;
    logo: string;
    url?: string;
    subject: string;
}
  
interface ProjectCardPageProps {
    projects: Project[];
    
}

const ProjectCardPage: React.FC<ProjectCardPageProps> = ({ projects }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    
    const handleClosePreview = () => {
        setShowPopup(false);
    };
    return (
        <>
            {projects.map((project, index) => (
                <div key={index} className="w-full flex shadow-xl md:flex-row flex-col bg-white mb-8 p-5 rounded-xl gap-8">
                 <div className="rounded-lg md:mb-0 md:w-3/6 w-full">
                        {project.logo ? 
                            <img src={`${BASE_URL}${project.logo}`} className="w-full h-[185px] rounded-xl" alt={project.projectName} /> 
                            : 
                            <div className='w-full' style={{position:"relative", height:"185px"}}>
                                <Image src={EmptyImage} alt="Default" layout="fill" className='rounded-xl' />
                            </div>
                        }
                    </div>
                    <div className="flex flex-col justify-between w-full">
                        <div className="w-full mb-5 md:text-3xl text-2xl text-grey">
                            <div>{project.projectName}</div>
                        </div>
                        <div className="justify-between items-center mb-2 text-slate-500">
                            <p>{project.subject}</p>
                        </div>
                        <div className="mt-5 w-full flex justify-between m-0 items-center">
                            <div>
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className='bg-green flex items-center text-white rounded-full px-4 min-h-[42px] w-full h-full'>
                                    <Union/>
                                    <span className='ml-2 py-2 font-light'>ONAYLANDI</span>
                                </a>
                            </div>
                            <div>
                            <Open onClick={() => {
                                    setSelectedProject(project);
                                    setShowPopup(true);
                                }}/>
                                {showPopup && (
                                    <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
                                        <Preview project={selectedProject!} onClose={handleClosePreview} />

                                    </Popup>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProjectCardPage;
