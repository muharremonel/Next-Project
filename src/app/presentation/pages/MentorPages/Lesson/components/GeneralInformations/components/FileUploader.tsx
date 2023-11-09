import {FilePond, registerPlugin} from "react-filepond";
import React, {useState} from 'react';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import {BASE_URL} from "@/config";
import toast from "react-hot-toast";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

const FileUploader = ({files, setFiles, video, name, serverProcessUrl, sendResponse, pdf}: any) => {
    const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    const allowedVideoFileTypes = ['video/mp4'];
    const allowedPdfFileTypes = ['application/pdf'];

    // PDF prop kontrolü
    let fileTypes = pdf ? allowedPdfFileTypes : (video ? allowedVideoFileTypes : allowedFileTypes);

    return (
        <div className="App">
            <FilePond
                acceptedFileTypes={fileTypes}
                files={files}
                allowReorder={true}
                allowMultiple={false}
                onupdatefiles={setFiles}
                name={name}
                onprocessfile={(error, file) => {
                    if (error) {
                        console.error("Dosya yüklenirken bir hata oluştu:", error);
                    } else {
                        console.log("Yükleme cevabı:", file.serverId);
                        const response = JSON.parse(file.serverId)
                        sendResponse(response.data)
                        toast.success(response.message)
                    }
                }}
                server={{
                    url: BASE_URL,
                    process: `/${serverProcessUrl}`,
                }}
                labelIdle='<div class="fileUploaderContent"> <div class="fileUploaderCircle"> <div class="fileUploaderPlus"></div> </div> <p> Sürükle bırak ya da <span style="color: blue" class="filepond--label-action">Cihazdan Yükle</span> </p> </div>'
            />
        </div>
    );
};

export default FileUploader;
