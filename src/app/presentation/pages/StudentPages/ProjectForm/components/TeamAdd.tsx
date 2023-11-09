import React, { useState, FormEvent, useEffect } from 'react';
import { Close } from '@/svgImports';
import toast from 'react-hot-toast';

type TeamAddProps = {
    initialData: any;
    handleAddTeamMember: (teamMember: any) => void;
    onClose: () => void;
    isEditing?: boolean; 
  };

  const TeamAdd = ({ 
    initialData, 
    handleAddTeamMember, 
    onClose, 
    isEditing = false 
}: { 
    initialData: any, 
    handleAddTeamMember: (teamMember: any) => void, 
    onClose: () => void, 
    isEditing?: boolean 
}) => {    const [teamName, setTeamName] = useState("");
    const [teamMission, setTeamMission] = useState("");
    const [teamPhone, setTeamPhone] = useState("");
    const [teamCertificate, setTeamCertificate] = useState("");
    const [teamEducationStatus, setTeamEducationStatus] = useState("");
    const [teamDateOfBrith, setTeamDateOfBrith] = useState("");
    const [teamEmail, setTeamEmail] = useState("");
    const [teamCv, setTeamCv] = useState("");
    const [teamExpertise, setTeamExpertise] = useState("");
    const [photoFile, setPhotoFile] = useState(null);
    const [cvFile, setCvFile] = useState(null);
    const handleTeamSubmit = async (e: FormEvent) => {
        e.preventDefault(); 
        const phonePattern = /^[0-9]{11}$/;
        if (!phonePattern.test(teamPhone)) {
            toast.error("Lütfen geçerli bir telefon numarası girin!");
            return;
        }
        if (!teamEmail.includes('@')) {
            toast.error("Lütfen geçerli bir e-posta adresi girin!");
            return;
        }
        try {
            const teamMember = {
                name: teamName,
                phone: teamPhone,
                projectMission: teamMission,
                EducationStatus: teamEducationStatus,
                trainingCertificates: teamCertificate,
                birthday: teamDateOfBrith,
                email: teamEmail,
                resume: teamCv,
                profession: teamExpertise,
            
            };
            
            handleAddTeamMember(teamMember); 
            onClose(); 
        
            setTeamName('');
            setTeamPhone('');
            setTeamMission('');
            setTeamEducationStatus('');
            setTeamCertificate('');
            setTeamDateOfBrith('');
            setTeamEmail('');
            setTeamCv('');
            setTeamExpertise('');
            
            toast.success(isEditing ? "Takım üyesi başarıyla güncellendi!" : "Takım üyesi başarıyla eklendi!");
            resetForm();
            onClose();
        } catch (error) {
            toast.error("Takım üyesi eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };
    
    useEffect(() => {
        console.log(initialData);
        if (initialData && initialData.name) {
            setTeamName(initialData.name || '');
            setTeamPhone(initialData.phone || '');
            setTeamMission(initialData.projectMission || '');
            setTeamEducationStatus(initialData.EducationStatus || '');
            setTeamCertificate(initialData.trainingCertificates || '');
            setTeamDateOfBrith(initialData.birthday || '');
            setTeamEmail(initialData.email || '');
            setTeamCv(initialData.resume || '');
            setTeamExpertise(initialData.profession || '');
        }
         else {
            setTeamName('');
            setTeamPhone('');
            setTeamMission('');
            setTeamEducationStatus('');
            setTeamCertificate('');
            setTeamDateOfBrith('');
            setTeamEmail('');
            setTeamCv('');
            setTeamExpertise('');
        }
    }, [initialData]);

    const resetForm = () => {
        setTeamName('');
        setTeamPhone('');
        setTeamMission('');
        setTeamEducationStatus('');
        setTeamCertificate('');
        setTeamDateOfBrith('');
        setTeamEmail('');
        setTeamCv('');
        setTeamExpertise('');
    };


    return (
        <form onSubmit={handleTeamSubmit} className='w-full h-full flex flex-col md:p-12 p-1 gap-10 rounded-lg overflow-y-auto'>
        <div className='w-full h-full flex flex-col md:p-10 p-5 gap-10 rounded-lg overflow-y-auto'>
            <div className={"text-2xl flex text-primary font-bold mb-2 justify-between"}>
                Takım Arkadaşı Ekle
                <button 
                    onClick={onClose} 
                    className='p-2 rounded-full focus:outline-none'
                >
                    <Close/>
                </button>
            </div>
            <div className={"md:flex flex-row gap-8"}>
                <div className={"w-full"}>
                    <div className={"mb-4"}>
                            <label htmlFor="teamName">Ad Soyad <span className={"text-red-500"}>*</span></label>
                            <input
                                id='teamName'
                                type="text"
                                required
                                value={teamName}
                                onChange={(event) => setTeamName(event.target.value)}
                                className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                            />
                    </div>
                    
                    <div className={"mb-4"}>
                            <label htmlFor="teamPhone">Telefon Numarası <span className={"text-red-500"}>*</span></label>
                            <input
                                id='teamPhone'
                                type="tel"
                                required
                                value={teamPhone}
                                onChange={(event) => setTeamPhone(event.target.value)}
                                className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                placeholder='0 (5__) ___ __ __'
                            />
                    </div>

                    <div className={"mb-4"}>
                            <label htmlFor="teamMission">Projedeki Görevi <span className={"text-red-500"}>*</span></label>
                            <input
                                id='teamMission'
                                type="text"
                                required
                                value={teamMission}
                                onChange={(event) => setTeamMission(event.target.value)}
                                className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                            />
                    </div>

                    <div className={"mb-4"}>
                            <label htmlFor="teamEducationStatus">Eğitim Durumu <span className={"text-red-500"}>*</span></label>
                            <input
                                id='teamEducationStatus'
                                type="text"
                                required
                                value={teamEducationStatus}
                                onChange={(event) => setTeamEducationStatus(event.target.value)}
                                className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                            />
                    </div>

                    <div className={"mb-4"}>
                            <label htmlFor="teamCertificate">Aldığı Eğitim ve Sertifikalar <span className={"text-red-500"}>*</span></label>
                            <input
                                id='teamCertificate'
                                type="text"
                                value={teamCertificate}
                                onChange={(event) => setTeamCertificate(event.target.value)}
                                className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                            />
                    </div>

                </div>
                <div className='w-full'>
    
                    <div className={"mb-4"}>
                            <label htmlFor="birthDate">Doğum Tarihi <span className={"text-red-500"}>*</span></label>
                            <input
                              required
                              id="birthDate"
                              type="date"
                              value={teamDateOfBrith}
                              onChange={(event) => {
                                  const year = new Date(event.target.value).getFullYear();
                                  if (year.toString().length === 4) {
                                      setTeamDateOfBrith(event.target.value);
                                  } else {
                                      toast.error("Lütfen geçerli bir tarih girin!");
                                  }
                              }}
                                className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                            />
                    </div>

                    <div className={"mb-4"}>
                            <label htmlFor="teamEmail">E-posta Adresi <span className={"text-red-500"}>*</span></label>
                            <input
                                id='teamEmail'
                                required
                                type="email"
                                value={teamEmail}
                                onChange={(event) => setTeamEmail(event.target.value)}
                                className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                            />
                    </div>

                    <div className={"mb-4"}>
                            <label htmlFor="teamCv">Kısa Özgeçmişi <span className={"text-red-500"}>*</span></label>
                            <input
                                id='teamCv'
                                type="text"
                                required
                                value={teamCv}
                                onChange={(event) => setTeamCv(event.target.value)}
                                className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                            />
                    </div>

                    <div className={"mb-4"}>
                            <label htmlFor="teamExpertise">Uzmanlık, İlgi Alanları <span className={"text-red-500"}>*</span></label>
                            <input
                                id='teamExpertise'
                                required
                                type="text"
                                value={teamExpertise}
                                onChange={(event) => setTeamExpertise(event.target.value)}
                                className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                            />
                    </div>

                </div>
            </div>
            <div className={"flex justify-center gap-10 md:justify-between"}>
            <button type='button' onClick={onClose} className='w-full h-[50px] bg-white text-primary border border-primary items-center justify-center rounded-full px-4 w-24 h-14'>
                    Vazgeç
            </button>
            <button type='submit' className='w-full h-[50px] bg-primary text-white items-center justify-center rounded-full px-4 w-24 h-14'>
                {initialData ? "Güncelle" : "Ekle"}
            </button>
            </div>
        </div>
        </form>
    )
}

export default TeamAdd