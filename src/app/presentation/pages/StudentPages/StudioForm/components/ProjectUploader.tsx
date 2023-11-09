import React, { useState } from 'react';
import { FilePond, registerPlugin } from "react-filepond";
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateType);

const FileUploader = ({ onFileChange, video }: { onFileChange: (files: File[]) => void, video?: boolean }) => {

  const [files, setFiles] = useState<File[]>([]);

  const handleFilesChange = (fileItems: any[]) => {
    const fileList = fileItems.map(fileItem => fileItem.file as File);
    setFiles(fileList);
    if (onFileChange) onFileChange(fileList);
};

  return (
    <div className="App">
      <FilePond
        className="myFilePond"
        files={files}
        onupdatefiles={handleFilesChange}
        acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'image/svg+xml', 'application/pdf', 'text/plain', 'application/zip', 'application/rtf', 'text/tsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']}
        labelIdle="Dosyanızı sürükleyin veya <span class='filepond--label-action'> tıklayarak seçin </span>"
      />
    </div>
  );
};

export default FileUploader;
