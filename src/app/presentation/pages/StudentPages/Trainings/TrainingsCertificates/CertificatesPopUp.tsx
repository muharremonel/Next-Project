import { Close } from '@/svgImports';
import React from 'react';

interface CertificatesPopUpProps {
    certificate: {
      name: string;
      image: string;
      url: string;
      date: string;
    } | null;
    closePopup: () => void;
  }
  
  const CertificatesPopUp: React.FC<CertificatesPopUpProps> = ({ certificate, closePopup }) => {
    return (
      <div className='w-full h-full flex flex-col p-10 gap-10 rounded-lg relative'>
        <button 
          onClick={closePopup} 
          className='absolute top-4 right-4 p-2 rounded-full focus:outline-none'
        >
          <Close/>
        </button>
        {certificate ? <img src={certificate.image} className='w-full h-full mt-4' alt={certificate.name} /> : "No certificate selected"}
      </div>
    );
  }
  
  

export default CertificatesPopUp