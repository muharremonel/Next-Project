import React from 'react';
import { Search } from "@/svgImports";
import {SearchBar} from "@/app/presentation/components";

interface SearchSaveProps {
    recordCount: number;
    setSearchTerm: (term: string) => void;
    searchTerm: string;
  }
  
  export default function SearchSave({ recordCount, setSearchTerm, searchTerm }: SearchSaveProps) {
  return (
      <div className="w-full h-full p-4 mb-[4rem] bg-white rounded-lg shadow-md">
        <div className="flex items-center">
            <span className="w-full">{recordCount} Kayıt</span>
            <div className="w-full flex justify-end">
                <SearchBar 
                  rounded={"full"} 
                  value={searchTerm} 
                  placeholder={"Ara"} 
                  svgIcon={Search} 
                  setSearchTerm={setSearchTerm} 
                />         
          </div>
        </div>
      </div>
    );
  }
  
