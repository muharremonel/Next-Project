import React, {useState} from 'react';
import { BASE_URL } from '@/config';
import { Close } from '@/svgImports';

interface TeamMember {
    name: string;
    surname: string;
}

interface Studio {
	_id?: string;
	name: string;
	surname: string;
	phone?: string;
	email?: string;
	age?: string;
	projession?: string;
	appointmentDate?: string;
	appointmentHours?: string;
	projectName?: string;
	projectSubject?: string;
	projectPurpose?: string;
	projectTargetAudience?: string;
	projectType?: string;
	projectText?: string;
	projectTime?: string;
	studioNeed?: string;
	equipmentNeed?: string;
	userId?: string;
	studioMembers?:  TeamMember[];
	createdDate?: string;
	status?:string;
}

interface PreviewProps {
    studio: Studio;
    onClose: () => void;
}

const Preview: React.FC<PreviewProps> = ({ studio, onClose }) => {
    const [openMemberIndex, setOpenMemberIndex] = useState<number | null>(null); 
    return (
        <div className='bg-white shadow w-full h-full p-2 md:p-8 rounded-xl overflow-y-auto'>
            <div className='justify-end flex'>
                <button  onClick={onClose}  className='p-2 rounded-full focus:outline-none float-right'>
                    x
                </button>
            </div>
            
            <div className='flex md:flex-row flex-col'>
                <div className='p-1 md:p-4 mt-5 left w-full'>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Adı:</span>
                        <span className='block'>{studio.name}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Soyadı:</span>
                        <span className='block'>{studio.surname}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Telefon:</span>
                        <span className='block'>{studio.phone}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>E-mail:</span>
                        <span className='block'>{studio.email}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Yaş:</span>
                        <span className='block'>{studio.age}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Meslek:</span>
                        <span className='block'>{studio.projession}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Talep Edilen Randevu Tarihi:</span>
                        <span className='block'>{studio.appointmentDate}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Talep Edilen Randevu Saati:</span>
                        <span className='block'>{studio.appointmentHours}</span>
                    </div>
                </div>
                <div className='p-1 md:p-4 mt-5 right w-full'>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Proje Adı:</span>
                        <span className='block'>{studio.projectName}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Projenin Konusu ve Amacı:</span>
                        <span className='block'>{studio.projectSubject}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Projenin Amacı :</span>
                        <span className='block'>{studio.projectPurpose}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Projenin Hedef Kitle Profili:</span>
                        <span className='block'>{studio.projectTargetAudience}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Proje Türü:</span>
                        <span className='block'>{studio.projectType}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Proje Metni:</span>
                        <span className='block'>{studio.projectText}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Proje Süresi:</span>
                        <span className='block'>{studio.projectTime}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Randevu Tarihindeki Stüdyo İhtiyacı:</span>
                        <span className='block'>{studio.studioNeed}</span>
                    </div>
                    <div className='mb-4 bg-primaryGray p-3 rounded-xl'>           
                        <span className='font-bold text-primary'>Ekipman İhtiyacı:</span>
                        <span className='block'>{studio.equipmentNeed}</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-2 p-1 md:p-4">
                {studio.studioMembers?.map((member, index) => (
                    <div key={index} className="bg-lightGrey p-4 my-2 rounded-xl">
                        <div className="flex md:flex-row flex-col justify-between items-center">
                            <div>
                                <span className='font-bold text-primary'>{member.name} {member.surname}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Preview;
