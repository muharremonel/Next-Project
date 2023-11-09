import React, {useState, useEffect} from 'react';
import {useRouter} from "next/router";
import axios from 'axios';
import { BASE_URL } from '@/config';
import toast from 'react-hot-toast';
import { getUser } from '@/api';
import { Button } from "@/app/presentation/components";
import Menu from "@/app/presentation/pages/StudentPages/StudioForm/Menu";
import ProjectUploader from "@/app/presentation/pages/StudentPages/StudioForm/components/ProjectUploader";
import TeamAdd from "@/app/presentation/pages/StudentPages/StudioForm/components/TeamAdd";
import PopUp from "@/app/presentation/pages/StudentPages/StudioForm/components/PopUp";
import { Edit, Trash } from '@/svgImports';

interface Equipment {
    kamera: boolean;
    mikrofon: boolean;
    canli: boolean;
    studyo: boolean;
    diger: boolean;
  }

interface studioMembers {
    name: string;
    surname: string;
}


const Index = () => {

    const router = useRouter()
    const [projectUserName, setProjectUserName] = useState("");
    const [projectUserSurname, setProjectUserSurname] = useState("");
    const [projectUserPhone, setProjectUserPhone] = useState("");
    const [projectUserEmail, setProjectUserEmail] = useState("");
    const [projectUserAge, setProjectUserAge] = useState("");
    const [projectUserProfession, setProjectUserProfession] = useState("");
    const [projectUserAppointmentDate, setProjectUserAppointmentDate] = useState("");
    const [projectUserAppointmentHours, setProjectUserAppointmentHours] = useState("");
    const [projectName, setProjectName] = useState("");
    const [projectSubject, setProjectSubject] = useState("");
    const [projectPurpose, setProjectPurpose] = useState("");
    const [projectTargetAudience, setProjectTargetAudience] = useState("");
    const [projectType, setProjectType] = useState("");
    const [projectText, setProjectText] = useState("");
    const [projectTime, setProjectTime] = useState("");
    const [projectStudioNeed, setProjectStudioNeed] = useState("");
    const [projectEquipmentNeed, setProjectEquipmentNeed] = useState("");
    const [projectId, setProjectId] = useState("");
    const [projectDevelopmentProcesses, setProjectDevelopmentProcesses] = useState<string>(""); 
    const [teamAddPopupController ,setTeamAddPopupController] = useState(false)

    const teamAddPopupOpener = () => {setTeamAddPopupController(true)}
    const teamAddPopupCloser = () => {setTeamAddPopupController(false)}
    const [addedstudioMemberss, setAddedstudioMemberss] = useState<any[]>([]);
    const [studioMemberss, setstudioMemberss] = useState<any[]>([]);

    const handleAddstudioMembers = (studioMembers: any) => {
        const updatedstudioMemberss = [...addedstudioMemberss, studioMembers];
        setAddedstudioMemberss(updatedstudioMemberss);
        setTeamAddPopupController(false);
        setEditingMember(null);
    };
    const handleCancel = () => {
        router.push("/anasayfa");
    }
 
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if (!e.currentTarget.checkValidity()) {
            toast.error("Form eksik veya yanlış!");
            return;
          }
          const equipmentKeys = Object.keys(equipment) as Array<keyof Equipment>;

          const selectedEquipment = equipmentKeys
            .filter((key) => equipment[key])
            .map((key) => key);
      
        const formData = {
          name: projectUserName,
          surname: projectUserSurname,
          phone: projectUserPhone,
          email: projectUserEmail,
          age: projectUserAge,
          profession: projectUserProfession,
          appointmentDate: projectUserAppointmentDate,
          appointmentHours: projectUserAppointmentHours,
          projectName: projectName,
          projectSubject: projectSubject,
          projectPurpose: projectPurpose,
          projectTargetAudience: projectTargetAudience,
          projectType: projectType,
          projectText: projectText,
          projectTime: projectTime,
          studioNeed: projectStudioNeed,
          _id: studentId,
          equipmentNeed: selectedEquipment,
          studioMembers: addedstudioMemberss.map(({ name, surname }) => ({ name, surname }))
        };
      
        let endpoint = `${BASE_URL}/studioRecording`;
      
        try {
          const response = await axios.post(endpoint, formData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
      
          if (response.data && response.data.message) {
            toast.success(response.data.message);
            setTimeout(() => {
                router.push("/anasayfa")
            }, 1500);
          } else if (response.data && response.data.error) {
            toast.error(response.data.error);
          } else {
            toast.success("Form Başarıyla Gönderildi!");
            // Yönlendirme işlemleri...
          }
        } catch (error) {
          toast.error("Form gönderirken bir hata oluştu!");
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
    
    const handleEditstudioMembers = (index: number) => {
        setEditingMember({data: addedstudioMemberss[index], index});
        setTeamAddPopupController(true);
    };

    const handleDeletestudioMembers = (email: string) => {
        const updatedstudioMemberss = addedstudioMemberss.filter(member => member.email !== email);
        setAddedstudioMemberss(updatedstudioMemberss);
    };
    const handleUpdatestudioMembers = (updatedMember: any) => {
        const updatedstudioMemberss = [...addedstudioMemberss];
        updatedstudioMemberss[editingMember.index] = updatedMember;
        setAddedstudioMemberss(updatedstudioMemberss);
        setTeamAddPopupController(false);
        setEditingMember(null);
    };
    const [equipment, setEquipment] = useState({
        kamera: false,
        mikrofon: false,
        canli: false,
        studyo: false,
        diger: false
    });
    const handleEquipmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEquipment({
            ...equipment,
            [event.target.id]: event.target.checked
        });
    };

    
    
    
    
    return (
        
        <div className={"container m-auto w-full h-max"}>
        <Menu/>
        <div className={"shadow-2xl rounded-lg w-full h-full md:p-20 p-6 flex-col flex"}>
                <div className={"text-2xl text-primary font-bold mb-8"}>
                    Stüdyo Başvuru Formu
                </div>
                <form onSubmit={handleSubmit}>      
                    <div className={"md:flex flex-row gap-8"}>
                        <div className={"w-full"}>
                            <div className={"mb-8"}>
                                <label htmlFor="projectUserName">İsim <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectUserName'
                                    name={projectUserName}
                                    value={projectUserName}
                                    onChange={(event) => setProjectUserName(event.target.value)}
                                    placeholder="Adınızı Giriniz"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectUserName">Soyisim <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectUserSurname'
                                    name={projectUserSurname}
                                    value={projectUserSurname}
                                    onChange={(event) => setProjectUserSurname(event.target.value)}
                                    placeholder="Soyadınızı Giriniz"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectUserName">Telefon Numarası <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectUserPhone'
                                    name={projectUserPhone}
                                    value={projectUserPhone}
                                    onChange={(event) => setProjectUserPhone(event.target.value)}
                                    placeholder="0 (555) 555 5555"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectUserName">E-mail Adresi <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectUserEmail'
                                    name={projectUserEmail}
                                    value={projectUserEmail}
                                    onChange={(event) => setProjectUserEmail(event.target.value)}
                                    placeholder="mail@"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectUserName">Yaş <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectUserAge'
                                    name={projectUserAge}
                                    value={projectUserAge}
                                    onChange={(event) => setProjectUserAge(event.target.value)}
                                    placeholder="Yaşınızı Giriniz.."
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectUserName">Meslek <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectUserProfession'
                                    name={projectUserProfession}
                                    value={projectUserProfession}
                                    onChange={(event) => setProjectUserProfession(event.target.value)}
                                    placeholder="Mesleğinizi Giriniz.."
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectUserName">Talep Edilen Randevu Tarihi <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectUserAppointmentDate'
                                    name={projectUserAppointmentDate}
                                    value={projectUserAppointmentDate}
                                    onChange={(event) => setProjectUserAppointmentDate(event.target.value)}
                                    placeholder="Talep Edilen Randevu Tarihini Giriniz"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectUserName">Talep Edilen Randevu Saati <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectUserAppointmentHours'
                                    name={projectUserAppointmentHours}
                                    value={projectUserAppointmentHours}
                                    onChange={(event) => setProjectUserAppointmentHours(event.target.value)}
                                    placeholder="Talep Edilen Randevu Saatini Giriniz"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label>Ekipman İhtiyacı</label>
                                <div className='mt-5 flex gap-3'>
                                    <input type="checkbox" id="kamera" name="equipmentNeed" value="Kamera" onChange={handleEquipmentChange}/>
                                    <label htmlFor="kamera">Kamera</label>
                                </div>
                                <div className='mt-2 flex gap-3'>
                                    <input type="checkbox" id="mikrofon" name="equipmentNeed" value="Mikrofon" onChange={handleEquipmentChange}/>
                                    <label htmlFor="Mikrofon">Mikrofon</label>
                                </div>
                                <div className='mt-2 flex gap-3'>
                                    <input type="checkbox" id="canlı" name="equipmentNeed" value="Canlı" onChange={handleEquipmentChange}/>
                                    <label htmlFor="Canlı">Canlı Yayın Reji Yazılımı</label>
                                </div>
                                <div className='mt-2 flex gap-3'>
                                    <input type="checkbox" id="studyo" name="equipmentNeed" value="Stüdyo" onChange={handleEquipmentChange}/>
                                    <label htmlFor="Studyo">Stüdyo Işıkları</label>
                                </div>
                                <div className='mt-2 flex gap-3'>
                                    <input type="checkbox" id="diger" name="equipmentNeed" value="Diger" onChange={handleEquipmentChange}/>
                                    <label htmlFor="Diger">Diğer</label>
                                </div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className={"mb-8"}>
                                <label htmlFor="projectUserName">Projenin Adı <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectName'
                                    name={projectName}
                                    value={projectName}
                                    onChange={(event) => setProjectName(event.target.value)}
                                    placeholder="Projenin Adınızı Giriniz"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectUserName">Projenin Konusu <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectSubject'
                                    name={projectSubject}
                                    value={projectSubject}
                                    onChange={(event) => setProjectSubject(event.target.value)}
                                    placeholder="Projenin Konusunu Giriniz"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectPurpose">Projenin Amacı <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectPurpose'
                                    name={projectPurpose}
                                    value={projectPurpose}
                                    onChange={(event) => setProjectPurpose(event.target.value)}
                                    placeholder="Projenin Amacını Giriniz"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectPurpose">Projenin Hedef Kitle Profili <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectTargetAudience'
                                    name={projectTargetAudience}
                                    value={projectTargetAudience}
                                    onChange={(event) => setProjectTargetAudience(event.target.value)}
                                    placeholder="Projenin Hedef Kitle Profili"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectType">Proje Türü <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectType'
                                    name={projectType}
                                    value={projectType}
                                    onChange={(event) => setProjectType(event.target.value)}
                                    placeholder="Örneğin: Belgesel, Röportaj, Müzik Video, Reklam Filmi vb."
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectText">Proje Metni <span className={"text-red-500"}>*</span></label>
                                <input
                                    type="text"
                                    required
                                    id='projectText'
                                    name={projectText}
                                    value={projectText}
                                    onChange={(event) => setProjectText(event.target.value)}
                                    placeholder="Metni"
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                />
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectTime">Proje Süresi<span className={"text-red-500"}>*</span></label>
                                <select
                                    value={projectTime}
                                    required
                                    onChange={(event) => setProjectTime(event.target.value)}
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                    id="projectTime"
                                >
                                    <option value="">Süre Seçin...</option>
                                    <option value="Time 1">Haftalık Yayın</option>
                                    <option value="Time 2">Aylık Yayın</option>
                                    <option value="Time 3">Diğer</option>
                                </select>
                            </div>
                            <div className={"mb-8"}>
                                <label htmlFor="projectStudioNeed">Randevu Tarihindeki Stüdyo İhtiyacı<span className={"text-red-500"}>*</span></label>
                                <select
                                    value={projectStudioNeed}
                                    required
                                    onChange={(event) => setProjectStudioNeed(event.target.value)}
                                    className="flex-grow border rounded-md mt-3 p-2 w-full text-sm md:text-md"
                                    id="projectStudioNeed"
                                >
                                    <option value="">Stüdyo Seçin...</option>
                                    <option value="Stüdyo 1">Greenbox</option>
                                    <option value="Stüdyo 2">Dekorlu Stüdyo</option>
                                    <option value="Stüdyo 3">Ses Kayıt ve Müzik Prodüksiyon Stüdyosu</option>
                                    <option value="Stüdyo 4">Kurgu-Montaj Odası</option>
                                    <option value="Stüdyo 5">Reji</option>
                                </select>
                            </div>
                           
                        </div>
                    </div>

                    <div>
                        {addedstudioMemberss.map((member, index) => (
                            <div key={member.surname} className={"mt-8 bg-primaryGray flex items-center justify-between text-primary rounded p-4"}>
                                Adı: {member.name} | Soyadı: {member.surname}

                                <div className='justify-center flex gap-3'>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        handleEditstudioMembers(index);
                                    }}>
                                        <Edit/>
                                    </button>
                                    <button onClick={() => handleDeletestudioMembers(member.email)}>
                                        <Trash/>
                                    </button>
                                </div>   
                            </div>
                        ))}
                    </div>
                    <div className='mb-8 mt-8'>
                        <label htmlFor="teamAdd">Randevu Tarihinde Stüdyoda Bulunacak Kişiler:  <span className={"text-red-500"}>*</span></label>
                        <button type="button" id='teamAdd' onClick={teamAddPopupOpener} className='bg-primaryGray text-primary justify-center flex items-center rounded-full px-4 mt-5'>
                            <span className='py-2'>Ekle</span>
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
                        handleAddstudioMembers={editingMember ? handleUpdatestudioMembers : handleAddstudioMembers} 
                        onClose={() => setTeamAddPopupController(false)}
                    />
                </PopUp>

            </div>
    </div>
    );
};

export default Index;