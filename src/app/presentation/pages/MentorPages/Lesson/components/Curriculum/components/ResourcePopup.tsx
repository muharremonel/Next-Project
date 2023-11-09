import React, {useState} from 'react';
import FileUploader
    from "@/app/presentation/pages/MentorPages/Lesson/components/GeneralInformations/components/FileUploader";
import {Close} from "@/svgImports";

interface ResourceModalProps {
    open: boolean;
    onClose: () => void;
    onChange: any
    data:any
}

const ResourceModal: React.FC<ResourceModalProps> = ({open, onClose, onChange,data}) => {
    const [title, setTitle] = useState('');
    const getResponseFromUploader = (response: any) => {
        if (Array.isArray(data.resources)) {
            onChange({resources: [...data.resources , {href: response, title: title}]})
        } else {
            // data.resources dizi değilse burada ne yapacağınızı belirleyin. Örnek olarak:
            onChange({resources: [{href: response, title: title}]});
        }
    }
    console.log("datta",data)

    if (!open) return null;


    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 shadow-2xl">
            <div className="bg-white p-8 w-2/3 h-2/3 rounded shadow-lg overflow-y-auto">
                <div className={"flex justify-end w-full items-start "} onClick={onClose}>
                    <Close/>
                </div>
                <h2 className="text-2xl mb-4">Kaynak Ekle</h2>

                {/* Title input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Başlık:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="border p-2 rounded w-full"
                        placeholder="Kaynak başlığını girin"
                    />
                </div>

                {/* PDF Dosya yükleyici */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">PDF Dosyası Yükle:</label>
                    <FileUploader
                        sendResponse={getResponseFromUploader}
                        pdf
                        serverProcessUrl={"resources"}
                        name={"resource"}
                    />
                </div>

            </div>
            {/*<div className="absolute inset-0 " onClick={onClose}></div>*/}
        </div>
    );
};

export default ResourceModal;
