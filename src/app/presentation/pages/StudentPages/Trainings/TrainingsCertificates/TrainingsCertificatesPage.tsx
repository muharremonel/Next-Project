import React, { useState, useEffect } from 'react';
import { Download, Open } from '@/svgImports';
import PopUp from "@/app/presentation/components/PopUp";
import CertificatesPopUp from './CertificatesPopUp';



const people = [
    {
      name: 'Unity Oyun Geliştirmeyi Oyun Geliştirerek Öğren',
      image: 'https://demo.anibalbilisim.com/digithane/egitim/certificate.png',
      url: 'https://demo.anibalbilisim.com/digithane/egitim/certificate.pdf',
      date: '27.07.2024',
    },
    {
      name: 'Etik Hackerlik ve Siber Güvenlik',
      image: 'https://demo.anibalbilisim.com/digithane/egitim/certificate.png',
      url: 'https://demo.anibalbilisim.com/digithane/egitim/certificate.pdf',
      date: '27.07.2024',
    },
    {
      name: 'Girişimcilik - İş Geliştirme ve Dijital Pazarlama Eğitimi',
      image: 'https://demo.anibalbilisim.com/digithane/egitim/certificate.png',
      url: 'https://demo.anibalbilisim.com/digithane/egitim/certificate.pdf',
      date: '27.07.2024',
    },
  ];
  
  interface TrainingsCertificatesPageProps {
    searchTerm: string;
    onRecordCountChange: (count: number) => void;
  }
  interface Certificate {
    name: string;
    image: string;
    url: string;
    date: string;
  }
    
  const TrainingsCertificatesPage: React.FC<TrainingsCertificatesPageProps> = ({ searchTerm, onRecordCountChange }) => {
    const filteredPeople = people.filter(person => 
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
      useEffect(() => {
        onRecordCountChange(filteredPeople.length);
      }, [filteredPeople.length, onRecordCountChange]);
            
            
    const [selectedCertificate, setSelectedCertificate] = React.useState<Certificate | null>(null);
    const [certificatesPopupController, setCertificatesPopupController] = React.useState<boolean>(false);

    const certificatesPopupOpener = (certificate: Certificate) => {
        setSelectedCertificate(certificate);
        setCertificatesPopupController(true);
    };

  

    return (
    <div className={"w-full shadow-xl bg-white mb-8 p-5 rounded-xl gap-8"}>
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ders İsmi
                        </th>
                       
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sertifika Alma Tarihi
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Sertifika Ön İzleme
                        </th>
                        <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Düzenle</span>
                        </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPeople.map((person, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                            <button onClick={() => certificatesPopupOpener(person)}>
                                <Open/>
                            </button>
                                <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{person.name}</div>
                                </div>
                            </div>
                            </td>
                           
                            <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-light rounded-full bg-green-100 text-green-800">
                                {person.date}
                            </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                               <img className="w-20" src={person.image} alt="" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href={person.url} target='_blank' download="certificate.pdf">
                                <Download/>
                            </a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
        <PopUp isOpen={certificatesPopupController} onClose={() => setCertificatesPopupController(false)}>
            <CertificatesPopUp certificate={selectedCertificate} closePopup={() => setCertificatesPopupController(false)} />
        </PopUp>
    </div>
    );
    
};
export default TrainingsCertificatesPage;
