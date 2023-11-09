import React, { useEffect, useState } from 'react';
import { Button, Input } from "@/app/presentation/components";
import 'filepond/dist/filepond.min.css';
import FileUploader
    from "@/app/presentation/pages/MentorPages/Lesson/components/GeneralInformations/components/FileUploader";
import { useApi } from "../../../../../../../../pages/_app";
import { Education } from "@/interfaces";


type GeneralInformationsProps = {
    educations: Education | null
    onChange: any
    onNext: (index: number) => void
    onPrev: (index: number) => void
}
const GeneralInformations = ({ educations, onChange, onNext, onPrev }: GeneralInformationsProps) => {
    const [files, setFiles] = useState<any>(null)
    const [categories, setCategories] = useState([]);
    // const [fileUrl, setFileUrl] = useState("")
    const api = useApi();
    console.log("general -> ", educations)

    useEffect(() => {
        (async () => {
            const response = await api.categories();
            setCategories(response.data);
        })();
    }, [api]);

    const categoryTitles = categories?.map((category: any) => category.title);
    // console.log("file", files)

    const getResponseFromUploader = (str: string) => {
        onChange({ image: str });
    };

    return (
        <div className={"flex justify-center items-center w-full h-full "}>
            <div className={"flex flex-col rounded-lg gap-8 w-3/4 shadow-2xl p-20 h-full"}>
                <div className={"w-full flex flex-col gap-1"}>
                    <div>Eğitimin Kategorisi</div>
                    <select value={educations?.category} onChange={(e) => {
                        onChange({ category: e.target.value })
                    }}
                        className="p-2 min-h-[50px] text-black rounded-lg border-2 border-inputBorder">
                        <option key="seçiniz" value={""}>Seçiniz...</option>
                        {categoryTitles?.map((categoryTitle, index) => (
                            <option key={index} value={categoryTitle}>{categoryTitle}</option>
                        ))}
                    </select>
                </div>
                <Input rounded={"lg"} title={"Eğitimin Adı"} value={educations?.title || ''}
                    onInputChange={(e) => onChange({ title: e.target.value })} />
                <div className={"w-full flex flex-col"}>
                <div>Ders Göreseli</div>
                    <FileUploader serverProcessUrl={"education_images"} files={files}
                        sendResponse={getResponseFromUploader} setFiles={setFiles} name={'educationImage'} />
                    <p className='text-sm text-lowOpacityText'>.jpeg, .jpg, .png formatında ve en fazla 2Mb büyüklüğünde görsel
                        yükleyebilirsiniz.</p>
                </div>
                
                <div className={"w-full flex justify-end"}>
                    <div className={"w-3/4 md:w-1/4"}>
                        <Button disabled={!educations || educations?.category === "" || educations?.category === null || educations?.title === "" || educations?.title === null || educations?.image === "" || educations?.image === null } type={"primary"} text={"Devam Et"} onClick={() => onNext(1)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneralInformations;
