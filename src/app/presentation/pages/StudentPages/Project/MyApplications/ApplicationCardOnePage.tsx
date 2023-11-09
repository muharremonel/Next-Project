import React, { useState } from 'react';
import { Clock, Open } from "@/svgImports";
import Popup from '../../ProjectForm/components/PopUp';
import Preview from '../MyProjects/Preview';
import { BASE_URL } from '@/config';
import EmptyImage from '@/app/presentation/assets/digithane.png'
import Image from 'next/image';

interface Project {
    projectName: string;
    logo: string;
    url?: string;
    subject: string;
}
  
interface ApplicationCardOnePageProps {
    approvals: Project[];
}

const ApplicationCardOnePage: React.FC<ApplicationCardOnePageProps> = ({ approvals }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedApproval, setSelectedApproval] = useState<Project | null>(null);

    return (
        <>
            {approvals.map((approval, index) => (
                <div key={index} className="w-full flex shadow-xl md:flex-row flex-col bg-white mb-8 p-5 rounded-xl gap-8">
                    <div className="rounded-lg md:mb-0 md:w-3/6 w-full">
                        {approval.logo ? 
                            <img src={`${BASE_URL}${approval.logo}`} className="w-full h-[185px] rounded-xl" alt={approval.projectName} /> 
                            : 
                            <div className='w-full' style={{position:"relative", height:"185px"}}>
                                <Image src={EmptyImage} alt="Default" layout="fill" className='rounded-xl' />
                            </div>
                        }
                    </div>
                    <div className="flex flex-col justify-between w-full">
                        <div className="w-full mb-5 md:text-3xl text-2xl text-grey">
                            <div>{approval.projectName}</div>
                        </div>
                        <div className="justify-between items-center mb-2 text-slate-500">
                            <p>{approval.subject}</p>
                        </div>
                        <div className="mt-5 w-full flex justify-between m-0 items-center">
                            <div>
                                <a href={approval.url} target="_blank" rel="noopener noreferrer" className='bg-primaryGray text-primary flex items-center rounded-full px-4 min-h-[52px] w-full h-full'>
                                    <Clock/> <span className='ml-2 py-2'>ONAY BEKLİYOR</span>
                                </a>
                            </div>
                            <div>
                                <button onClick={() => {
                                    setSelectedApproval(approval);
                                    setShowPopup(true);
                                }}>
                                    <Open/>
                                </button>
                                {showPopup && selectedApproval === approval && (
                                    <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
                                        <Preview project={selectedApproval} onClose={() => setShowPopup(false)} />
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

export default ApplicationCardOnePage;
