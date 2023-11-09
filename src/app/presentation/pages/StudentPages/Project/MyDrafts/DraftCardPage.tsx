import React from 'react';
import { TaskEdit, FilePrimary } from "@/svgImports";
import router from 'next/router';
import EmptyImage from '@/app/presentation/assets/digithane.png'
import Image from 'next/image';
import { BASE_URL } from '@/config';

interface Project {
    projectName: string;
    logo: string;
    url?: string;
    subject: string;
    _id: string;
}
  
interface DraftCardPageProps {
    drafts: Project[];
}

const DraftCardPage: React.FC<DraftCardPageProps> = ({ drafts }) => {
    const handleEditClick = (draftId: string) => {
        router.push(`/proje-basvuru-formu?draftId=${draftId}`);
    }
    return (
        <>
            {drafts.map((draft, index) => (
                <div key={index} className="w-full flex shadow-xl md:flex-row flex-col bg-white mb-8 p-5 rounded-xl gap-8">
                     <div className="rounded-lg md:mb-0 md:w-3/6 w-full">
                        {draft.logo ? 
                            <img src={`${BASE_URL}${draft.logo}`} className="w-full h-[185px] rounded-xl" alt={draft.projectName} /> 
                            : 
                            <div className='w-full' style={{position:"relative", height:"185px"}}>
                                <Image src={EmptyImage} alt="Default" layout="fill" className='rounded-xl' />
                            </div>
                        }
                    </div>
                    <div className="flex flex-col justify-between w-full">
                        <div className="w-full mb-5 md:text-3xl text-2xl text-grey">
                            <div>{draft.projectName}</div>
                        </div>
                        <div className="justify-between items-center mb-2 text-slate-500">
                            <p>{draft.subject}</p>
                        </div>
                        <div className="mt-5 w-full flex justify-between m-0 items-center">
                            <div>
                                <a href={draft.url} target="_blank" rel="noopener noreferrer" className='bg-white text-primary border border-primary flex items-center rounded-full px-4 min-h-[42px] w-full h-full'>
                                    <FilePrimary/>
                                    <span className='ml-2 py-2 font-light'>TASLAK</span>
                                </a>
                            </div>
                            <div>
                                <button onClick={() => handleEditClick(draft._id)}>
                                    <TaskEdit />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default DraftCardPage;
