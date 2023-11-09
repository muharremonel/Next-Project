import React, {useState} from 'react';
import { BASE_URL } from '@/config';
import { Close } from '@/svgImports';

interface TeamMember {
    name: string;
    email: string;
    phone: string;
    projectMission: string;
    EducationStatus: string;
    trainingCertificates: string;
    birthday: string;
    resume: string;
    profession: string;
    
}

interface Project {
    projectName: string;
    logo: string;
    url?: string;
    subject: string;
    userId?: string;
    sector?: string;
    projectDevelopmentProcesses?: string;
    projectObjectives?: string;
    projectPresentation?: string;
    swotAnalysis?: string;
    targetGroup?: string;
    teamMembers?: TeamMember[];
}

interface PreviewProps {
    project: Project;
    onClose: () => void;
}

const Preview: React.FC<PreviewProps> = ({ project, onClose }) => {
    const [openMemberIndex, setOpenMemberIndex] = useState<number | null>(null); 
    return (
        <div className='bg-white shadow w-full h-full p-2 md:p-8 rounded-xl overflow-y-auto'>
            <div className='justify-end flex'>
                <button  onClick={onClose}  className='p-2 rounded-full focus:outline-none float-right'>
                    <Close/>
                </button>
            </div>
            
            <div className='justify-center flex'>
                {project.logo && <img src={`${BASE_URL}${project.logo}`} className="w-80 h-50 rounded-xl" alt={project.projectName} />}
            </div>
            <div className='flex md:flex-row flex-col'>
                <div className='p-1 md:p-4 mt-5 left w-full'>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Proje Adı:</span>
                        <span className='block'>{project.projectName}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Projeniz Hangi Sektörde Faliyet Gösterecek:</span>
                        <span className='block'>{project.sector}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Projenin Konusu ve Amacı:</span>
                        <span className='block'>{project.subject}</span>
                    </div>
                    <div className='bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>SWOT Analizi:</span>
                        <span className='block'>{project.swotAnalysis}</span>
                    </div>
                </div>
                <div className='p-1 md:p-4 mt-5 right w-full'>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Hedef Kitle, Hedef Pazar ve Rekabet:</span>
                        <span className='block'>{project.projectObjectives}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Projenin Gelişim Süreçleri:</span>
                        <span className='block'>{project.projectDevelopmentProcesses}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Proje Plan ve Hedefleri:</span>
                        <span className='block'>{project.targetGroup}</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-2 p-1 md:p-4">
                {project.teamMembers?.map((member, index) => (
                    <div key={index} className="bg-primaryGray p-4 my-2 rounded-xl">
                        <div className="flex md:flex-row flex-col justify-between items-center">
                            <div>
                                <span className='font-bold text-primary'>{member.name}</span> - <span>{member.email}</span>
                            </div>
                            <button className='text-orange' onClick={() => setOpenMemberIndex(index === openMemberIndex ? null : index)}>
                                {index === openMemberIndex ? "Kapat" : "Detayları Gör"}
                            </button>
                        </div>
                        {index === openMemberIndex && (
                            <div className="mt-2 flex md:flex-row flex-col">
                                <div className='left w-full p-2'>
                                    <div className='flex md:flex-row flex-col gap-3 mb-2'>
                                        <span className='font-semibold text-orange'>Telefon:</span>
                                        <span>{member.phone}</span>
                                    </div>
                                    <div className='flex md:flex-row flex-col gap-3 mb-2'>
                                        <span className='font-semibold text-orange'>Projedeki Görevi:</span>
                                        <span>{member.projectMission}</span>
                                    </div>
                                    <div className='flex md:flex-row flex-col gap-3 mb-2'>
                                        <span className='font-semibold text-orange'>Eğitim Durumu:</span>
                                        <span>{member.EducationStatus}</span>
                                    </div>
                                    <div className='flex md:flex-row flex-col gap-3 mb-2'>
                                        <span className='font-semibold text-orange'>Aldığı Eğitim ve Sertifikalar:</span>
                                        <span>{member.trainingCertificates}</span>
                                    </div>
                                </div>
                                <div className='left w-full p-2'>
                                    <div className='flex md:flex-row flex-col gap-3 mb-2'>
                                        <span className='font-semibold text-orange'>Doğum Tarihi:</span>
                                        <span>{member.birthday}</span>
                                    </div>
                                    <div className='flex md:flex-row flex-col gap-3 mb-2'>
                                        <span className='font-semibold text-orange'>Kısa Öz Geçmişi:</span>
                                        <span>{member.resume}</span>
                                    </div>
                                    <div className='flex md:flex-row flex-col gap-3 mb-2'>
                                        <span className='font-semibold text-orange'>Uzmanlık, İlgi Alanları:</span>
                                        <span>{member.profession}</span>
                                    </div>
                                </div>
                                    
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Preview;
