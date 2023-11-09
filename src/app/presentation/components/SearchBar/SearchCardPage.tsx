import React, { useEffect } from 'react';
import { Start } from '@/svgImports';
import {Chip, Rating, Typography} from "@mui/material";
import Link from 'next/link';
import { BASE_URL } from '@/config';

interface SearchCardPageProps {
  searchTerm: string;
  onRecordCountChange: (count: number) => void;
  currentPage: number;
  educationList: any[];
}

const SearchCardPage: React.FC<SearchCardPageProps> = ({ searchTerm, onRecordCountChange, currentPage, educationList }) => {
  const filteredEducations = educationList.filter(education => 
    education.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    onRecordCountChange(filteredEducations.length);
  }, [filteredEducations.length, onRecordCountChange]);

  const recordsPerPage = 4;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const visibleEducations = filteredEducations.slice(startIndex, endIndex);

  return (
    <div>
      {filteredEducations.length > 0 ? (
        visibleEducations.map((education, index) => (
          <Link href={`/ders/${education._id}`} key={index}>
          <div key={index} className="w-full flex shadow-xl md:flex-row flex-col bg-white mb-8 p-5 rounded-xl gap-8">
            <div className="md:w-3/6 w-full">
              <img src={`${BASE_URL}${education.image}`} className='w-full h-full rounded-lg' alt={education.title} />
            </div>
            <div className="flex flex-col justify-between w-full">
              <div className="w-full flex items-center justify-between">
                 <span className={"md:text-3xl text-2xl text-gray-700"}>{education.title}</span>
                 <span className={"text-grey"}>{education.category}</span>
              </div>
              <div className="mt-5 w-full flex-row md:flex justify-between m-0 gap-7 items-end">
                <div className='w-full'>
                  <div className='flex items-center gap-4 mb-2'>
                  <Chip label={"Temel Seviye"}/>
                  <Rating name="read-only" value={4} readOnly/>
                  </div>
                </div>
                <div className='h-full justify-center flex'>
                  <button className='bg-primary items-center flex justify-center rounded-full px-4 w-24 h-14'>
                    <Start/>
                  </button>
                </div> 
              </div>
            </div>
          </div>
          </Link>
        ))
      ) : (
        <div className="flex justify-center items-center h-[200px]">
          <Typography variant="h6" color="textSecondary">
            Aradığınız sonuç bulunamadı!
          </Typography>
        </div>
      )}
    </div>
  );    
};

export default SearchCardPage;
