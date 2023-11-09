import React from 'react';
import { Edit } from '@/svgImports';


const CustomFileUploader = ({ onFileSelected }: { onFileSelected: (file: File) => void }) => {

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFileSelected(files[0]);
    }
  };

  return (
    
    <label className="custom-file-uploader gap-3 text-center flex ">
      Düzenle <Edit/>
      <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
    </label>
  );
};

export default CustomFileUploader;
