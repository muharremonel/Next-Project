import React, { useState, FormEvent, useEffect } from 'react';
import { Close } from '@/svgImports';
import toast from 'react-hot-toast';

type TeamAddProps = {
    initialData: any;
    handleAddstudioMembers: (studioMembers: any) => void;
    onClose: () => void;
    isEditing?: boolean; 
  };

  const TeamAdd = ({ 
    initialData, 
    handleAddstudioMembers, 
    onClose, 
    isEditing = false 
}: { 
    initialData: any, 
    handleAddstudioMembers: (studioMembers: any) => void, 
    onClose: () => void, 
    isEditing?: boolean 
}) => {    
    const [teamName, setTeamName] = useState("");
    const [teamSurname, setTeamSurname] = useState("");
    const handleTeamSubmit = async (e: FormEvent) => {
        e.preventDefault(); 
        
        try {
            const studioMembers = {
                name: teamName,
                surname: teamSurname,
            
            };
            
            handleAddstudioMembers(studioMembers); 
            onClose(); 
        
            setTeamName('');
            setTeamSurname('');
            
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
            setTeamSurname(initialData.surname || '');
        }
         else {
            setTeamName('');
            setTeamSurname('');
        }
    }, [initialData]);

    const resetForm = () => {
        setTeamName('');
        setTeamSurname('');
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
                            <label htmlFor="teamName">Ad<span className={"text-red-500"}>*</span></label>
                            <input
                                id='teamName'
                                type="text"
                                required
                                value={teamName}
                                onChange={(event) => setTeamName(event.target.value)}
                                className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                            />
                    </div>
                </div>
                <div className='w-full'>
                <div className={"mb-4"}>
                            <label htmlFor="teamSurname">Soyad<span className={"text-red-500"}>*</span></label>
                            <input
                                id='teamSurname'
                                type="text"
                                required
                                value={teamSurname}
                                onChange={(event) => setTeamSurname(event.target.value)}
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