import React, {useState, useEffect} from 'react';
import {useRouter} from "next/router";
import axios from 'axios';
import { BASE_URL } from '@/config';
import toast from 'react-hot-toast';
import { getUser } from '@/api';
import { Button } from "@/app/presentation/components";
import Menu from "@/app/presentation/pages/StudentPages/ProjectForm/Menu";
import ProjectUploader from "@/app/presentation/pages/StudentPages/ProjectForm/components/ProjectUploader";
import TeamAdd from "@/app/presentation/pages/StudentPages/ProjectForm/components/TeamAdd";
import PopUp from "@/app/presentation/pages/StudentPages/ProjectForm/components/PopUp";
import { Edit, Trash } from '@/svgImports';


interface Draft {
    _id: string;
    projectName: string;
    userId: string;
    sector: string;
    subject: string;
    teamMembers: TeamMember[];
    logo: string | null;
    projectDevelopmentProcesses: string;
    projectObjectives: string;
    projectPresentation: string | null;
    swotAnalysis: string;
    targetGroup: string;
    createdDate: string;
    status: string;
}

interface TeamMember {
    name: string;
    phone: string;
    projectMission: string;
    EducationStatus: string;
    trainingCertificates: string;
    birthday: string;
    email: string;
    resume: string;
    profession: string;
}


const Index = () => {

    const router = useRouter()
    const [projectName, setProjectName] = useState("");
    const [projectSector, setProjectSector] = useState("");
    const [projectSubject, setProjectSubject] = useState("");
    const [projectThree, setProjectThree] = useState("");
    const [projectObjective, setProjectObjective] = useState("");
    const [projectSwot, setProjectSwot] = useState("");
    const [projectId, setProjectId] = useState("");
    const [projectDevelopmentProcesses, setProjectDevelopmentProcesses] = useState<string>(""); 
    const [teamAddPopupController ,setTeamAddPopupController] = useState(false)

    const teamAddPopupOpener = () => {setTeamAddPopupController(true)}
    const teamAddPopupCloser = () => {setTeamAddPopupController(false)}
    const [addedTeamMembers, setAddedTeamMembers] = useState<any[]>([]);
    const [teamMembers, setTeamMembers] = useState<any[]>([]);

    const handleAddTeamMember = (teamMember: any) => {
        const updatedTeamMembers = [...addedTeamMembers, teamMember];
        setAddedTeamMembers(updatedTeamMembers);
        setTeamAddPopupController(false);
        setEditingMember(null);
    };
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [sunumFile, setProjectPresentation] = useState<File | null>(null);
    const handleCancel = () => {
        router.push("/proje-uretim-merkezi");
    }
 
    const handleSubmit = async (e: any, saveAsDraft: boolean = false) => {
        e.preventDefault();
    
        if (!e.target.checkValidity()) {
            toast.error("Form eksik veya yanlıştır!");
            return;
        }
    
        const formData = new FormData();
        formData.append('projectName', projectName);
        formData.append('sector', projectSector);
        formData.append('subject', projectSubject);
        formData.append('projectDevelopmentProcesses', projectDevelopmentProcesses);
        formData.append('projectObjectives', projectObjective);
        formData.append('swotAnalysis', projectSwot);
        formData.append('targetGroup', projectThree);
        formData.append('userId', studentId as string);
    
        addedTeamMembers.forEach((teamMember, index) => {
            formData.append(`teamMembers[${index}][name]`, teamMember.name);
            formData.append(`teamMembers[${index}][phone]`, teamMember.phone);
            formData.append(`teamMembers[${index}][projectMission]`, teamMember.projectMission);
            formData.append(`teamMembers[${index}][EducationStatus]`, teamMember.EducationStatus);
            formData.append(`teamMembers[${index}][trainingCertificates]`, teamMember.trainingCertificates);
            formData.append(`teamMembers[${index}][birthday]`, teamMember.birthday);
            formData.append(`teamMembers[${index}][email]`, teamMember.email);
            formData.append(`teamMembers[${index}][resume]`, teamMember.resume);
            formData.append(`teamMembers[${index}][profession]`, teamMember.profession);
        });
    
        if (logoFile) {
            formData.append('logo', logoFile);
        }
        if (sunumFile) {
            formData.append('projectPresentation', sunumFile);
        }
    
        let endpoint = `${BASE_URL}/projectProductionCenter`;
    
        if (draftId) { 
            if (saveAsDraft) {
                endpoint = `${BASE_URL}/projectProductionCenterDraft`;
            } else {
                formData.append('status', 'pending');
                endpoint = `${BASE_URL}/projectProductionCenter/${draftId}`;
            }
        } else if (saveAsDraft) {
            endpoint = `${BASE_URL}/projectProductionCenterDraft`;
        }
    
        try {
            let response;
            if (draftId && !saveAsDraft) {
                response = await axios.put(endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            } else {
                response = await axios.post(endpoint, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }
    
            if (response.data && response.data.message) {
                toast.success(response.data.message);
                setProjectName("");
                setProjectSector("");
                setProjectSubject("");
                setProjectThree("");
                setProjectObjective("");
                setProjectSwot("");
                setProjectId("");
                setProjectDevelopmentProcesses("");
                setAddedTeamMembers([]);
                setLogoFile(null);
                setProjectPresentation(null);
                setTimeout(() => {
                    router.push("/anasayfa")
                }, 1500);
            } else if (response.data && response.data.error) {
                toast.error(response.data.error);
            } else {
                toast.success("Form Başarıyla Gönderildi!");
                setTimeout(() => {
                    router.push("/anasayfa")
                }, 1500);
            }
        } catch (error: any) {
            toast.error("Form eksik veya yanlış!");
        }
    };
    
    
    

    const [studentId, setstudentId] = useState<string | null>(null);
    useEffect(() => {
        (async () => {
            const user = (await getUser())
            if (user && user.data) {
                setstudentId(user.data._id);
            }
        })();
    }, [router]);
    const [editingMember, setEditingMember] = useState<any>(null);
    
    const handleEditTeamMember = (index: number) => {
        setEditingMember({data: addedTeamMembers[index], index});
        setTeamAddPopupController(true);
    };

    const handleDeleteTeamMember = (email: string) => {
        const updatedTeamMembers = addedTeamMembers.filter(member => member.email !== email);
        setAddedTeamMembers(updatedTeamMembers);
    };
    const handleUpdateTeamMember = (updatedMember: any) => {
        const updatedTeamMembers = [...addedTeamMembers];
        updatedTeamMembers[editingMember.index] = updatedMember;
        setAddedTeamMembers(updatedTeamMembers);
        setTeamAddPopupController(false);
        setEditingMember(null);
    };



    //Taslak

    const draftId = router.query.draftId;
    
    useEffect(() => {
        if (draftId) {
            fetch(`${BASE_URL}/projectProductionCenter`)
                .then(response => response.json())
                .then(result => {
                    const draftData = result.data.find((draft: Draft) => draft._id === draftId && draft.status === "draft");
                    if (draftData) {
                        setProjectName(draftData.projectName);
                        setProjectSector(draftData.sector);
                        setProjectSubject(draftData.subject);
                        setProjectThree(draftData.targetGroup); // Eğer setProjectThree, targetGroup için kullanılıyorsa
                        setProjectObjective(draftData.projectObjectives);
                        setProjectSwot(draftData.swotAnalysis);
                        setProjectDevelopmentProcesses(draftData.projectDevelopmentProcesses);
                        setAddedTeamMembers(draftData.teamMembers);
                    }
                })
                .catch(() => {
                    toast.error("Taslak bilgileri yüklenirken bir hata oluştu!");
                });
        }
    }, [draftId]);
    
    
    
    return (
        
        <div className={"container m-auto w-full h-max"}>
        <Menu/>
        <div className={"shadow-2xl rounded-lg w-full h-full md:p-20 p-6 flex-col flex"}>
                <div className={"text-2xl text-primary font-bold mb-8"}>
                    Proje Başvuru Formu
                </div>
                <form onSubmit={handleSubmit}>      
                    <div className={"md:flex flex-row gap-8"}>
                        <div className={"w-full"}>
                            <div className={"mb-8"}>
                                <label htmlFor="projectName">Proje Adını Giriniz <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectName'
                                    name={projectName}
                                    value={projectName}
                                    onChange={(event) => setProjectName(event.target.value)}
                                    placeholder="Proje Adını Giriniz"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectSector">Projeniz Hangi Sektörde Faaliyet Gösterecek? <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectSector'
                                    name={projectSector}
                                    value={projectSector}
                                    onChange={(event) => setProjectSector(event.target.value)}
                                    placeholder="Projenizin Sektörünü Giriniz"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>

                            <div className={"mb-8"}>
                                <label htmlFor="projectSubject">Projenin Konusu ve Amacı <span className={"text-red-500"}>*</span></label>
                                <textarea
                                    id='projectSubject'
                                    required
                                    value={projectSubject}
                                    onChange={(event) => setProjectSubject(event.target.value)}
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                    placeholder='Projenin tanımını,tespit ettiğiniz sorunu, ve bu soruna nasıl bir çözüm üreteceğinizi yazınız. Projenin nasıl ilerleyeceğine dair planlarınızı adım adım anlatınız.'
                                />
                            </div>

                            <div className={"mb-8"}>
                                <label htmlFor="projectSwot">SWOT Analizi <span className={"text-red-500"}>*</span></label>
                                <textarea
                                    id='projectSwot'
                                    required
                                    value={projectSwot}
                                    onChange={(event) => setProjectSwot(event.target.value)}
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                    placeholder='Projenizin SWOT analizini maddeler halinde yazınız.'
                                />
                            </div>
                        
                            <div className={"mb-8"}>
                                <label htmlFor="projectThree">Hedef Kitle, Hedef Pazar, Rekabet</label>
                                <textarea
                                    id='projectThree'
                                    value={projectThree}
                                    onChange={(event) => setProjectThree(event.target.value)}
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                    placeholder='Projenizin hedef kitlesini ve hedef pazarını anlatınız. Varsa mevcutta bulunan örnek/rakip projelerden bahsediniz.'
                                />
                            </div>
                        </div>
                        <div className='w-full'>
                                <div className={"mb-8"}>
                                    <label htmlFor="projectDevelopmentProcesses">Projenin Gelişim Süreçleri</label>
                                    <textarea
                                        id='projectDevelopmentProcesses'
                                        value={projectDevelopmentProcesses}
                                        onChange={(event) => setProjectDevelopmentProcesses(event.target.value)}
                                        className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                        placeholder='Projenizin fikir aşamasından bugüne gelişim aşamalarından bahsediniz.'
                                    />
                                </div>
                                
                                <div className={"mb-8"}>
                                    <label htmlFor="projectObjective">Proje Plan ve Hedefleri</label>
                                    <textarea
                                        id='projectObjective'
                                        value={projectObjective}
                                        onChange={(event) => setProjectObjective(event.target.value)}
                                        className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                        placeholder='Projenizle ilgili gelecek planlarınızı ve hedeflerinizi yıllar bazında belirtiniz.'
                                    />
                                </div>
                                <div className={"mb-8"}>
                                    <span className='mb-8'>Projenin Logosu <span className={"text-red-500"}>*</span></span>
                                    <ProjectUploader onFileChange={files => setLogoFile(files[0])} />
                                </div>
                                <div className={"mt-5 mb-8"}>
                                    <span className='mb-8'>Projenin Sunumu <span className={"text-red-500"}>*</span></span>
                                    <ProjectUploader onFileChange={files => setProjectPresentation(files[0])} />
                                </div>

                        
                        </div>
                    </div>

                    <div>
                        {addedTeamMembers.map((member, index) => (
                            <div key={member.email} className={"mt-8 bg-primaryGray flex items-center justify-between text-primary rounded p-4"}>
                                Adı: {member.name} | E-mail: {member.email}

                                <div className='justify-center flex gap-3'>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        handleEditTeamMember(index);
                                    }}>
                                        <Edit/>
                                    </button>
                                    <button onClick={() => handleDeleteTeamMember(member.email)}>
                                        <Trash/>
                                    </button>
                                </div>   
                            </div>
                        ))}
                    </div>
                    <div className='mb-8 mt-8'>
                        <button type="button" onClick={teamAddPopupOpener} className='bg-primaryGray text-primary justify-center flex items-center rounded-full px-4'>
                        <span className='py-2'>Takım Ekle</span>
                        </button>
                    </div>

                    <div className={"w-full text-xs h-[50px] md:text-base mb-5"}>
                            <button type='button' onClick={(e) => { e.preventDefault(); handleSubmit(e, true); }} className='w-full h-[50px] bg-primaryGray text-primary items-center justify-center rounded-full px-4 w-24 h-14'>
                                    Taslak Olarak Kaydet
                            </button>
                    </div>

                    <div className={"flex gap-10 justify-center md:justify-between"}>
                        <div className={"w-full text-xs h-[50px] md:text-base"}>
                            <Button onClick={handleCancel} type={"secondary"} text={"Vazgeç"}/>
                        </div>
                        <div className={"w-full text-xs h-[50px] md:text-base"}>
                            <button type='submit' className='w-full h-[50px] bg-primary text-white items-center justify-center rounded-full px-4 w-24 h-14'>
                                    Başvur
                            </button>
                        </div>
                    </div>
                </form>
                <PopUp isOpen={editingMember !== null || teamAddPopupController} onClose={() => setTeamAddPopupController(false)}>
                    <TeamAdd 
                        initialData={editingMember ? editingMember.data : null} 
                        handleAddTeamMember={editingMember ? handleUpdateTeamMember : handleAddTeamMember} 
                        onClose={() => setTeamAddPopupController(false)}
                    />
                </PopUp>

            </div>
    </div>
    );
};

export default Index;