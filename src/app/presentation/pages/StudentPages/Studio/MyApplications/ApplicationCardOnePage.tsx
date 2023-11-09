import React, { useState } from 'react';
import { Clock, Open } from "@/svgImports";
import Popup from '../../ProjectForm/components/PopUp';
import Preview from './Preview';
import { BASE_URL } from '@/config';
import EmptyImage from '@/app/presentation/assets/digithane.png'
import Image from 'next/image';

interface Studio {
    projectName: string;
    name: string;
    surname: string;
    url?: string;
    projectSubject: string;
}
  
interface ApplicationCardOnePageProps {
    approveds: Studio[];
}

const ApplicationCardOnePage: React.FC<ApplicationCardOnePageProps> = ({ approveds }) => {
    const [showPopup, setShowPopup] = useState(false);
    const [selectedapproved, setSelectedapproved] = useState<Studio | null>(null);

    return (
        <>
            {approveds.map((approved, index) => (
                <div key={index} className="w-full flex shadow-xl md:flex-row flex-col bg-white mb-8 p-5 rounded-xl gap-8">
                    <div className="rounded-lg md:mb-0 md:w-3/6 w-full">
                        <Image src={EmptyImage} alt="Default" layout="fill" className='rounded-xl' />
                    </div>
                    <div className="flex flex-col justify-between w-full">
                        <div className="w-full mb-5 md:text-3xl text-2xl text-grey">
                            <div>{approved.projectName}</div>
                        </div>
                        <div className="justify-between items-center mb-2 text-slate-500">
                            <p>{approved.projectSubject}</p>
                        </div>
                        <div className="mt-5 w-full flex justify-between m-0 items-center">
                            <div>
                                <a href={approved.url} target="_blank" rel="noopener noreferrer" className='bg-primaryGray text-primary flex items-center rounded-full px-4 min-h-[52px] w-full h-full'>
                                    <Clock/> <span className='ml-2 py-2'>ONAY BEKLİYOR</span>
                                </a>
                            </div>
                            <div>
                                <button onClick={() => {
                                    setSelectedapproved(approved);
                                    setShowPopup(true);
                                }}>
                                    <Open/>
                                </button>
                                {showPopup && selectedapproved === approved && (
                                    <Popup isOpen={showPopup} onClose={() => setShowPopup(false)}>
                                        <Preview studio={selectedapproved} onClose={() => setShowPopup(false)} />
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
